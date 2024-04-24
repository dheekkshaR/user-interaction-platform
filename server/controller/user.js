const express = require("express");
const User = require("../models/users");

const router = express.Router();

// Register a new user
const addNewUser = async (req, res) => {
    try {
        const sentUser = req.body;
        console.log("user: ", sentUser)
        // Assuming "regular" as the default user type for registration
        const newUser = await User.create({
            name:sentUser.name,
            username:sentUser.username,
            password:sentUser.password,
            age:sentUser.age,
            bio:sentUser.bio,
            typeOfUser: "regular", // Set user type as "regular"
        });

        res.status(200).json(newUser); // Return the newly created user
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// // Edit user details and update user type
// const editUser = async (req, res) => {
//     try {
//         const { username, typeOfUser } = req.body;
        
//         // Find the user by username
//         const user = await User.findOne({ username });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Update user type if the provided type is valid
//         if (typeOfUser === "regular" || typeOfUser === "moderator" || typeOfUser === "admin") {
//             user.typeOfUser = typeOfUser;
//             await user.save(); // Save the updated user

//             res.status(200).json(user); // Return the updated user
//         } else {
//             res.status(400).json({ message: "Invalid user type" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user by username and password
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(500).json({ message: "Invalid credentials" });
        }

        res.status(200).json(user); // Return the user if login is successful
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Find all users and project only the username and typeOfUser fields
        const users = await User.find({}, { username: 1, typeOfUser: 1 });

        if (!users) {
            return res.status(404).json({ message: "No users found" });
        }

        // Convert the users array into a dictionary with username as key and typeOfUser as value
        const usersDict = {};
        users.forEach((user) => {
            usersDict[user.username] = user.typeOfUser;
        });

        res.status(200).json(usersDict); // Return the usernames and typeOfUser as a dictionary
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const editUserType = async (req, res) => {
    try {
        const { username, newType } = req.body;
        
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user type if the provided newType is valid
        if (newType === "regular" || newType === "moderator" || newType === "admin") {
            user.typeOfUser = newType;
            await user.save(); // Save the updated user

            res.status(200).json(user); // Return the updated user
        } else {
            res.status(400).json({ message: "Invalid user type" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

    
};


router.post("/loginUser", loginUser); 
// router.put("/editUser", editUser);
router.post("/addNewUser", addNewUser);
router.get("/getAllUsers", getAllUsers);
router.post("/editUserType", editUserType); 

module.exports = router;
