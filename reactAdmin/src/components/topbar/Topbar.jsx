import React from "react";
import "./Topbar.css";
import { Language, NotificationsNone, Settings } from "@material-ui/icons";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">RazaAdmin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img
            src="https://cdn.siasat.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-04-15-at-10.26.17-AM-3.jpeg"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
