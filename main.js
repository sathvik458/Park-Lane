const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://sathvikreddysama:urmaP6hfqZhcwOmp@cluster0.hbml1wp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model
const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  job_position: String,
  why_hire: String,
  cv: String
});
const Application = mongoose.model('Application', applicationSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.post('/submit-application', (req, res) => {
  const { name, email, job_position, why_hire, cv } = req.body;

  const newApplication = new Application({
    name,
    email,
    job_position,
    why_hire,
    cv
  });

  newApplication.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving application');
    } else {
      res.status(200).send('Application submitted successfully');
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
