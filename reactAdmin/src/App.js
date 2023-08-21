import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./context/authContext/AuthContext";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar.jsx";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import Login from "./pages/login/Login";
import ListList from "./pages/listList/ListList";
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
      </Routes>
      {user ? (
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/movie/:movieId" element={<Movie />} />
              <Route path="/newMovie" element={<NewMovie />} />
              <Route path="/lists" element={<ListList />} />
              <Route path="/list/:listId" element={<List />} />
              <Route path="/newList" element={<NewList />} />
            </Routes>
          </div>
        </>
      ) : (
        <Navigate replace to="/login" />
      )}
    </BrowserRouter>
  );
}

export default App;
