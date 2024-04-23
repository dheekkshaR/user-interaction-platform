const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");

const router = express.Router();

// Adding answer
const addAnswer = async (req, res) => {
    try {
        const { qid, ans } = req.body;
        console.log("qid: ", qid)
        console.log("ans", JSON.stringify(ans))
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

// To upvote an Answer by Id
const upvoteAnswer = async (req, res) => {
    try {
        const { aid, userId } = req.body;

        // Find the answer by ID
        const answer = await Answer.findById(aid);

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        // Check if the user has already downvoted the answer
        if (answer.downvotes.includes(userId)) {
            // Remove user's downvote from the downvotes array
            answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId);
        }

        // Check if the user has already upvoted the answer
        if (answer.upvotes.includes(userId)) {
            // Remove user's upvote from the upvotes array
            answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId);
            await answer.save();

            return res.status(200).json({ message: "Upvote removed successfully" });
        }

        // Add user to upvotes list
        answer.upvotes.push(userId);
        await answer.save();

        res.status(200).json({ message: "Answer upvoted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To downvote an Answer by Id
const downvoteAnswer = async (req, res) => {
    try {
        const { aid, userId } = req.body;

        // Find the answer by ID
        const answer = await Answer.findById(aid);

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }

        // Check if the user has already upvoted the answer
        if (answer.upvotes.includes(userId)) {
            // Remove user's upvote from the upvotes array
            answer.upvotes = answer.upvotes.filter(id => id.toString() !== userId);
        }

        // Check if the user has already downvoted the answer
        if (answer.downvotes.includes(userId)) {
            // Remove user's downvote from the downvotes array
            answer.downvotes = answer.downvotes.filter(id => id.toString() !== userId);
            await answer.save();

            return res.status(200).json({ message: "Downvote removed successfully" });
        }

        // Add user to downvotes list
        answer.downvotes.push(userId);
        await answer.save();

        res.status(200).json({ message: "Answer downvoted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// add appropriate HTTP verbs and their endpoints to the router.
router.post("/addAnswer", addAnswer);
router.post("/upvoteAnswer", upvoteAnswer);
router.post("/downvoteAnswer", downvoteAnswer);
module.exports = router;
