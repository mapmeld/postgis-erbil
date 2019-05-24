# postgis-erbil

A PostGIS tutorial with NodeJS and SQL as the main languages.
Based on workshop from PyCon Zimbabwe.

## Participatory

My goal was to create a PostGIS demo which would be accessible to students
if they have not installed NodeJS, PostgreSQL, or PostGIS. It does
require internet access to use the ObservableHQ-hosted notebooks.

- SQL queries and NodeJS scripts for interacting with local PostGIS
- Basic server config for a read-only PostGIS in the cloud
- (ideally forkable) JS Observable notebooks for PostGIS in the cloud

## Topics

- Finding and downloading geodata (govt data, OpenStreetMap)
- Setting up PostGIS
- SQL Review and Added Features of PostGIS
- Importing CSVs and geodata
- Commands for import, export, querying
- Sample queries with map frontends: point-in-polygon, nearest point, buffers, US census statistics, etc

## Setup for public PostGIS and Jupyter Notebooks

I set up on DigitalOcean so that ports and resizing would be more readily available.

The documents linked here are old. The current version of PostgreSQL is '10'

Installing PostgreSQL on Ubuntu:
https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04

Installing and configuring PostGIS on Ubuntu:
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postgis-on-ubuntu-14-04

Making PostgreSQL open to the web:
https://bosnadev.com/2015/12/15/allow-remote-connections-postgresql-database-server/

DigitalOcean firewall: https://www.digitalocean.com/community/questions/opening-ports-on-my-server

## License

Open source, MIT license
