var express = require('express');
var app = express();
const cheerio = require('cheerio')
var r = require('request');

app.use(express.static('public'));

app.get('/', function(request, response) {
  
  r.get('https://en.wikipedia.org/wiki/Jeff_Bezos', function(err, res, body){
    if (err || res.statusCode != 200) {
      response.status(500).json({'wikipediaStatus': res.statusCode, 'ok': 0, 'message': err || body})
      console.log(err || body)
    } else {
      const $ = cheerio.load(body)
      
      // it works - don't worry about it
      var netWorth = $("th:contains('worth')").next().text().replace(/\(.*\)/,'').replace(/\[.*\]/,'').replace('US','')
      console.log(netWorth.trim())
      
      response.status(200).json({'wikipediaStatus': res.statusCode, 'ok': 1, 'message': netWorth.trim()})
    }
  })
});

var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
