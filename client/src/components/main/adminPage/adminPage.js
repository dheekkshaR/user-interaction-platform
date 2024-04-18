import React, { useState, useEffect } from "react";
import { getAllUsers, editUserType } from "../../../services/userService";
import Form from "../baseComponents/form";
import "./index.css"
const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedPrivilege, setSelectedPrivilege] = useState("");
    const [change, setChange] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                console.log(userList)
                setUsers(userList || []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [change]);

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handlePrivilegeChange = (event) => {
        setSelectedPrivilege(event.target.value);
    };

    const handlePrivilegeUpdate = async () => {
        try {
            // Call the editUserType service function with selectedUser and selectedPrivilege
            await editUserType(selectedUser, selectedPrivilege);
            
            // Optionally, you can handle any logic after successful update
            alert(selectedUser+ " - User privilege updated successfully");
            setChange(change+1);
            
        } catch (error) {
            console.error("Error updating user privilege:", error);
            // Handle error if the update fails
        }
    };

    return (
        <div >
            <h1 className="bold_title">Admin Page</h1>
            <Form>
            <div className="space_between">
                <label htmlFor="userSelect">Select User:</label>
                <select id="userSelect" onChange={handleUserChange}>
                    <option value="">Select User</option>
                    {Object.keys(users).map((username) => (
                        <option key={username} value={username}>
                        {username }: {users[username]}
                        </option>
                    ))}
                </select>
            </div>
            <div className="space_between" >
                <label htmlFor="privilegeSelect">Select Privilege:</label>
                <select id="privilegeSelect" onChange={handlePrivilegeChange}>
                    <option value="">Select Privilege</option>
                    <option value="regular">Regular</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <button className="form_postBtn" onClick={handlePrivilegeUpdate}>Update Privilege</button>
            </Form>
        </div>
    );
};

export default AdminPage;
