import React, { useEffect, useState } from "react";
import "./WidgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios";
import Modal from "../ModalOverlay/Modal"; // Import the Modal component
// import { useLocation } from "react-router-dom";

const WidgetSm = () => {
  const [newUsers, setNewUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Initialize selectedUser as null
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_API_URL,
  });
  //this is used for fetching the new user

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axiosInstance.get("users?new=true", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        setNewUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNewUsers();
  }, []);

  // Function to open the modal and show user details
  const openModal = (user) => {
    setSelectedUser(user); // Set the selected user to open the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedUser(null); // Close the modal by resetting selectedUser to null
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>

      <Modal isOpen={!!selectedUser} onClose={closeModal}>
        {selectedUser && (
          <div className="modaltop">
            <h2>User Details</h2>
            <p className="modaluser">Username: {selectedUser.username}</p>
            <p className="modaluser">Email: {selectedUser.email}</p>
            <p className="modaluser">
              Is Admin: {selectedUser.isAdmin ? "Yes" : "No"}
            </p>
            <p className="modaluser">
              {" "}
              Status: {selectedUser.status ? "Active" : "Offline"}
            </p>
          </div>
        )}
      </Modal>

      <ul className="widgetSmList">
        {newUsers.map((usernew) => (
          <li key={usernew._id} className="widgetSmListItem">
            <img
              src={
                usernew.profilePic ||
                "https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/08/netflix-icon.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{usernew.username}</span>
            </div>
            <button
              className="widgetSmButton"
              onClick={() => openModal(usernew)}
            >
              <Visibility />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
