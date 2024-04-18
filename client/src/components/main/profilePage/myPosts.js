import "./profilePage.css"
import Question from "../questionPage/question";
import { getQuestionsByUser } from "../../../services/questionService";
import { useEffect, useState } from "react";

const MyQuestionPage = ({
    clickTag,
    handleAnswer,
    user
}) => {
    console.log(user);
    const author=user._id;
    const title_text = "My Questions";
    const [qlist, setQlist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await getQuestionsByUser(author); // Call getQuestionsByUser with user ID
                setQlist(res || []);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [user]); // Trigger useEffect when user ID changes

    return (
        <>
        <h2 className="bold_title">
            My Questions
        </h2>
            <div id="question_list" className="question_list">
                {qlist.map((q, idx) => (
                    <Question
                        q={q}
                        key={idx}
                        clickTag={clickTag}
                        handleAnswer={handleAnswer}
                        user={user}
                    />
                ))}
            </div>
            {title_text === "My Questions" && !qlist.length && (
                <div className="bold_title right_padding">
                    No Questions posted
                </div>
            )}
        </>
    );
};

export default MyQuestionPage;
