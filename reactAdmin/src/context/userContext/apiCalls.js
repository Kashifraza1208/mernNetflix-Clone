import axios from "axios";
import {
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUserStart,
  getUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "./UserAction";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_API_URL,
});

//create user

export const createUser = async (user, dispatch) => {
  dispatch(createUserStart());
  try {
    const res = await axiosInstance.post("users", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

//getting all users
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axiosInstance.get("users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axiosInstance.delete("users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (error) {
    dispatch(deleteUserFailure());
  }
};

//update movies
export const updateUser = async (id, updateuser, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosInstance.put("users/" + id, updateuser, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};
