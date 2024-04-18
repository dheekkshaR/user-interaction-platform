import "./index.css";
import React from "react";
import { handleHyperlink } from "../../../../tool";
import { upvoteQuestion, downvoteQuestion } from "../../../../services/questionService";

// Component for the Question's Body
const QuestionBody = ({ views, text, askby, meta, upvotes, downvotes , user, qid,change, setChange}) => {
    //console.log(user);
    const handleUpvote = async () => {
        try {
            const userId = user._id; // Assuming user object has an _id field
            await upvoteQuestion(qid, userId);
            setChange(change+1);
        } catch (error) {
            console.error("Error upvoting question:", error);
            // alert(error)

        }
    };

    const handleDownvote = async () => {
        try {
            const userId = user._id; // Assuming user object has an _id field
            await downvoteQuestion(qid, userId);
            setChange(change+1);
        } catch (error) {
            console.error("Error downvoting question:", error);

        }
    };

    return (
        <div id="questionBody" className="questionBody right_padding">
            <div className="bold_title answer_question_view">{views} views</div>
            <div className="answer_question_text">{handleHyperlink(text)}</div>
            <div className="answer_question_right">
                <div className="question_author">{askby}</div>
                <div className="answer_question_meta">asked {meta}</div>
                <div className="votes"> 
                    <i className="fa fas fa-thumbs-up upvotePost" onClick={handleUpvote}></i> {upvotes} 
                    <i className="fa fas fa-thumbs-down" onClick={handleDownvote}></i> {downvotes}
                </div>
            </div>
        </div>
    );
};

export default QuestionBody;
