
const supertest = require("supertest")
const User = require("../models/users");
const { default: mongoose } = require("mongoose");


let server;
const mockuser = {
    name: 'abhishek',
    username: 'abhi',
    password: 'abhi',
    age: '24',
    bio: 'hey there'
}
describe('testing User.js server API end-points', () =>{

    beforeAll(async() => {
        server = require("../server");
    })

    afterAll(async() => {
        await server.close();
        await User.deleteOne({ username: 'abhi' })
        await mongoose.disconnect()
    });
    
    test('Adding a new user for the first time status code 200',  async() => {

        const response = await supertest(server).post('/user/addNewUser').send(mockuser)
        expect(response.status).toBe(200);
    });

    test('Adding a new user for multiple times (duplicates) status 500',  async() => {

        const response = await supertest(server).post('/user/addNewUser').send(mockuser)
        expect(response.status).toBe(500);
    });

    test('Logging in as a fake user with wrong credentials (status: 500)',  async() => {

        const invalidCredentials = {
                username: 'sid',
                password: 'sid'
        }

        const response = await supertest(server).post('/user/loginuser').send(invalidCredentials)
        expect(response.status).toBe(500);
    });

    test('Logging in as a fake user with correct credentials (status: 200)',  async() => {

        const invalidCredentials = {
                username: 'abhi',
                password: 'abhi'
        }

        const response = await supertest(server).post('/user/loginuser').send(invalidCredentials)
        expect(response.status).toBe(200);
    });

    test('Logging in as a fake user with internal error credentials (status: 500)',  async() => {

        const invalidCredentials = {
            username: 'abhi',
            password: 'abhi'
    }
        const mockError = new Error("Database error");
        
        jest.spyOn(User, "findOne").mockRejectedValue(mockError);
        const response = await supertest(server).post('/user/loginuser').send(invalidCredentials)
        expect(response.status).toBe(500);
        jest.restoreAllMocks();
    });

    test('Getting all user data (status: 200)',  async() => {
        // await User.deleteMany({});
        const response = await supertest(server).get('/user/getAllUsers')
        expect(response.status).toBe(200);

    });

    // 404 error using empty database. line 80 in users.js

    // test('Getting all user data when there is no data in the database (status: 404)',  async() => {
    //     // await User.deleteMany({});

    //     // Mock the User.find method to return an empty array
    //     jest.spyOn(User, 'find').mockResolvedValue([]);
      
    //     const response = await supertest(server).get('/user/getAllUsers');
    //     expect(response.status).toBe(404);
    //     console.log("resp: ", response.body)
      
    //     jest.restoreAllMocks();

    // });

    test('Should return 500 for internal server error for get all users', async () => {
        const mockError = new Error('Database error');
    
        // Mock the User.find method to throw an error
        jest.spyOn(User, 'find').mockRejectedValue(mockError);
    
        const response = await supertest(server).get('/user/getAllUsers');
    
        expect(response.status).toBe(500);
        jest.restoreAllMocks();
      });

      test('Should return 404 for not found error for editing user type', async () => {
        const usertype = {
            username: 'haris',
            newType: 'regular'
        }
    
        const response = await supertest(server).post('/user/editUserType').send(usertype);
        expect(response.status).toBe(404);
      });

      test('Should return 400 for wrong type in editing user type', async () => {
        const usertype = {
            username: 'abhi',
            newType: 'extreme'
        }
    
        const response = await supertest(server).post('/user/editUserType').send(usertype);
        expect(response.status).toBe(400);
      });

      test('Should return 200 for correct new type in editing user type', async () => {
        const usertype = {
            username: 'abhi',
            newType: 'regular'
        }
    
        const response = await supertest(server).post('/user/editUserType').send(usertype);
        expect(response.status).toBe(200);
      });

      //for line 117-118 for dababase error 500 for editing types
    //   test('Should return 500 for internal server error', async () => {

    

    //     const response = await supertest(server)
    //       .put('/user/editUserType')
    //       .send({ username: 'alice123', newType: 'admin' });
    
    //     expect(response.status).toBe(500);


    
    //   });
    

    

    





}


)