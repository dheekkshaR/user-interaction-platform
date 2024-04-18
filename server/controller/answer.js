const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");

const router = express.Router();

// Adding answer
const addAnswer = async (req, res) => {
    //res.json({msg: 'Complete function'});
    try {
        const { qid, ans } = req.body;
        const newAnswer = await Answer.create({
            text: ans.text,
            ans_by: ans.ans_by,
            ans_date_time: ans.ans_date_time,
        });

        // Update the corresponding question with the new answer ID
        const question = await Question.findOneAndUpdate(
            {_id: qid},
            { $push: { answers: { $each: [newAnswer._id], $position: 0 } } },
            { new: true }
        );

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json(newAnswer); // Return the newly created answer
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// add appropriate HTTP verbs and their endpoints to the router.
router.post("/addAnswer", addAnswer);

module.exports = router;
