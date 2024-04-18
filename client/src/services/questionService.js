import { REACT_APP_API_URL, api } from "./config";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;

// To get Questions by Filter
const getQuestionsByFilter = async (order = "newest", search = "") => {
    const res = await api.get(
        `${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`
    );

    return res.data;
};

// To get Questions by Filter
const getQuestionsByUser = async ( author) => {
    const res = await api.get(
        `${QUESTION_API_URL}/getQuestionsByUser/${author}`
    );
    return res.data;
};


// To get Questions by id
const getQuestionById = async (qid) => {
    const res = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`);

    return res.data;
};

// To add Questions
const addQuestion = async (q) => {
    const res = await api.post(`${QUESTION_API_URL}/addQuestion`, q);

    return res.data;
};

const upvoteQuestion = async (qid, userId) => {
    const res = await api.post(`${QUESTION_API_URL}/upvoteQuestion`, { qid,  userId,});
    return res.data;
}

const downvoteQuestion = async (qid, userId) => {
    const res = await api.post(`${QUESTION_API_URL}/downvoteQuestion`, { qid,  userId,});
    return res.data;
}

export { getQuestionsByFilter, getQuestionsByUser, getQuestionById, addQuestion, upvoteQuestion, downvoteQuestion};
