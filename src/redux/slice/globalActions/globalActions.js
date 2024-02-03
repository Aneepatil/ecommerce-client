import { createAsyncThunk } from "@reduxjs/toolkit";

// Resetting Error Action

export const resetErrorAction = createAsyncThunk("resetError-Action", () => {
  return {};
});

// Resetting Success Action

export const resetSuccessAction = createAsyncThunk("resetSuccess-Action", () => {
    return {};
  });
