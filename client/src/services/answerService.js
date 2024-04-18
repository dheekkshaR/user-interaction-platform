import { REACT_APP_API_URL, api } from "./config";

const ANSWER_API_URL = `${REACT_APP_API_URL}/answer`;

// To add answer
const addAnswer = async (qid, ans) => {
    const data = { qid: qid, ans: ans };
    const res = await api.post(`${ANSWER_API_URL}/addAnswer`, data);

    return res.data;
};

// To upvote an answer
const upvoteAnswer = async (aid, userId) => {
    const data = { aid: aid, userId: userId };
    const res = await api.post(`${ANSWER_API_URL}/upvoteAnswer`, data);

    return res.data;
};

// To downvote an answer
const downvoteAnswer = async (aid, userId) => {
    const data = { aid: aid, userId: userId };
    const res = await api.post(`${ANSWER_API_URL}/downvoteAnswer`, data);

    return res.data;
};


export { addAnswer, upvoteAnswer, downvoteAnswer };
