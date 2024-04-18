import "./index.css";
import { useState } from "react";


const Header = ({ search, setQuesitonPage , user, logout}) => {
    const [val, setVal] = useState(search);
    return (
        <div id="header" className="header">
            <div></div>
            <div className="title">Fake Stack Overflow</div>
            <input
                id="searchBar"
                placeholder="Search ..."
                type="text"
                value={val}
                onChange={(e) => {
                    setVal(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        setQuesitonPage(e.target.value, "Search Results");
                    }
                }}
            />
            <div>
            <span > {user.username}  </span>
            <span onClick={logout} className="logout-icon" title="LOGOUT" > X </span>
            </div>
        </div>
    );
};

export default Header;
