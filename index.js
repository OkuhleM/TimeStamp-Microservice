
var express = require('express');
var app = express();

require('dotenv').config()
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));


app.get("/timestamp/:datestring?", (req, res) => {
  const datestring = req.params.datestring;
  const dateStringRegex = /^[0-9]+$/;
  const dateNumbers = dateStringRegex.test(datestring)



  if (!dateNumbers) {

    const unixTimeStamp = Date.parse(datestring)
    const utcDate = new Date(unixTimeStamp).toUTCString()

    unixTimeStamp
      ? res.json({
        "unix": unixTimeStamp,
        "utc": utcDate
      })
      : res.json({ error: "Invalid Date" })

  } else {
    const unixTimeStamp = parseInt(datestring)
    const actualDate = new Date(unixTimeStamp)
    const utcDate = actualDate.toUTCString()

    res.json({
      unix: unixTimeStamp,
      utc: utcDate
    })
  }

});

app.get('/timestamp/', (req, res) => {
  const currentDate = new Date().toUTCString()
  const currentUnix = Date.parse(currentDate)
  res.json({
    unix: currentUnix,
    utc: currentDate
  })
})

app.get("/", function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log(process.env.PORT)
});
