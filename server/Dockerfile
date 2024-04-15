FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8000

# CMD ["sh", "-c", "node init.js && npm start"]
# # Run the populate_db.js script when the container starts
# CMD ["node", "populate_db.js", "mongodb://mongodb:27017/fake_so"]
# Use start.sh as the entry point
ENTRYPOINT ["/bin/sh", "-c", "./start.sh"]