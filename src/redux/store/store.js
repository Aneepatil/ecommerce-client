import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../slice/users/userSlice";
import { productReducer } from "../slice/products/productSlice";
import { categoryReducer } from "../slice/categories/categoriesSlice";
import { brandReducer } from "../slice/brands/brandSlice";
import { colorReducer } from "../slice/colors/colorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
    colors: colorReducer,
  },
});

export default store;
