import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Initial State
const initialState = {
  brands: [],
  brand: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create Brand Action
export const createBrandAction = createAsyncThunk(
  "brand/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;

      //   Make Request
      //   Token - Authentication
      const token = getState()?.user?.userAuth?.userInfo?.data?.token;
      console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //  Images
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

// Fetch Brands Action
export const fetchBrandsAction = createAsyncThunk(
  "brand/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/brands`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Creating Brand Slice

const brandSlice = createSlice({
  name: "brands",
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createBrandAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createBrandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createBrandAction.rejected, (state, action) => {
      state.loading = false;
      state.brand = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchBrandsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchBrandsAction.rejected, (state, action) => {
      state.loading = false;
      state.brands = null;
      state.isAdded = false;
      state.error = action.payload;
    });
  },
});

// Generate the reducer

export const brandReducer = brandSlice.reducer;
