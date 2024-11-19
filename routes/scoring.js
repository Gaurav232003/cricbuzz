const Score = require('../models/score');

// Add delivery data
const addDelivery = async (req, res) => {
  const { matchId, type, runs, extras } = req.body;

  try {
    let match = await Score.findOne({ matchId });
    if (!match) {
      match = new Score({ matchId });
    }

    const delivery = { type, runs, extras };

    // Update match stats based on the delivery type
    if (type === 'wide') {
      match.teamStats.extras.wides += runs;
      match.teamStats.totalRuns += runs;
    } else if (type === 'no-ball') {
      match.teamStats.extras.noBalls += 1;
      match.teamStats.totalRuns += runs;
    } else if (type === 'normal') {
      match.teamStats.totalRuns += runs;
    } else if (type === 'normal') {
      match.teamStats.totalRuns += runs;
    } else if (type === 'normal') {
      match.teamStats.totalRuns += runs;
    } else if (type === 'normal') {
      match.teamStats.totalRuns += runs;
    } else if (type === 'normal') {
      match.teamStats.totalRuns += runs;
    }

    match.deliveries.push(delivery);
    await match.save();
    res.status(201).json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get match stats
const getMatchStats = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Score.findOne({ matchId: id });
    if (!match) {
      return res.status(404).json({ success: false, error: 'Match not found' });
    }
    res.status(200).json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = { addDelivery, getMatchStats };
