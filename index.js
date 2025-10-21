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

// POST username
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api/users", bodyParser.json());
app.post("/api/users", (req, res) => {
    let username = req.body.username;

    // Generate random ID
    const generatedRandomId = () => Math.random().toString(16).slice(2);

    // Generate new userId and create new user
    const newUser = {
      _id: generatedRandomId(),
      username: username
    };

    // Save newUser on database
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

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
