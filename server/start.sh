#!/bin/sh

# Run initialization script
node init.js

# Run populate_db.js script
node populate_db.js "mongodb://mongodb:27017/fake_so"

# Start your Node.js application
npm start
