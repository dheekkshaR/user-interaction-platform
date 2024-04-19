import "./index.css";

const SideBarNav = ({ selected = "", handleQuestions, handleTags, handleProfile, handleAdmin, user }) => {
    return (
        <div id="sideBarNav" className="sideBarNav">
            <div
                id="menu_question"
                className={`menu_button ${
                    selected === "q" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleQuestions();
                }}
            >
                Questions
            </div>
            <div
                id="menu_tag"
                className={`menu_button ${
                    selected === "t" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleTags();
                }}
            >
                Tags
            </div>
            { user  && (
            <div
                id="menu_profile"
                className={`menu_button ${
                    selected === "p" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleProfile();
                }}
            >
                My profile
            </div>)}
            { user && user.typeOfUser === "admin" && (
            <div
                id="menu_admin"
                className={`menu_button ${
                    selected === "a" ? "menu_selected" : ""
                }`}
                onClick={() => {
                    handleAdmin();
                }}
            >
                Adminstration
            </div>
            )}
        </div>
    );
};

export default SideBarNav;
