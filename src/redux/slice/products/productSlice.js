import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

// Initial State
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create Product Action
export const createProductionAction = createAsyncThunk(
  "products/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    console.log(payload);
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;

      //   Make Request
      //   Token - Authentication
      const token = getState()?.user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      //FormData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);

      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("totalQty", totalQty);

      sizes.forEach((size) => {
        formData.append("sizes", size);
      });
      colors.forEach((color) => {
        formData.append("colors", color);
      });

      files.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
// Below are actions
// Fetching Products Action
export const fetchProductsAction = createAsyncThunk(
  "products/list",
  async ({url}, { rejectWithValue, getState, dispatch }) => {
    console.log(url)
    try {
      //   Token - Authentication
      const token = getState()?.user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${url}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetching Single Product Action
export const fetchSingleProductAction = createAsyncThunk(
  "products/details",
  async (productId, { rejectWithValue, getState, dispatch }) => {
    try {
      //   Token - Authentication
      const token = getState()?.user?.userAuth?.userInfo?.data?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/products/${productId}`,config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Creating Product Slice

const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // create
    builder.addCase(createProductionAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createProductionAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(createProductionAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.isAdded = false;
      state.error = action.payload;
    });


    // Fetch Single Product
    builder.addCase(fetchSingleProductAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchSingleProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });

    builder.addCase(fetchSingleProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Reset Success
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
    });
    // Reset Error
    builder.addCase(resetErrorAction.pending, (state, action) => {
      state.error = null;
    });
  },
});

// Generate the reducer

export const productReducer = productSlice.reducer;
