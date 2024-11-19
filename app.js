const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const scoringRoutes = require('./routes/scoring');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config(); 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.use('/api/scoring', scoringRoutes);
app.get('/', (req, res) => {
  res.send('Cricket Scoring Admin Panel API');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
