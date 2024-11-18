const express = require("express");
const router = express.Router();
const Match = require("../models/Match");
const PlayerStats = require("../models/PlayerStats");
const Ball = require("../models/Ball");

// Helper Function
const handleScenario = (scenario, ballData) => {
  const updates = {
    batsman: {},
    bowler: {},
    team: {},
    extras: {},
  };

  switch (scenario) {
    case "wide+runs":
      updates.bowler.runsConceded = ballData.runs;
      updates.bowler.extrasWide = 1;
      updates.team.extras = ballData.runs;
      break;

    case "noball+bye":
      updates.batsman.ballsFaced = 1;
      updates.bowler.runsConceded = ballData.runs;
      updates.bowler.extrasNoBall = 1;
      updates.team.extras = ballData.runs;
      break;

    // Add more scenarios as needed

    default:
      throw new Error("Unknown scenario");
  }

  return updates;
};

// Route for recording a ball
router.post("/record-ball", async (req, res) => {
  const { matchId, over, ball, batsman, bowler, runs, extras, outcome, scenario } = req.body;

  try {
    // Create a new ball entry
    const newBall = await Ball.create({
      matchId,
      over,
      ball,
      batsman,
      bowler,
      runs,
      extras,
      outcome,
    });

    // Handle scenario effects
    const updates = handleScenario(scenario, newBall);

    // Update stats based on the scenario
    const batsmanStats = await PlayerStats.findOneAndUpdate(
      { playerId: batsman, matchId },
      { $inc: updates.batsman },
      { new: true }
    );
    const bowlerStats = await PlayerStats.findOneAndUpdate(
      { playerId: bowler, matchId },
      { $inc: updates.bowler },
      { new: true }
    );
    const match = await Match.findOneAndUpdate(
      { matchId },
      { $inc: updates.team },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Ball recorded successfully", newBall });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error recording ball" });
  }
});

module.exports = router;
