// import React, { useContext, useState } from "react";
// import { login } from "../../context/authContext/apiCalls";
// import { AuthContext } from "../../context/authContext/AuthContext";
import React, { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  return (
    <div className="login">
      <div className="LoginBox">
        <form className="loginForm">
          <div className="loginEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockOpenIcon />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={isFetching}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
