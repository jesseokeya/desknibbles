const express = require('express')
const app = express()
const cors = require('cors')
const request = require('request');
const morgan = require('morgan');
const PORT = process.env.PORT || 3001

app.use(express.static(__dirname + '/app/build'))
app.use(morgan('dev'));

app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/app/build/index.html');
});

app.get('/faveSnack', (req, res) => {
  const faveSnacksURL = 'https://s3.amazonaws.com/misc-file-snack/MOCK_SNACKER_DATA.json'

  request(faveSnacksURL, function (error, response, body) {
    res.send(JSON.parse(response.body))
  })
})

app.listen(PORT, () => console.log(`server running port ${PORT}`))
