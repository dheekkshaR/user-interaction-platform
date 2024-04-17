const mongoose = require("mongoose");

// Schema for answers
module.exports = mongoose.Schema(
    {
        // define relevant properties.
        text: { type: String, required: true },
        ans_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        ans_date_time: { type: Date, default: Date.now },
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    { collection: "Answer" }
);