const express = require("express");
const Question = require("../models/questions");
const Answer = require("../models/answers");
const User = require("../models/users");
// const Tag = require("../models/tags");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');

const router = express.Router();

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
    //res.json(['Complete the function']);
    try {
        const { order, search } = req.query;

        let questions;
        if (search && order) {
            // Handle both search and order
            let orderDone = await getQuestionsByOrder(order);

            questions = await filterQuestionsBySearch(orderDone,search);
            // console.log("Search done:  -----"+questions);
        } else if (search) {
            // Handle only search
            let orderDone = await getQuestionsByOrder("newest");
            questions = await filterQuestionsBySearch(orderDone,search);
        } else if (order) {
            // Handle only order
            questions = await getQuestionsByOrder(order);
        } else {
            // Handle none of these
            questions = await getQuestionsByOrder(); // Or any other logic to get all questions
        }

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

// add appropriate HTTP verbs and their endpoints to the router
router.get("/getQuestion", getQuestionsByFilter);
router.get("/getQuestionById/:qid", getQuestionById); 
router.post("/addQuestion", addQuestion);

module.exports = router;
