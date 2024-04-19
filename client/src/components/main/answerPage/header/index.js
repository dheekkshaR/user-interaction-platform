import "./index.css";

// Header for the Answer page
const AnswerHeader = ({ ansCount, title, handleNewQuestion, user, setLoginPage }) => {
    return (
        <div id="answersHeader" className="space_between right_padding">
            <div className="bold_title">{ansCount} answers</div>
            <div className="bold_title answer_question_title">{title}</div>
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
    );
};

export default AnswerHeader;
