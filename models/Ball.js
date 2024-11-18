const mongoose = require("mongoose");

const BallSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
    },
    over: {
      type: Number,
      required: true,
    },
    ball: {
      type: Number,
      required: true,
    },
    batsman: {
      type: String,
      required: true,
    },
    bowler: {
      type: String,
      required: true,
    },
    runs: {
      type: Number,
      default: 0,
    },
    extras: {
      wide: { type: Number, default: 0 },
      noball: { type: Number, default: 0 },
      bye: { type: Number, default: 0 },
      legbye: { type: Number, default: 0 },
      overthrow: { type: Number, default: 0 },
    },
    outcome: {
      type: String,
      enum: ["run", "wicket", "dot", "extra"],
      required: true,
    },
    wicket: {
      type: {
        type: String,
        enum: ["bowled", "caught", "runout", "stumped", null],
        default: null,
      },
      fielder: { type: String, default: null },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ball", BallSchema);
