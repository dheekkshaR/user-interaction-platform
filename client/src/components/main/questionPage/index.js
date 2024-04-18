import "./index.css";
import QuestionHeader from "./header";
import Question from "./question";

import { getQuestionsByFilter } from "../../../services/questionService";
import { useEffect, useState } from "react";

const QuestionPage = ({
    title_text = "All Questions",
    order,
    search,
    setQuestionOrder,
    clickTag,
    handleAnswer,
    handleNewQuestion,
    user
}) => {
    const [qlist, setQlist] = useState([]);
    const [change, setChange] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            let res = await getQuestionsByFilter(order, search);
            setQlist(res || []);
        };

        fetchData().catch((e) => console.log(e));
    }, [order, search, change]);
    return (
        <>
            <QuestionHeader
                title_text={title_text}
                qcnt={qlist.length}
                setQuestionOrder={setQuestionOrder}
                handleNewQuestion={handleNewQuestion}
                user={user}
            />
            <div id="question_list" className="question_list">
                {qlist.map((q, idx) => (
                    <Question
                        q={q}
                        key={idx}
                        clickTag={clickTag}
                        handleAnswer={handleAnswer}
                        user={user}
                        change={change}
                        setChange={setChange}
                    />
                ))}
            </div>
            {title_text === "Search Results" && !qlist.length && (
                <div className="bold_title right_padding">
                    No Questions Found
                </div>
            )}
        </>
    );
};

export default QuestionPage;
