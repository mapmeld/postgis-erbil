# Workshop Config / Step 0

This readme is solely for setting up the cloud PostGIS and Jupyter Notebooks
for multiple workshop participants.

### Installing and running locally

Install GDAL, PostgreSQL, and PostGIS

Set up the database and read-only user:

```bash
pip install csvkit psycopg2

mkdir ~/Documents/jserb # data can be stored in any new directory, just be consistent
initdb jserb/
postgres -D jserb/
createdb jserb
psql jserb
```

You are now in the PSQL prompt:

```sql
CREATE USER js;
ALTER USER js WITH PASSWORD 'erb';
GRANT CONNECT ON DATABASE jserb TO js;
GRANT USAGE ON SCHEMA public TO js;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO js;

REVOKE CREATE ON SCHEMA public FROM PUBLIC;
REVOKE CREATE ON SCHEMA public FROM js;

# activate PostGIS
CREATE EXTENSION postgis;
```

Import the trains table (TBD: replace with a CSV import)

```sql
DROP TABLE trains; # overwrite any old trains table
CREATE TABLE trains (start TEXT, finish TEXT, seats INT, id INT, price FLOAT);
INSERT INTO trains (start, finish, seats, id, price) VALUES ('Harare', 'Victoria Falls', 100, 1, 100);
INSERT INTO trains (start, finish, seats, id, price) VALUES ('Harare', 'Bulawayo', 25, 2, 10);

DROP TABLE train_reviews; # overwrite any old train reviews table
CREATE TABLE train_reviews (train_id INT, stars INT);
INSERT INTO train_reviews (train_id, stars) VALUES (1, 1);
INSERT INTO train_reviews (train_id, stars) VALUES (2, 2);
INSERT INTO train_reviews (train_id, stars) VALUES (1, 3);
INSERT INTO train_reviews (train_id, stars) VALUES (2, 4);
INSERT INTO train_reviews (train_id, stars) VALUES (1, 5);
INSERT INTO train_reviews (train_id, stars) VALUES (2, 1);
```

### Importing the geodata using ogr2ogr (from GDAL)

```bash
sudo apt-get install gdal-bin

sudo -i -u postgres
ogr2ogr -f "PostgreSQL" PG:"dbname=jserb" zimbabwe-districts.geojson
csvsql --db postgresql:///jserb step-4/health.csv --insert
psql jserb
```

Rename and reclassify the districts table

```sql
ALTER TABLE zimbabwe_districts RENAME TO districts;
ALTER TABLE districts ALTER wkb_geometry TYPE GEOGRAPHY;
```

### Launching the Jupyter notebooks

- https://jupyter-notebook.readthedocs.io/en/stable/public_server.html
- Enable global access from a non-root user
- Set a password
- disown

Technically we should use JupyterHub. Maybe in the future.

### Launching the directory homepage

You need a tool such as Apache or Nginx to create a TLS certificate
and serve over HTTPS. Proxy to port 8000:

```bash
wget -qO- https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
cd postgis-erbil/workshop-config
npm install
PORT=8000 node app.js &
disown
```

### TODOs

- JupyterHub
- SQLAlchemy via https://docs.sqlalchemy.org/en/latest/dialects/postgresql.html#module-sqlalchemy.dialects.postgresql.psycopg2
- Take-home Tips for installing PostgreSQL, PostGIS, GDAL on systems
- Finish adding more notebooks
