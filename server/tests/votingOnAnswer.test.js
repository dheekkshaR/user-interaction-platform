// const supertest = require("supertest");
// const { default: mongoose } = require("mongoose");

// const Answer = require("../models/answers");
// const { upvoteAnswer, downvoteAnswer } = require("../controller/answer");

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
