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

// POST username
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/api/users", bodyParser.json());
app.post("/api/users", (req, res) => {
    let username = req.body.username;

    //Generate an userId
    const generatedId = 'user-' + Math.random().toString(36).substring(2, 15);

    res.json({ 
      _id: generatedId, 
      username: username 
    });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
