import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrorAction } from "../globalActions/globalActions";

// Initial State
const initialState = {
  loading: false,
  error: null,
  users: [],
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  },
};

// Register Action

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { email, password, fullname },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      // Making the HTTP method to login
      const { data } = await axios.post(`${baseURL}/users/register`, {
        email,
        password,
        fullname,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Login Action

export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue, getState, dispatch }) => {
    try {
      // Making the HTTP method to login
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Creating User Slice

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    // Builder is a method, help us to trigger loginUserAction

    // Handle actions
    // Login
    // Pending State
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.userAuth.loading = true;
    });
    // Fulfilled State
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    // Rejected State
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });


     // Register
    // Pending State
    builder.addCase(registerUserAction.pending, (state, action) => {
        state.loading = true;
      });
      // Fulfilled State
      builder.addCase(registerUserAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
      // Rejected State
      builder.addCase(registerUserAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });

      builder.addCase(resetErrorAction.pending, (state)=>{
        state.error = null;
      })
  },
});

// Generating raducers

export const userReducer = userSlice.reducer;
