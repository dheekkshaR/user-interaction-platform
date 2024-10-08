// Application server

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session")

const { MONGO_URL,CLIENT_URL, port } = require("./config");

mongoose.connect(MONGO_URL);

const app = express();
const secret = process.argv[2];
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        credentials: true,
        origin: [CLIENT_URL],
    })
);
app.use(express.json());

app.use(
    session({
      secret: `${secret}`,
      cookie: {
          httpOnly: true,
          sameSite: true,
      },
      resave: false,
      saveUninitialized: false
    })
  )

app.get("/", (_, res) => {
    res.send("Fake SO Server Dummy Endpoint");
    res.end();
});

app.get("/questionFake", (_, res) => {
    console.log("Received request for /question fake endpoint");
    res.send("Question endpoint");
    res.end();
});


const questionController = require("./controller/question");
const tagController = require("./controller/tag");
const answerController = require("./controller/answer");
const userController = require("./controller/user");

app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/user", userController);

let server = app.listen(0, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

module.exports = server