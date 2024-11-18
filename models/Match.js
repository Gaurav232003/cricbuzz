const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
      unique: true,
    },
    teams: [
      {
        name: { type: String, required: true },
        players: [{ type: String, required: true }],
      },
    ],
    overs: {
      type: Number,
      required: true,
    },
    currentOver: {
      type: Number,
      default: 0,
    },
    currentBall: {
      type: Number,
      default: 0,
    },
    score: [
      {
        team: { type: Number, required: true },
        extras: { type: Number, default: 0 },
        wickets: { type: Number, default: 0 },
      },
    ],
    status: {
      type: String,
      enum: ["in-progress", "completed", "scheduled"],
      default: "scheduled",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
