import React, { useContext, useState } from "react";
import "./NewUser.css";
import { UserContext } from "../../context/userContext/UserContext";
import { createUser } from "../../context/userContext/apiCalls";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    status: "Active",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user, dispatch);
    navigate("/users");
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="kashifraza1208"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            placeholder="kashif@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <div className="newUserItem">
          <label>Status</label>
          <select
            className="newUserSelect"
            name="status"
            value={user.status}
            onChange={handleChange}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="newUserItem">
          <label>Is Admin</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            value={user.isAdmin}
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
      </form>
      <button className="newUserButton" onClick={handleSubmit}>
        Create
      </button>
    </div>
  );
};

export default NewUser;
