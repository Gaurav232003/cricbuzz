const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    unique: true, // Ensure matchId is unique
  },
  batsmanStats: {
    type: [
      {
        name: { type: String, required: true }, // Name of the batsman
        runs: { type: Number, default: 0 },    // Runs scored by the batsman
        balls: { type: Number, default: 0 },   // Legal balls faced by the batsman
      },
    ],
    default: [],
  },
  bowlerStats: {
    type: [
      {
        name: { type: String, required: true },   // Name of the bowler
        balls: { type: Number, default: 0 },     // Total balls bowled (including illegal)
        overs: { type: Number, default: 0 },     // Legal balls grouped into overs
        runsConceded: { type: Number, default: 0 }, // Runs conceded by the bowler
        wickets: { type: Number, default: 0 },   // Wickets taken by the bowler
      },
    ],
    default: [],
  },
  teamStats: {
    totalRuns: { type: Number, default: 0 },   // Total runs scored by the team
    totalWickets: { type: Number, default: 0 }, // Total wickets lost
    legalBalls: { type: Number, default: 0 }, // Total legal balls delivered
    extras: {
      wides: { type: Number, default: 0 },    // Total wides conceded
      noBalls: { type: Number, default: 0 },  // Total no-balls conceded
      byes: { type: Number, default: 0 },     // Total byes conceded
      legByes: { type: Number, default: 0 },  // Total leg-byes conceded
    },
  },
  deliveries: [
    {
      type: {
        type: String,
        enum: ['normal', 'wide', 'no-ball', 'bye', 'legbye', 'overthrow', 'wicket'], // Valid delivery types
        required: true,
      },
      runs: { type: Number, required: true },   // Runs scored on the delivery
      extras: { type: String },                // Type of extra (if any)
      bowler: { type: String, required: true }, // Bowler delivering the ball
      batsman: { type: String, required: true }, // Batsman facing the ball
    },
  ],
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model('Score', scoreSchema);
