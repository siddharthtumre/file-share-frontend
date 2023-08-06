import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // login functionality
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = "";
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      // logout functionality
      state.user = null;
      state.isAuthenticated = false;
      state.error = "";
    },
  },
});

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "/login",
        credentials
      );
      const user = response.data.user;
      dispatch(loginSuccess(user));
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch(loginFailure(error.message));
      } else {
        dispatch(loginFailure(error.response.data.error));
      }
    }
  };
};

export const register = (credentials) => {
  const { email, password } = credentials;
  return async (dispatch) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_ENDPOINT + "/register",
        credentials
      );
      dispatch(login({ email, password }));
    } catch (error) {
      if (error.message === "Network Error") {
        dispatch(loginFailure(error.message));
      } else {
        dispatch(loginFailure(error.response.data.error));
      }
    }
  };
};

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
