const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        typeOfUser: { type: String, enum: ['admin', 'moderator', 'regular'], required: true },
        password: { type: String, required: true },
        age: { type: Number},
        bio: { type: String }
    },
    { collection: "User" }
);