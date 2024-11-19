const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  matchId: { type: String, required: true },
  batsmanStats: {
    type: [
      {
        name: String,
        runs: Number,
        balls: Number,
      },
    ],
    default: [],
  },
  bowlerStats: {
    type: [
      {
        name: String,
        overs: Number,
        runsConceded: Number,
        wickets: Number,
      },
    ],
    default: [],
  },
  teamStats: {
    totalRuns: { type: Number, default: 0 },
    totalWickets: { type: Number, default: 0 },
    extras: {
      wides: { type: Number, default: 0 },
      noBalls: { type: Number, default: 0 },
      byes: { type: Number, default: 0 },
      legByes: { type: Number, default: 0 },
    },
  },
  deliveries: [
    {
      type: {
        type: String,
        enum: [
          'normal',
          'wide',
          'no-ball',
          'bye',
          'legbye',
          'overthrow',
          'wicket',
        ],
        required: true,
      },
      runs: { type: Number, required: true },
      extras: { type: String },
    },
  ],
});

module.exports = mongoose.model('Score', scoreSchema);
