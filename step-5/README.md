# Step 5

We're now going to talk about an API server which uses PostGIS as the database.
The server is in NodeJS.

### Technical Setup

Launch the Express server:

```bash
npm install express compression read-only-pg
node serve.js
```

The server will now be available on http://localhost:3000/

### Interactive Tutorial

Let's make it so that when you click on the map, we reply with information about
that point (specifically, the district).

```javascript
const express = require('express');
const app = express();
...
app.get('/local', (request, response) => {
    client.query("SELECT adm1, adm2
          FROM districts
          WHERE ST_Intersects(wkb_geometry, ST_MakePoint(%s, %s))",
          [request.query.lng, request.query.lat],
          (err, results) => {
              return response.json(results);
          });
});
```

If there is no district, this API only returns ```null```. Let's choose a nicer way
for the API to reply that the point is not within Iraqi borders.

```javascript
if (!results.length) {
  return response.json({"name": "Foreign"});
}
```

It is not so interesting to show only the district's name. Let's use the ST_AsGeoJSON function which we learned earlier, to return the boundary of the local district and highlight it on the map.

```sql
SELECT adm1, adm2, ST_AsGeoJSON(wkb_geometry) FROM districts
...
```

What if instead of knowing more about my location, we want to know the nearest health facility?

```sql
SELECT *, ST_AsGeoJSON(point),
  ST_Distance(point, ST_MakePoint(%s, %s))
FROM health
WHERE ST_Distance(point, ST_MakePoint(%s, %s)) < 50000
ORDER BY ST_Distance(point, ST_MakePoint(%s, %s)) DESC
LIMIT 1
```

### Learnings
