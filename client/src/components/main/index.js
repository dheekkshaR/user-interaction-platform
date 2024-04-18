import "./index.css";
import { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";
import AnswerPage from "./answerPage";
import NewQuestion from "./newQuestion";
import NewAnswer from "./newAnswer";
import Profile from "./profilePage/profilePage";

const Main = ({ search = "", title, setQuesitonPage, user }) => {
    const [page, setPage] = useState("home");
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");
    let selected = "";
    let content = null;

    const handleQuestions = () => {
        setQuesitonPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };

    const clickTag = (tname) => {
        setQuesitonPage("[" + tname + "]", tname);
        setPage("home");
    };

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };

    const viewProfile =() => {
        setPage("profilePage");
    }

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
                user={user}
            />
        );
    };

    switch (page) {
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search, user);
            break;
        }
        case "tag": {
            selected = "t";
            content = (
                <TagPage
                    clickTag={clickTag}
                    handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "answer": {
            selected = "";
            content = (
                <AnswerPage
                    qid={qid}
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    user={user}
                />
            );
            break;
        }
        case "newQuestion": {
            selected = "";
            content = <NewQuestion handleQuestions={handleQuestions} user={user}/>;
            break;
        }
        case "newAnswer": {
            selected = "";
            content = <NewAnswer qid={qid} handleAnswer={handleAnswer} user={user} />;
            break;
        }
        case "profilePage": {
            selected = "p";
            content = <Profile user={user}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                 />;
            break;
        }
        default:
            selected = "m";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
                handleProfile={viewProfile}
            />
            <div id="right_main" className="right_main">
                {content}
            </div>
        </div>
    );
};

export default Main;
