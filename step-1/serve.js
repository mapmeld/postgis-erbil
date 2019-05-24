const fs = require('fs');

// read-only postgres
const ropg = require('read-only-pg');
const client = new ropg.Client({
  user: 'js',
  password: 'erb',
  //port: 5432,
  //host: 'db.example.com'
});
client.connect((err) => {
  // callback optional
  if (err) {
    throw err;
  }
});

// express
const express = require('express');
const compression = require('compression');

const app = express();
app.use(compression());

const homepage = fs.readFileSync('./static/index.html');
app.get('/', (req, res) => {
  // static maps homepage
  res.send(homepage);
});

// API method
app.get('/about', (req, res) => {
  client.query('SELECT NOW()');
});

// PG tests
app.get('/messy', (req, res) => {
  client.query('SELECT NOW()');
});
app.get('/messy2', (req, res) => {
  client.query('SELECT NOW()');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server ready to go');
});
