# Step 1

What kind of website uses PostGIS?

As an introduction to the workshop, I want to show some examples of how
people use online maps.  These examples will use local datasets (in this
case, Iraq and Kurdistan).

All of these examples will be powered by a Node server (Express framework)
and PostGIS database (PostgreSQL + extensions).

Everything will be explained in the later steps.

### Installing and running locally

If you are setting up the database from scratch, see workshop-config:

```
npm install express compression pug read-only-pg
node serve.js
```

The server will now be available on http://localhost:3000/

### Interactive Tutorial

This is a demo of geospatial data and a PostGIS-powered API which are useful for different projects.

Where did we get this data? How does PostGIS respond so much faster than running
in the browser? Why use PostGIS instead of a standard Postgres or MySQL db?

The cloud database has a read-only js:erb user, so you can do SELECT and JOIN
but not INSERT, DELETE, UPDATE, CREATE TABLE, or DROP TABLE.

### Learnings

- Is your computer set up to run a NodeJS server and database?
- What are your PostgreSQL connection parameters?
- Concept of Connection and Cursor objects
- Read-only user js:erb for this tutorial (see /messy and /messy2 routes)
- Responding in JSON format
