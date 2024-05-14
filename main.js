const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


mongoose.connect('mongodb+srv://sathvikreddysama:urmaP6hfqZhcwOmp@cluster0.hbml1wp.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  job_position: String,
  why_hire: String,
  cv: String
});
const Application = mongoose.model('Application', applicationSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
