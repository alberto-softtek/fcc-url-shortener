'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dns = require('dns');

const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};

var cors = require('cors');

var app = express();

const urls = [];

const randAlphaNum = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});

app.post('/api/shorturl/new', (req, res) => {
  dns.lookup('example.com', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
  
  const shortendUrl = {
    original_url: req.body.url,
    short_url: randAlphaNum()
  }
  urls.push(shortendUrl);
  res.json(shortendUrl);
});

app.get('/api/shorturl/:url', (req, res) => {
  const urlArray = urls.filter(url => url.short_url === req.params.url);
  
  // if (urlArray.length === 0) {
  //   const url = {error: "invalid URL"};
  //   res.redirect(url);
  // } else {
  //   const url = urlArray[0];
  //   res.redirect(url.original_url);
  // }
  
  res.redirect(urlArray[0].original_url);
  
});