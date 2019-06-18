const fs = require('fs');

// read-only postgres
const ropg = require('read-only-pg');
const client = new ropg.Client({
  user: 'js',
  password: 'erb',
  //port: 5432,
  database: 'jserb',
  host: 'gis.georeactor.com'
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
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express['static'](__dirname + '/static'));

app.get('/', (req, res) => {
  // static maps homepage
  res.render('index');
});

// API method
app.get('/about', (req, res) => {
  let lat = req.query.lat * 1,
      lng = req.query.lng * 1;
  client.query(`SELECT adm2name, adm3name, ST_AsGeoJSON(wkb_geometry) AS geojson
            FROM districts
            WHERE ST_Intersects(wkb_geometry, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326))`,
    (err, district) => {
    if (err) { return res.json({ place: 'district', err: err }); }
    client.query(`SELECT mahallahna, ST_AsGeoJSON(wkb_geometry) AS geojson
                FROM erbil
                WHERE ST_Intersects(wkb_geometry, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326))`,
      (err, neighborhood) => {
      if (err) { return res.json({ place: 'neighborhood', err: err }); }
      client.query(`SELECT ST_Distance(point, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) AS distance,
          name, ST_AsGeoJSON(point) AS point FROM health
          WHERE ST_DWithin(point, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326), 20000)
          ORDER BY ST_Distance(point, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) ASC
          LIMIT 1`,
        (err, health) => {
        if (err) { return res.json({ place: 'distance', err: err }); }
        res.json({
          district: district,
          neighborhood: neighborhood,
          health: health
        });
      });
    });
  });
});

// PG tests
app.get('/messy', (req, res) => {
  client.query('CREATE TABLE banana', (err, data) => {
    res.json(err || data);
  });
});
app.get('/messy2', (req, res) => {
  client.query("INSERT INTO planes (id, start) VALUES (1, 'NYC')");
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server ready to go');
});
