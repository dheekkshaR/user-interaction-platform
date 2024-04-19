import React from "react";
import { useState, useEffect } from "react";
import Header from "./header";
import Main from "./main";
import Login from "./userauth/login";
// import { Provider } from 'react-redux';
// import store from "../redux/store";
import Cookies from 'js-cookie';

export default function fakeStackOverflow() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loginPage, setLoginPageValue] = useState(null);
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");

    useEffect(() => {
        // Check session storage or cookies for user data upon component mount
        console.log("On refresh");
        //const userFromcookie = JSON.parse(sessionStorage.getItem('user')); // Using sessionStorage
        if(Cookies.get('user')){
            const userFromcookie = JSON.parse(Cookies.get('user')); // Using js-cookie
            if (userFromcookie) {
                setLoggedInUser(userFromcookie);
            }
        }

    }, []);


    const setQuesitonPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
    };

    const handleLogin = (user) => {
        const userr = JSON.parse(sessionStorage.getItem('user'));
        console.log(user);
        console.log(userr)
        setLoggedInUser(userr);
        setQuesitonPage();
        setLoginPageValue(false);

    }


    const setLogout= () => {
        Cookies.remove('user');
        setLoggedInUser(null);
        setQuesitonPage();
    }
    const setLoginPage=() => {
        Cookies.remove('user');
        setLoggedInUser(null);

        setLoginPageValue(true);

    }

  

    return (
        <>


            { loginPage ? (
                    <Login handleLogin={handleLogin} />
            ):(

                <>
                        <Header search={search} setQuesitonPage={setQuesitonPage} user={loggedInUser} logout={setLogout} setLoginPage={setLoginPage}/>
                        <Main
                            title={mainTitle}
                            search={search}
                            setQuesitonPage={setQuesitonPage}
                            user={loggedInUser}
                            setLoginPage={setLoginPage}
                        />
                </>


            )}


                    
        </>
    );
}