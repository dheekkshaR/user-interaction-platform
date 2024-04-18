const express = require("express");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
// const Tag = require("../models/tags");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch, filterQuestionsByFlagged, filterQuestionsByUser } = require('../utils/question');

const router = express.Router();

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
    //res.json(['Complete the function']);
    try {
        const { order, search } = req.query;

        let questions;
        if (search && order) {
            // Handle both search and order
            if (order=="flagged"){
                console.log("flagged")
                let getall = await getQuestionsByOrder();
                questions = await filterQuestionsByFlagged(getall);
            }
            else{
                questions = await getQuestionsByOrder(order);
            }
            // let orderDone = await getQuestionsByOrder(order);
                questions = await filterQuestionsBySearch(questions,search);
         
            // console.log("Search done:  -----"+questions);
        } else if (search) {
            // Handle only search
            let orderDone = await getQuestionsByOrder("newest");
                questions = await filterQuestionsBySearch(orderDone,search);
            
        } else if (order) {
            // Handle only order
            if (order=="flagged"){
                console.log("only flagged");
                let getall = await getQuestionsByOrder();
                questions = await filterQuestionsByFlagged(getall);
                //console.log(questions)
            }
            else{
                questions = await getQuestionsByOrder(order);
            }

        } else {
            // Handle none of these
            questions = await getQuestionsByOrder(); // Or any other logic to get all questions
        }

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// To get Questions by Filter
const getQuestionsByUser = async (req, res) => {
    //res.json(['Complete the function']);
    try {
        const { author } = req.params;

        let questions;
        let orderDone = await getQuestionsByOrder();

        questions = await filterQuestionsByUser(orderDone, author);

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// To get Questions by Id
const getQuestionById = async (req, res) => {
    //res.json({msg: 'complete the function'});
    try {
        const { qid } = req.params;
        const question = await Question.findOneAndUpdate(
            { _id: qid },
            { $inc: { views: 1 } },
            { new: true }
        ).populate({
            path: 'answers',
            model: Answer,
            populate: {
                path: 'ans_by',
                model: User
            }
        }).populate({
            path: 'asked_by',
            model: User
        })

        if (!question) {
            return res.status(404).json({ message: "Database error" });
        }

        res.status(200).json(question);
    } catch (error) {
        console.log("by id error"+ error);
        //res.status(500).json({ error: "Database error", message: "Database error" }); 
        //res.status(500).json({ error: "Database error" });
        //res.status(500).json({ message: "Database error" });
        // if (error.message === 'Database error') {
        //     res.status(500).json({ error: 'Database error' });
        // } else {
        //     res.status(500).json({ message: "Internal server error" });
        // }
    }


};

// To add Question
const addQuestion = async (req, res) => {
    try {
        const { title, text, tags, asked_by, ask_date_time , } = req.body;

        const tagIds=  await Promise.all(tags.map(async (tagName) => { return addTag(tagName); }));

        // Create a new instance of the Question model with tagIds
        const newQuestion = await Question.create({
            title: title,
            text: text,
            tags: tagIds,
            asked_by: asked_by,//asked by is already a user id from client side
            ask_date_time: ask_date_time,
            upvotes:[],
            downvotes:[],
            flagged:0
        });

        console.log(newQuestion);

        res.status(200).json(newQuestion); // Return the newly created question
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To upvote a Question by Id
const upvoteQuestion = async (req, res) => {
    try {
        const { qid, userId } = req.body;

        // Find the question by ID
        const question = await Question.findById(qid);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user has already downvoted the question
        const user = await User.findById(userId);
        if (user && question.downvotes.includes(userId)) {
            // Remove user from downvotes list
            question.downvotes = question.downvotes.filter((id) => id.toString() !== userId);
        }
        // Check if the user has already upvoted the question
        if (question.upvotes.includes(userId)) {
            // Remove user's upvote from the upvotes array
            question.upvotes = question.upvotes.filter(id => id.toString() !== userId);
            await question.save();

            return res.status(200).json({ message: "Upvote removed successfully" });
        }

        // Add user to upvotes list
        question.upvotes.push(userId);
        await question.save();

        res.status(200).json({ message: "Question upvoted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// To downvote a Question by Id
const downvoteQuestion = async (req, res) => {
    try {
        const { qid, userId } = req.body;

        // Find the question by ID
        const question = await Question.findById(qid);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Check if the user has already upvoted the question
        const user = await User.findById(userId);
        if (user && question.upvotes.includes(userId)) {
            // Remove user from upvotes list
            question.upvotes = question.upvotes.filter((id) => id.toString() !== userId);
        }

        // Check if the user has already downvoted the question
        if (question.downvotes.includes(userId)) {
            // Remove user's downvote from the downvotes array
            question.downvotes = question.downvotes.filter(id => id.toString() !== userId);
            await question.save();

            return res.status(200).json({ message: "Downvote removed successfully" });
        }

        // Add user to downvotes list
        question.downvotes.push(userId);
        await question.save();

        res.status(200).json({ message: "Question downvoted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteQuestion = async (req,res) => {
    try {
        const { qid } = req.params;
        console.log(qid);
        // Find the question by ID and delete it
        const deletedQuestion = await Question.findByIdAndDelete(qid);

        if (!deletedQuestion) {
            res.status(500).json({ message: "Cant find question" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const moderatorAccept = async (req, res) => {
    try {
        const { qid } = req.params;

        // Find the question by ID
        const question = await Question.findById(qid);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Set the flagged attribute value to 0
        question.flagged = 0;
        await question.save();

        res.status(200).json({ message: "Flagged attribute updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const reportQuestion = async (req, res) => {
    try {
        const { qid } = req.params;

        // Find the question by ID
        const question = await Question.findById(qid);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Set the flagged attribute value to 0
        question.flagged = question.flagged+1;
        await question.save();

        res.status(200).json({ message: "Flagged attribute + updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

router.post("/upvoteQuestion", upvoteQuestion);
router.post("/downvoteQuestion", downvoteQuestion);
// add appropriate HTTP verbs and their endpoints to the router
router.get("/getQuestion", getQuestionsByFilter);
router.get("/getQuestionsByUser/:author", getQuestionsByUser);
router.get("/getQuestionById/:qid", getQuestionById); 
router.post("/addQuestion", addQuestion);
router.delete("/deleteQuestion/:qid", deleteQuestion);
router.post("/moderatorAccept/:qid", moderatorAccept);
router.post("/reportQuestion/:qid", reportQuestion);

module.exports = router;
