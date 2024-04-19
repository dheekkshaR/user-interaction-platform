import { handleHyperlink } from "../../../../tool";
import "./index.css";
import { upvoteAnswer, downvoteAnswer } from "../../../../services/answerService";

// Component for the Answer Page
const Answer = ({ text, ansBy, meta , upvotes, downvotes, user, change, setChange, aid}) => {
    console.log(user)
    ansBy=ansBy.username;
    


    const handleUpvote = async () => {
        try {
            const userId = user._id;
            await upvoteAnswer(aid, userId);
            setChange(change+1);
        } catch (error) {
            console.error("Error upvoting ans:", error);
            // alert(error)

        }
    };

    const handleDownvote = async () => {
        try {
            const userId = user._id;
            await downvoteAnswer(aid, userId);
            setChange(change+1);
        } catch (error) {
            console.error("Error downvoting ans:", error);

        }
    };

    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <div className="answer_author">{ansBy}</div>
                <div className="answer_question_meta">{meta}</div>
                {user && (
                    <div className="votes"> 
                    <i className="fa fas fa-thumbs-up" onClick={handleUpvote}></i> {upvotes.upvotes.length}
                    <i className="fa fas fa-thumbs-down" onClick={handleDownvote}></i> {downvotes.downvotes.length}
                    </div>
                    )}
            </div>
        </div>
    );
};

export default Answer;
