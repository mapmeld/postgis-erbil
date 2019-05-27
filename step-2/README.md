# Step 2

Where do I find geo data for my website?

To make the tutorial as relevant as possible, I want to show how it's possible to
download information about my workshop country (in this case, Iraq and Kurdistan) and import it into PostGIS.  This can be difficult to install and troubleshoot, so I might end up showing most of this on the projector. Even if students cannot import data in the workshop, they can run future steps with the tables in the PostGIS cloud instance or the Jupyter notebooks.

All of these datasets will be imported into a PostGIS database (PostgreSQL + extensions).

Data will be used in the later steps.

### Installing and running locally

Install ogr2ogr by installing GDAL.

### Data sources (continuing to work on these)

**Princeton ESOC**

Baghdad neighborhoods https://esoc.princeton.edu/files/89-neighborhoods-baghdad
Iraq governorates https://esoc.princeton.edu/files/administrative-boundaries-governorates
Iraq districts https://esoc.princeton.edu/files/administrative-boundaries-districts
District Level Ethnic https://esoc.princeton.edu/files/ethnicity-study-district-level-ethnic-populations

**GIS-for-you**

Source of Erbil parcels: http://gis-for-you.blogspot.com/2017/11/download-shapefile-building-207200.html

**HumData**

Cities https://data.humdata.org/dataset/settlements-villages-towns-cities
Health https://data.humdata.org/dataset/iraq-healthsites
Damage Assessment https://data.humdata.org/dataset/damage-assessment-of-mosul-ninawa-governorate-iraq-2738

**KRG**

KRG maps data (PDF) http://mnr.krg.org/index.php/en/media-center/videos/9-maps-and-data

**ArcGIS.com (multiple sources)**

**MS.gov**

Alternate  KU bounds (3 governorates) https://opendata.gis.ms.gov/items/f9062cae38d148419451318699c8a959?geometry=37.267%2C34.249%2C53.087%2C37.366
Salahaddin Uni https://opendata.gis.ms.gov/items/c07485932a434a35a64153ce79d5ab2d?geometry=44.012%2C36.14%2C44.043%2C36.146

**Norfolk County**

IQ-KU Boundaries http://opendata.norfolkcounty.ca/items/9fd49d3fb1e84ab691fe2ac4bc1ac806?geometry=36.884%2C34.193%2C52.704%2C37.313

Neighborhoods = https://services5.arcgis.com/mfAGffSG1CUERVmH/arcgis/rest/services/Erbil_City_Data/FeatureServer/2/query?where=1%3E0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=html&token=

**Harvard CGA**

Erbil 1967 swipe http://harvard-cga.maps.arcgis.com/apps/StorytellingSwipe/index.html?appid=aa7339c0817c49bbac275664a368de99

### Interactive Tutorial

Here we are talking about different data sources. I'm interested to hear where
Re-Coded members have found good geodata before.

- GeoJSON

- Shapefile

- Downloading OSM data

(TBD: brief intro to OpenStreetMap)

There are tons of community-built data on OpenStreetMap (OSM). You can use
the XML API to get all of the data in a specific area, GeoFabrik for
country-level downloads, and Overpass to do larger queries.

I used http://overpass-turbo.eu/ to download schools from OpenStreetMap and
Export to GeoJSON.

```
node
  [amenity=school]
  ({{bbox}});
out;
```

- Importing Geo CSVs

There's a good example in Step 4 of uploading a CSV which has latitude and longitude. I put it in the next step, because it involves using csvkit command
line tools and SQL to change column names / types.

### Learnings

- Do members of Re-Coded know local sources for geo data?
- What is OpenStreetMap?
- How can I get data to make quality websites?
- Links for installing ogr2ogr on your computer
