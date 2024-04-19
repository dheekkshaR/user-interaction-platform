import React from "react";
import { useState } from "react";
import Header from "./header";
import Main from "./main";
import Login from "./userauth/login";

export default function fakeStackOverflow() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loginPage, setLoginPageValue] = useState(null);
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");


    const setQuesitonPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
    };

    const handleLogin = (user) => {
        setLoggedInUser(user);
        setQuesitonPage();
        setLoginPageValue(false);
    };
    const setLogout= () => {
        setLoggedInUser(null);
    }
    const setLoginPage=() => {
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