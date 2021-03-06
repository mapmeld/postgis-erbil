# Step 4

SQL and Geographic Data

In this step, we'll apply what we learned / reviewed about SQL to the exciting new
geospatial queries in PostGIS.

### Installing and running locally

As the db admin user, import GeoJSON and other files using ogr2ogr (part of GDAL install). Here's how we imported a GeoJSON file into a "erb_districts" table:

```bash
ogr2ogr -overwrite -f "PostgreSQL" PG:"dbname=jserb" -nln erb-districts districts.geojson
ogr2ogr -overwrite -f "PostgreSQL" PG:"dbname=jserb" -nln erb-districts districts.geojson
```

Here's how an ESRI Shapefile format can be imported (first extract from any .ZIP / .RAR)

```bash
ogr2ogr -overwrite -f "PostgreSQL" PG:"dbname=jserb" wards.shp -nln wards
```

Tips for importing other formats of geodata:
https://morphocode.com/using-ogr2ogr-convert-data-formats-geojson-postgis-esri-geodatabase-shapefiles/

Then run ```psql jserb``` and alter wkb_geometry to a GEOGRAPHY type. If you
don't have a GEOGRAPHY type, you ought to run ```CREATE EXTENSION postgis;``` first.

```sql
ALTER TABLE erb_districts RENAME TO districts;
ALTER TABLE districts ALTER wkb_geometry TYPE GEOGRAPHY;
```

Importing Geo Data: Other

**CSV EXAMPLE**

There was a shapefile option, but I'd like to share how I would import this from CSV or even Excel format. We need to install CSVkit and do the upload (Pandas also can do this).

```bash
pip install csvkit
csvsql --db postgresql:///jserb --tables health healthsites.csv --insert

# for remote db
csvsql --db postgresql://user:pass@hostIP/jserb --tables health healthsites.csv --insert
```

```sql
ALTER TABLE health ADD COLUMN point GEOGRAPHY;
UPDATE health SET point = ST_MakePoint(x, y);
```

We can use a JOIN with a spatial component here:

```sql
# how many health facilities per district?
SELECT COUNT(*), adm1, adm2 FROM health
  JOIN districts ON ST_Intersects(districts.wkb_geometry, health.point)
  GROUP BY adm1, adm2

# do any districts have zero health facilities?
SELECT adm1, adm2 FROM districts
  WHERE (SELECT COUNT(*) FROM health WHERE ST_Intersects(districts.wkb_geometry, health.point)) = 0;
```

You could use these two datasets to find the nearest health facility with electricity,
or do a count of health facilities in each district with a dentist,
or other comparisons.

### Interactive Tutorial

Connect to the database (```psql jserb -U js```) and use SQL with new geo commands
with districts.

You will need the previous steps to have succeeded for the geodata to appear here.

```sql

# point data
SELECT * FROM health LIMIT 1;

SELECT ST_AsText(point) FROM health LIMIT 1;
SELECT ST_AsGeoJSON(point) FROM health LIMIT 1;
SELECT ST_AsGeoJSON(point), nameoffaci FROM health LIMIT 1;

# shape data
SELECT * FROM districts LIMIT 1;
SELECT ST_AsGeoJSON(wkb_geometry) FROM districts LIMIT 1;

# we are given a lng/lat (integer values) inside Erbil
# explain that lng/lat order is important
# explain that lng/lat coordinates are decimals but this is just demo

SELECT adm1, adm2 FROM districts
WHERE ST_Intersects(wkb_geometry, ST_AsPoint(31, -18));
```

We can also improve performance in large datasets by adding a spatial index on
any geography-type columns.

Only the first command is necessary here, but the others can improve performance.
For more read: http://revenant.ca/www/postgis/workshop/indexing.html

```sql
CREATE INDEX district_gix ON districts USING GIST (wkb_geometry);
VACUUM ANALYZE districts;
CLUSTER districts USING districts_gix;
ANALYZE districts;
```

### Learnings

- Given SQL experience, basic to intermediate SQL knowledge
- Reminder of how a common SQL JOIN would work (trains and train reviews)
- New functions and concepts (ST_AsGeoJSON, (even spatial JOIN?)) for PostGIS
