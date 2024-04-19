// Login.js
import React, { useState } from "react";
import { login, register } from "../../services/userService";
import Input from "../main/baseComponents/input";
import Form from "../main/baseComponents/form";
import Cookies from 'js-cookie'; // Import js-cookie

const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [bio, setBio] = useState("");



    const handleLoginClick = async () => {
        try {
            const user = await login(username, password);

            if (!user) {
                throw user;
            } else {
                // Set session storage or cookie upon successful login
                sessionStorage.setItem('user', JSON.stringify(user)); // Using sessionStorage
                Cookies.set('user', JSON.stringify(user)); // Using js-cookie
                handleLogin(user); // Handle successful login
                
            }

        } catch (error) {
            alert("Invalid credentials please try again!");
            console.log(error);
            
        }
    }

    const handleRegisterClick = () => {
        setShowRegisterForm(true);
    };

    const handleRegister = async () => {
        try {
            await register(name, username, password, age, bio);
            setShowRegisterForm(false); // Hide the register form after successful registration
            alert("User registered successfully!");
        } catch (error) {
            alert("Error registering user. Please try again.");
            console.log(error);
        }
    };

    return (
        <div className="login-container ">
            {showRegisterForm ? (
                <>
                <h2>Register </h2>
                <Form>
                    <Input
                        title="Name"
                        id="name"
                        val={name}
                        setState={setName}
                    />
                    <Input
                        title="Username"
                        id="username"
                        val={username}
                        setState={setUsername}
                    />
                    <Input
                        title="Password"
                        id="password"
                        val={password}
                        setState={setPassword}
                        type="password"
                    />
                    <Input
                        title="Age"
                        id="age"
                        val={age}
                        setState={setAge}
                        type="number"
                    />
                    <Input
                        title="Bio"
                        id="bio"
                        val={bio}
                        setState={setBio}
                        type="textarea"
                    />
                    <button className="form_postBtn" onClick={handleRegister}>Register</button>
                </Form>
                
                </>
            ) : (
                <>
            <h2>Login</h2>
            <Form>
            <Input
                title="Username"
                id="username"
                val={username}
                setState={setUsername}
            />
            <Input
                title="Password"
                id="password"
                val={password}
                setState={setPassword}
                type="password"
            />
            <button className="form_postBtn " onClick={handleLoginClick}>Login</button> <br/> <br/>
            <button className="form_postBtn" onClick={handleRegisterClick}>Register New User</button>
            </Form>
            
            </>
            )}
            

          
        </div>
    );
};

export default Login;
