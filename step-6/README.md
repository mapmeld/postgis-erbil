# Step 5

Let's take the API a step further and make an election poll place app.

### Technical Setup

Launch the Express server:

```bash
node serve.js
```

The server will now be available on http://localhost:3000/

### Interactive Tutorial

Previously we did some queries to find my local district and health facilities.

What if we wanted to do an election app?  In a real example, I would have tables for
candidates and wards. For now we only have the Erbil neighborhoods/districts table.

```sql
SELECT ST_AsGeoJSON(wkb_geometry)
FROM wards
WHERE ST_Intersects(wkb_geometry, ST_MakePoint(%s, %s))
```

What if I live near the border of a district? In some places, people
on one side of the street vote in one building, and people on the other side of
the street go somewhere else.

We need to:

- help user to type in an address (Google Maps + JS)
- send the address lat/lng to the database
- add a geospatial BUFFER around the districts, and find all local wards
- let browser know all of the possible answers

Fortunately PostGIS can help with geospatial calculations. The ```ST_Buffer``` function will turn our point into a circle around our point. We can choose how many meters to make the circle radius.

```sql
SELECT ST_AsGeoJSON(wkb_geometry) AS ward,
  ADM1_EN, ADM2_EN, ADM3_EN
FROM wards
WHERE ST_Intersects(wkb_geometry,
  ST_Buffer(ST_MakePoint(%s, %s), 50)
)
```

Most of the rest of the project would be JavaScript UI/UX

(can go over index.html for now, or use Google Maps API docs to add autocomplete)

Census circle/radius calculation?

We can talk about it, but I don't have prep time or sufficient data for example here, yet.

### Learnings
