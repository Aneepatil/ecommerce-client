import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Initial State
const initialState = {
  colors: [],
  color: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create Color Action
export const createColorAction = createAsyncThunk(
  "color/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      //   Make Request
      //   Token - Authentication
      const token = getState()?.user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.post(
        `${baseURL}/brands`,
        {
          name,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch Colors Action
export const fetchColorsAction = createAsyncThunk(
  "color/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/colors`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Creating color Slice

const colorSlice = createSlice({
  name: "colors",
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createColorAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createColorAction.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createColorAction.rejected, (state, action) => {
      state.loading = false;
      state.color = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchColorsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchColorsAction.rejected, (state, action) => {
      state.loading = false;
      state.colors = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// Generate the reducer

export const colorReducer = colorSlice.reducer;
