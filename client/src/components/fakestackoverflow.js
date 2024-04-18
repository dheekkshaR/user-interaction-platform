import React from "react";
import { useState } from "react";
import Header from "./header";
import Main from "./main";
import Login from "./userauth/login";


export default function fakeStackOverflow() {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [search, setSearch] = useState("");
    const [mainTitle, setMainTitle] = useState("All Questions");

    const setQuesitonPage = (search = "", title = "All Questions") => {
        setSearch(search);
        setMainTitle(title);
    };

    const handleLogin = (user) => {
        setLoggedInUser(user);
        setQuesitonPage();
    };
    const setLogout= () => {
        setLoggedInUser(null);
    }

    return (
        <>
        {loggedInUser ? (
                    <>
                    <Header search={search} setQuesitonPage={setQuesitonPage} user={loggedInUser} logout={setLogout} />
                    <Main
                        title={mainTitle}
                        search={search}
                        setQuesitonPage={setQuesitonPage}
                        user={loggedInUser}
                    />
                    </>
        )
            :
            (
                <Login handleLogin={handleLogin} />
            )}
        </>
    );
}