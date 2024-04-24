const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Answer = require("../models/answers");
const Question = require("../models/questions");
const { upvoteAnswer, downvoteAnswer } = require("../controller/answer");

let server;
describe("Testing upvoting and downvoting answers", ()=>{

    beforeAll(() => {
        server = require("../server");
      })
    
      afterAll(async() => {
        server.close();
        await mongoose.disconnect()
      });

    test("POST /answer/upvoteAnswer 404", async() =>{

        const mockReqBody = {
            aid: new mongoose.Types.ObjectId('5f9f1b9b9b9b9b9b9b9b9b9b'),
            userId: "testUserId",
          };
      
          Answer.findById = jest.fn().mockResolvedValueOnce(null);
          const response = await supertest(server).post('/answer/upvoteAnswer').send(mockReqBody);
      
          expect(response.status).toBe(404);
          jest.restoreAllMocks();
   
    });

    // test("POST /answer/upvoteAnswer 500", async() =>{

    //     const mockReqBody = {
    //         aid: "sdfs",
    //         userId: "testUserId",
    //       };

    //     Answer.findById.mockRejectedValue(new Error('Internal server error'));
    //     const response = await supertest(server).post('/answer/upvoteAnswer').send(mockReqBody);
      
    //       expect(response.status).toBe(500);

    // });
    
    // test('Should remove downvote and upvote the answer 200', async () => {

    //       const testAnswer = new Answer({
    //         text: 'Test answer',
    //         ans_by: new mongoose.Types.ObjectId(),
    //         ans_date_time: new Date(),
    //         downvotes: [],
    //         upvotes: []
    //       });
    //       await testAnswer.save();

    //       const mockReqBody = {
    //         aid: testAnswer._id,
    //         userId: new mongoose.Types.ObjectId(),
    //       };

    
    //     const response = await supertest(server).post('/answer/upvoteAnswer').send(mockReqBody);
    
    //     expect(response.status).toBe(200);

    //   });


    //-------------------------------------------------------------------------------------------------

    test("POST /answer/downvoteanswer", async() =>{

        const mockReqBody = {
            aid: new mongoose.Types.ObjectId(),
            userId: "testUser",
          };
      
          Answer.findById = jest.fn().mockResolvedValueOnce(null);
          const response = await supertest(server).post('/answer/downVoteAnswer').send(mockReqBody);
      
          expect(response.status).toBe(404);
   
    });



    // test("POST /answer/downvoteanswer catch block (status: 500)", async() =>{

    //     const mockReqBody = {
    //         aid: "sdfs",
    //         userId: "testUserId",
    //       };
      
    //       Answer.findById.mockRejectedValue(new Error('Internal server error'));
    //       const response = await supertest(server).post('/answer/downVoteAnswer').send(mockReqBody);
      
    //       expect(response.status).toBe(500);

    // });





})









// // Mock the Answer model
// jest.mock("../models/answers");

// let server;
// describe("POST /upvoteAnswer", () => {
//   beforeEach(() => {
//     server = require("../server");
//   });

//   afterEach(async () => {
//     server.close();
//     await mongoose.disconnect();
//   });

//   it("should upvote an answer successfully", async () => {
//     // Mocking the request body
//     const mockReqBody = {
//       aid: "dummyAnswerId",
//       userId: "dummyUserId",
//     };

//     // Mock the findById method of the Answer model
//     const mockAnswer = {
//       _id: "dummyAnswerId",
//       upvotes: ["dummyUserId"], // Simulating an answer that already has an upvote from the user
//     };
//     Answer.findById.mockResolvedValueOnce(mockAnswer);

//     // Making the request
//     const response = await supertest(server)
//       .post("/answer/upvoteAnswer")
//       .send(mockReqBody);

//     // Asserting the response
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: "Upvote removed successfully" });
//   });
// });

// describe("POST /downvoteAnswer", () => {
//   beforeEach(() => {
//     server = require("../server");
//   });

//   afterEach(async () => {
//     server.close();
//     await mongoose.disconnect();
//   });

//   it("should downvote an answer successfully", async () => {
//     // Mocking the request body
//     const mockReqBody = {
//       aid: "dummyAnswerId",
//       userId: "dummyUserId",
//     };

//     // Mock the findById method of the Answer model
//     const mockAnswer = {
//       _id: "dummyAnswerId",
//       downvotes: [], // Simulating an answer that does not have any downvotes
//     };
//     Answer.findById.mockResolvedValueOnce(mockAnswer);

//     // Making the request
//     const response = await supertest(server)
//       .post("/answer/downvoteAnswer")
//       .send(mockReqBody);

//     // Asserting the response
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: "Answer downvoted successfully" });
//   });
// });


