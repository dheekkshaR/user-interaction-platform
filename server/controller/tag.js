const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

const getTagsWithQuestionNumber = async (req, res) => {

    try {
        const tags = await Tag.find();
        const tagWithCounts = {};

        // Initialize tagWithCounts with tag IDs
        tags.forEach((tag) => {
            tagWithCounts[tag.name] = { name: tag.name, qcnt: 0 };
        });

        // console.log((tagWithCounts));

        // Get all questions and update tagWithCounts
        const questions = await Question.find().populate({
            path: 'tags',
            model: Tag
        })
        // console.log(questions);
        
        questions.forEach((question) => {
            question.tags.forEach((tagId) => {
                console.log(tagId)
                if (tagWithCounts[tagId.name]) {
                    tagWithCounts[tagId.name].qcnt++;
                }
            });
        });

        // console.log(tagWithCounts);

        // Convert tagWithCounts object to an array for response
        const tagCountsArray = Object.values(tagWithCounts);
        // console.log(tagCountsArray);

        res.status(200).json(tagCountsArray);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

};

// add appropriate HTTP verbs and their endpoints to the router.
router.get("/getTagsWithQuestionNumber", getTagsWithQuestionNumber);
module.exports = router;
