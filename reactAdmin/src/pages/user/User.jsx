import React, { useContext, useState } from "react";
import "./User.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext/UserContext";
import { updateUser } from "../../context/userContext/apiCalls";

const User = () => {
  const location = useLocation();
  console.log(location);
  const user = location.state?.user;
  const navigate = useNavigate();

  const { dispatch } = useContext(UserContext);

  const [updateuser, setUpdateUser] = useState({
    username: user?.username,
    email: user?.email,
    password: user?.password,
    status: user?.status,
    isAdmin: user?.isAdmin,
  });

const handleChangeInput = (e) => {
  const { name, value } = e.target;
  setUpdateUser((prevUpdateUser) => ({
    ...prevUpdateUser,
    [name]: value,
  }));
};


  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(user._id, updateuser, dispatch);
    navigate("/users");
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userUpdate">
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="updateUserItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={updateuser?.username}
                  className="userUpdateInput"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="updateUserItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  value={updateuser?.email}
                  className="userUpdateInput"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="updateUserItem">
                <label>password</label>
                <input
                  type="text"
                  name="password"
                  value={updateuser?.password}
                  className="userUpdateInput"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="updateUserItem">
                <label>Status</label>
                <select
                  name="status"
                  className="newUserSelect"
                  value={updateuser?.status}
                  onChange={handleChangeInput}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="updateUserItem">
                <label>Is Admin</label>
                <select
                  className="newUserSelect"
                  name="isAdmin"
                  value={updateuser?.isAdmin}
                  onChange={handleChangeInput}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
            </div>
          </form>
          <button className="userUpdateButton" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
