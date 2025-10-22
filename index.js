const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//Memory database
const users = [];

//POST username
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api/users", bodyParser.json());
app.post("/api/users", (req, res) => {
    let username = req.body.username;

    //Generate random ID
    const generatedRandomId = () => Math.random().toString(16).slice(2);

    //Generate new userId and create new user
    const newUser = {
      _id: generatedRandomId(),
      username: username
    };

    //Save newUser on database
    users.push(newUser);

    res.json({ 
      _id: newUser._id,
      username: newUser.username
    });
});

//GET _id and username
app.get('/api/users', (req, res) => {

  res.json(users);
});

//POST exercises
app.post("/api/users/:_id/exercises", (req, res) => {
  const { description, duration, date } = req.body;
  const userId = req.params._id;

  //Find user
  const user = users.find(u => u._id === userId);
  if (!user) {
    return res.status(404).json({ error: "User not found "})
  }

  //Validate descriotion and duration
  if (!description || !duration) {
    return res.status(400).json( { error: "Description and duration are required "});
  }

  //Validate and process date
  let exerciseDate = date ? new Date(date) : new Date();
  if (isNaN(exerciseDate)){
    return res.status(400).json({ error: "Invalid date format" });
  }

  //Mount answer
  const exercise = {
    _id: user._id,
    username: user.username,
    date: exerciseDate.toDateString(),
    duration: parseInt(duration),
    description
  }

  //Save exercise
  if (!user.exercises) user.exercises = [];
  user.exercises.push(exercise);

  res.json(exercise);

});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
