import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer, user, setLoginPage }) => {
    const [question, setQuestion] = useState({});
    const [author, setAuthor]= useState("");
    const [change, setChange]= useState(0);
    const [up, setUp]= useState(0);
    const [down, setDown]= useState(0);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionById(qid);
            setQuestion(res || {});
            setAuthor(res.asked_by.username || "unknown");
            setUp(res.upvotes.length);
            setDown(res.downvotes.length);
        };
        fetchData().catch((e) => console.log(e));
    }, [qid, change]);
  

    return (
        <>
            <AnswerHeader
                ansCount={
                    question && question.answers && question.answers.length
                }
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
                user={user}
                setLoginPage={setLoginPage}
            />
            <QuestionBody
                qid={qid}
                views={question && question.views}
                text={question && question.text}
                askby={question && author}
                meta={question && getMetaData(new Date(question.ask_date_time))}
                upvotes={up}
                downvotes={down}
                user={user}
                change={change}
                setChange={setChange}
            />
            {question &&
                question.answers &&
                question.answers.map((a, idx) => (
                    <Answer
                        key={idx}
                        text={a.text}
                        ansBy={a.ans_by}
                        meta={getMetaData(new Date(a.ans_date_time))}
                        upvotes={a}
                        downvotes={a}
                        user={user}
                        change={change}
                        setChange={setChange}
                        aid={a._id}

                        setLoginPage={setLoginPage}
                    />
                ))}

            <button
                    className="bluebtn ansButton"
                    onClick={() => {
                        if(user!=null){
                            handleNewAnswer();
                        }
                        else{
                            setLoginPage();
                        }
                    }}
                >
                    Answer Question
                </button>
        </>
    );
};

export default AnswerPage;
