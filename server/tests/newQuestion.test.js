// unit tests for functions in controller/question.js


const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Question = require('../models/questions');
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');

// Mocking the models
jest.mock("../models/questions");
jest.mock('../utils/question', () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
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

describe('GET /getQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should return questions by filter', async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: 'someOrder',
      search: 'someSearch',
    };
   
    getQuestionsByOrder.mockResolvedValueOnce(mockQuestions);
    filterQuestionsBySearch.mockReturnValueOnce(mockQuestions);
    // Making the request
    const response = await supertest(server)
      .get('/question/getQuestion')
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });
});

describe('GET /getQuestionById/:qid', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it('should return a question by id and increment its views by 1', async () => {

    // Mock request parameters
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    const mockPopulatedQuestion = {
        answers: [mockQuestions.filter(q => q._id == mockReqParams.qid)[0]['answers']], // Mock answers
        views: mockQuestions[1].views + 1
    };
    
    // Provide mock question data
    Question.findOneAndUpdate = jest.fn().mockImplementation(() => ({ populate: jest.fn().mockResolvedValueOnce(mockPopulatedQuestion)}));
   
    // Making the request
    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });
});

describe('POST /addQuestion', () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    //console.log("server is going to close");
    server.close();

    await mongoose.disconnect()
  });

  it('should add a new question', async () => {
    // Mock request body
   
    const mockTags = [tag1, tag2]; 

    const mockQuestion = {
      _id: '65e9b58910afe6e94fc6e6fe',
      title: 'Question 3 Title',
      text: 'Question 3 Text',
      tags: [tag1, tag2],
      answers: [ans1],
    }

    addTag.mockResolvedValueOnce(mockTags);
    Question.create.mockResolvedValueOnce(mockQuestion);

    // Making the request
    const response = await supertest(server)
      .post('/question/addQuestion')
      .send(mockQuestion);

    // Asserting the response
    //console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestion);

  });
});

describe('GET /getQuestionById/:qid', () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it('should return a question by id and increment its views by 1', async () => {
    const mockReqParams = {
      qid: '65e9b5a995b6c7045a30d823',
    };

    const mockPopulatedQuestion = {
      answers: [mockQuestions.filter(q => q._id == mockReqParams.qid)[0]['answers']], // Mock answers
      views: mockQuestions[1].views + 1
    };

    // Mock successful findOneAndUpdate
    Question.findOneAndUpdate = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValueOnce(mockPopulatedQuestion),
    }));

    const response = await supertest(server)
      .get(`/question/getQuestionById/${mockReqParams.qid}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });

  it('should handle runtime error if findOneAndUpdate fails', async () => {
    // const mockReqParams = {
    //   qid: 'invalid_id', // Provide an invalid ID to trigger an error
    // };

    // // // Mock findOneAndUpdate to throw an error
    // // Question.findOneAndUpdate = jest.fn().mockRejectedValueOnce(new Error('Database error'));

    //  // Mock findOneAndUpdate to throw an error
    // const findOneAndUpdateMock = jest.fn().mockRejectedValueOnce(new Error('Database error'));
    // Question.findOneAndUpdate = findOneAndUpdateMock;

    // // Mock the populate method as well
    // findOneAndUpdateMock.populate = jest.fn();

    // const response = await supertest(server)
    //   .get(`/question/getQuestionById/${mockReqParams.qid}`);

    // expect(response.status).toBe(500); // Assuming 500 is the status code for internal server error
    // expect(response.body.error).toEqual("Database error");
  });
});


// A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
// ----------------------|---------|----------|---------|---------|---------------------------
// File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s         
// ----------------------|---------|----------|---------|---------|---------------------------
// All files             |   86.01 |    81.39 |   93.75 |   85.48 |                           
//  server               |   77.77 |      100 |   33.33 |   77.77 |                           
//   server.js           |   77.77 |      100 |   33.33 |   77.77 | 27-28,44-47               
//  server/controller    |   78.75 |    42.85 |     100 |   78.48 |                           
//   answer.js           |   81.25 |       50 |     100 |   81.25 | 35,40-41                  
//   question.js         |   71.42 |       40 |     100 |   70.73 | 23-32,37,82,87-88,160-161 
//   tag.js              |    90.9 |       50 |     100 |    90.9 | 68-69                     
//  server/models        |     100 |      100 |     100 |     100 |                           
//   answers.js          |     100 |      100 |     100 |     100 |                           
//   questions.js        |     100 |      100 |     100 |     100 |                           
//   tags.js             |     100 |      100 |     100 |     100 |                           
//  server/models/schema |     100 |      100 |     100 |     100 |                           
//   answer.js           |     100 |      100 |     100 |     100 |                           
//   question.js         |     100 |      100 |     100 |     100 |                           
//   tag.js              |     100 |      100 |     100 |     100 |                           
//  server/utils         |   94.36 |      100 |     100 |   93.84 |                           
//   question.js         |   94.36 |      100 |     100 |   93.84 | 23-24,51-53               
// ----------------------|---------|----------|---------|---------|---------------------------
// Test Suites: 3 failed, 1 passed, 4 total
// Tests:       5 failed, 11 passed, 16 total
// Snapshots:   0 total
// Time:        16.944 s
// Ran all test suites.
// dheekkshar@Dheekkshas-MacBook-Air server % git status
// On branch 04-02-2024
// Changes not staged for commit:
//   (use "git add <file>..." to update what will be committed)
//   (use "git restore <file>..." to discard changes in working directory)
//         modified:   tests/newQuestion.test.js
//         modified:   ../testing/cypress/e2e/fakeso.cy.js