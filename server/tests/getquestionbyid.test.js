const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Question = require('../models/questions');
const { addTag, getQuestionsByOrder, filterQuestionsBySearch, filterQuestionsByUser, filterQuestionsByFlagged } = require('../utils/question');

// Mocking the models
jest.mock("../models/questions");
jest.mock('../utils/question', () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
  filterQuestionsByUser: jest.fn(),
}));

let server;

const tag1 = {
  _id: '507f191e810c19729de860ea',
  name: 'tag1'
};
const tag2 = {
  _id: '65e9a5c2b26199dbcc3e6dc8',
  name: 'tag2'
};

const ans1 = {
  _id: '65e9b58910afe6e94fc6e6dc',
  text: 'Answer 1 Text',
  ans_by: 'answer1_user',
  
}

const ans2 = {
  _id: '65e9b58910afe6e94fc6e6dd',
  text: 'Answer 2 Text',
  ans_by: 'answer2_user',
  
}

const mockQuestions = [
  {
      _id: '65e9b58910afe6e94fc6e6dc',
      title: 'Question 1 Title',
      text: 'Question 1 Text',
      tags: [tag1],
      answers: [ans1],
      views: 21
  },
  {
      _id: '65e9b5a995b6c7045a30d823',
      title: 'Question 2 Title',
      text: 'Question 2 Text',
      tags: [tag2],
      answers: [ans2],
      views: 99
  }
]

describe('GET /getQuestio/qid status 404', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    await server.close();
    await mongoose.disconnect()
  });

  it('should get the question and its data by its id', async () => {


    const response = await supertest(server).get(`/question/getQuestionsById/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(404);

  });
});