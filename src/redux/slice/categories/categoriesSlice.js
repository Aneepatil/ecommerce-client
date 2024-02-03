import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { resetErrorAction, resetSuccessAction } from "../globalActions/globalActions";

// Initial State
const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create Category Action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name, image } = payload;

      // Form Data
      const formData = new FormData();

      formData.append("name", name);
      formData.append("image", image);

      //   Token - Authentication
      const token = getState()?.user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //  Images
      const { data } = await axios.post(
        `${baseURL}/categories`,
        formData,
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch Categories Action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Creating Category Slice

const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });

    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.error = action.payload;
    });


    // Reset Error
    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });

    // Reset Success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
  },
});

// Generate the reducer

export const categoryReducer = categorySlice.reducer;
