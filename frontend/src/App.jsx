import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const { user } = useContext(AuthContext);


  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home /> : <Navigate replace to="/register" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate replace to="/" />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate replace to="/" />}
        />

        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/notfound" element={<NotFound />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
