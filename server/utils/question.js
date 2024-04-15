const Tag = require("../models/tags");
const Question = require("../models/questions");
const Answer = require("../models/answers");

const addTag = async (tname) => {
    //return 'complete addTag';
    try {
        // Check if the tag already exists
        let existingTag = await Tag.findOne({ name: tname });

        if (existingTag) {
            // Return the ID of the existing tag
            return existingTag._id;
        } else {
            //Create a new tag and return its ID
            let newTag = new Tag({ name: tname });
            let savedTag = await newTag.save();
            return savedTag._id;
            // let newTag = await Tag.create({ name: tname });
            // return newTag._id;
        }
    } catch (err) {
        console.error('Error adding tag:', err);
        throw err; // Propagate the error
    }
};

const getQuestionsByOrder = async (order) => {
    // complete the function
    //return [];
    try{
    let qlist = await Question.find()
        .populate({
            path: 'answers',
            model: Answer
        }).populate({
            path: 'tags',
            model: Tag
        })
        .exec(); // Assuming Question is your Mongoose model

    switch (order) {
        case 'active':
            return getActiveQuestion(qlist);
        case 'unanswered':
            return getUnansweredQuestion(qlist);
        default:
            return getNewestQuestion(qlist);
    }
    }catch (error) {
        console.error(error);
        //res.status(500).json({ message: "Internal server error" });
        return { message: "Internal server error" };
    }

}


const getNewestQuestion = (qlist) => {
    return qlist.sort((a, b) => b.ask_date_time - a.ask_date_time);
};

const getUnansweredQuestion = (qlist) => {
    return qlist.filter((q) => q.answers.length === 0).sort((a, b) => b.ask_date_time - a.ask_date_time);
};

const getActiveQuestion = (qlist) => {
    const sortedByNewestQuestions = getNewestQuestion(qlist);
    const sortedByNewestAnswers = sortedByNewestQuestions.sort((a, b) => {
        const newestAnsDateA = getNewestAnsDate(a.answers);
        const newestAnsDateB = getNewestAnsDate(b.answers);

        return newestAnsDateB - newestAnsDateA; // Sort by newest answer date
    });

    return sortedByNewestAnswers;
};

const getNewestAnsDate = (answers) => {
    if (!answers || answers.length === 0) {
        return -1; // Default value if there are no answers
    }

    return Math.max(...answers.map((ans) => ans.ans_date_time.getTime()));
};

const filterQuestionsBySearch = (qlist, search) => {
    // complete the function return [];
    const parseTags = (search) => {
        return (search.match(/\[([^\]]+)\]/g) || []).map((word) =>
            word.slice(1, -1).toLowerCase()
        );
    };

    const parseKeyword = (search) => {
        return (search.replace(/\[([^\]]+)\]/g, " ").match(/\b\w+\b/g) || []).map((word) =>word.toLowerCase());
    };

    const checkKeywordInQuestion = (q, keywordlist) => {
        for (let w of keywordlist) {
            if (q.title.toLowerCase().includes(w) || q.text.toLowerCase().includes(w)) {
                return true;
            }
        }
        return false;
    };

    const checkTagInQuestion = (q, taglist) => {
            for (let tag of taglist) {
                // Assuming q.tags is an array of Tag objects with properties like id and name
                if (q.tags.some(tagObj => tagObj.name.toLowerCase() === tag.toLowerCase())) {
                    return true; // Found a matching tag
                }
            }
            return false; // No matching tag found
        };

    let searchTags = parseTags(search);
    console.log
    let searchKeyword = parseKeyword(search);

    return qlist.filter((q) => {
        if (searchKeyword.length == 0 && searchTags.length == 0) {
            return true;
        } else if (searchKeyword.length == 0) {
            return checkTagInQuestion(q, searchTags);
        } else if (searchTags.length == 0) {
            return checkKeywordInQuestion(q, searchKeyword);
        } else {
            return (
                checkKeywordInQuestion(q, searchKeyword) ||
                checkTagInQuestion(q, searchTags)
            );
        }
    });  
}


module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch };