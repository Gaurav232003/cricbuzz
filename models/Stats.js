const mongoose = require("mongoose");

const PlayerStatsSchema = new mongoose.Schema(
  {
    playerId: {
      type: String,
      required: true,
    },
    matchId: {
      type: String,
      required: true,
    },
    runs: {
      type: Number,
      default: 0,
    },
    ballsFaced: {
      type: Number,
      default: 0,
    },
    wicketsTaken: {
      type: Number,
      default: 0,
    },
    oversBowled: {
      type: Number,
      default: 0,
    },
    runsConceded: {
      type: Number,
      default: 0,
    },
    extras: {
      wide: { type: Number, default: 0 },
      noball: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayerStats", PlayerStatsSchema);
