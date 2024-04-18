import { getMetaData } from "../../../../tool";
import "./index.css";
import { deleteQuestion, moderatorAccept, reportQuestion } from "../../../../services/questionService";
const Question = ({ q, clickTag, handleAnswer, user,  change, setChange }) => {
    const handleDeleteQuestion = async (qid) => {
        try {
            await deleteQuestion(qid);
            setChange(change+1);
          
            alert("Deleted successfully");
            // Optionally, you can update the state or handle any other logic after successful deletion
        } catch (error) {
            console.error("Error deleting question:", error);
            // Handle error if deletion fails
        }
    };

    const handleApproveQuestion = async (qid) => {
        try {
            await moderatorAccept(qid);
            setChange(change+1);
          
            alert("Approved successfully");
            // Optionally, you can update the state or handle any other logic after successful deletion
        } catch (error) {
            console.error("Error approving question:", error);
            // Handle error if deletion fails
        }
    };

    const handleReportQuestion = async (qid) => {
        try {
            await reportQuestion(qid);
            setChange(change+1);
          
            alert("Repported successfully");
            // Optionally, you can update the state or handle any other logic after successful deletion
        } catch (error) {
            console.error("Error reporting question:", error);
            // Handle error if deletion fails
        }
    };

    const canDeleteQuestion = () => {
        // Check if the current user is the author of the question or is a moderator and the question is flagged
        return (user && q.asked_by._id === user._id) || (user && user.typeOfUser === "moderator" && q.flagged > 0);
    };
    const canApproveQuestion = () => {
        // Check if the current user is the author of the question or is a moderator and the question is flagged
        return (user && user.typeOfUser === "moderator" && q.flagged > 0);
    };



    return (
        <div
            className="question right_padding"
            onClick={() => {
                handleAnswer(q._id);
            }}
        >
            <div className="postStats">
                <div>{q.answers.length || 0} answers</div>
                <div>{q.views} views</div>
                <div className="question_actions"> 
                    {canDeleteQuestion() && (
                    <i
                        className="fa fa-trash deleteIcon"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating to the parent div
                            handleDeleteQuestion(q._id);
                        }}
                    ></i>
                    )}

                    {canApproveQuestion() && (
                    <i
                        className="fa fa-check"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent click from propagating to the parent div
                            handleApproveQuestion(q._id);
                        }}
                    ></i>
                    )}
                    <i className="fa fa-flag" 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click from propagating to the parent div
                        handleReportQuestion(q._id);
                    }}></i>
                </div>
            </div>
            <div className="question_mid">
                <div className="postTitle">{q.title}</div>
                <div className="question_tags">
                    {q.tags.map((tag, idx) => {
                        return (
                            <button
                                key={idx}
                                className="question_tag_button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clickTag(tag.name);
                                }}
                            >
                                {tag.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="lastActivity">
                <div className="question_author">{q.asked_by.username}</div>
                <div>&nbsp;</div>
                <div className="question_meta">
                    asked {getMetaData(new Date(q.ask_date_time))}
                </div>
                
                



            </div>
        </div>
    );
};

export default Question;
