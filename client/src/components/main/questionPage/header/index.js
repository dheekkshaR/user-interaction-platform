import "./index.css";
import OrderButton from "./orderButton";

const QuestionHeader = ({
    title_text,
    qcnt,
    setQuestionOrder,
    handleNewQuestion,
    user,
    setLoginPage
}) => {


  
    const options=["Newest", "Active", "Unanswered"];
    if ( user && user.typeOfUser === "moderator") {
        options.push("Flagged");
    }
    return (
        <div>
            <div className="space_between right_padding">
                <div className="bold_title">{title_text}</div>
                <button
                    className="bluebtn"
                    onClick={() => {
                        if(user!=null){
                        handleNewQuestion();
                        }
                        else{
                            setLoginPage();
                        }
                    }}
                >
                    Ask a Question
                </button>
            </div>
            <div className="space_between right_padding">
                <div id="question_count">{qcnt} questions</div>
                <div className="btns">
                    {options.map((m, idx) => (
                        <OrderButton
                            key={idx}
                            message={m}
                            setQuestionOrder={setQuestionOrder}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
};

export default QuestionHeader;
