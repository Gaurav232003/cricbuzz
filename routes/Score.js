const addDelivery = async (req, res) => {
  const { matchId, type, runs, extras, bowler, batsman } = req.body;

  try {
    // Find or create match document
    let match = await Score.findOne({ matchId });
    if (!match) {
      match = new Score({ matchId });
    }

    // Update bowler stats
    let bowlerStats = match.bowlerStats.find((b) => b.name === bowler);
    if (!bowlerStats) {
      bowlerStats = { name: bowler, balls: 0, overs: 0, runsConceded: 0, wickets: 0 };
      match.bowlerStats.push(bowlerStats);
    }
    bowlerStats.balls += 1; // Increment for all deliveries
    if (type === 'normal' || type === 'wicket') {
      bowlerStats.runsConceded += runs;
    }

    // Handle wickets
    if (type === 'wicket') {
      bowlerStats.wickets += 1; // Add to bowler's wicket count
      match.teamStats.totalWickets += 1; // Add to team's total wickets
    }

    // Update batsman stats for legal balls
    if (type === 'normal' || type === 'wicket') {
      let batsmanStats = match.batsmanStats.find((b) => b.name === batsman);
      if (!batsmanStats) {
        batsmanStats = { name: batsman, runs: 0, balls: 0 };
        match.batsmanStats.push(batsmanStats);
      }
      batsmanStats.balls += 1; // Increment only on legal balls
      batsmanStats.runs += runs; // Add runs scored by the batsman
    }

    // Update team stats
    if (type === 'normal' || type === 'wicket') {
      match.teamStats.legalBalls += 1; // Increment for legal balls
    }
    match.teamStats.totalRuns += runs; // Add runs to total team runs
    if (extras) {
      if (type === 'wide') match.teamStats.extras.wides += runs;
      if (type === 'no-ball') match.teamStats.extras.noBalls += 1;
      
    }

    // Add delivery to deliveries list
    match.deliveries.push({ type, runs, extras, bowler, batsman });

    // Save updated match
    await match.save();
    res.status(201).json({ success: true, match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
