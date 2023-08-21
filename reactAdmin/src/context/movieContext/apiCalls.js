import {
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  updateMovieStart,
  updateMovieFailure,
  updateMovieSuccess,
} from "./MovieAction";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_API_URL,
});
//create movies
//create
export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const res = await axiosInstance.post("movies", movie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};

///getting all movies
export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const res = await axiosInstance.get("movies", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

//delete movies
export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    await axiosInstance.delete("movies/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

//update movies
export const updateMovie = async (id, updatemovie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const res = await axiosInstance.put("movies/" + id, updatemovie, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (err) {
    dispatch(updateMovieFailure());
  }
};
