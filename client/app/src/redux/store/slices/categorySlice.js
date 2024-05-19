import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  fetchCategory,
  getAttributesValue,
  getAttributesValueByKey,
} from "../thunks/apiThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    categoryData: {},
    attributesDataBySingleKey: {},
    attributeData: {},
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.categoryData = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.categoryData = {};
    });

    builder.addCase(getAttributesValueByKey.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAttributesValueByKey.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.attributesDataBySingleKey = action.payload;
    });
    builder.addCase(getAttributesValueByKey.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.attributesDataBySingleKey = {};
    });

    builder.addCase(getAttributesValue.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAttributesValue.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.attributeData = action.payload;
    });
    builder.addCase(getAttributesValue.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.attributeData = {};
    });

    builder.addCase(addCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.categoryData = {};
    });
  },
});

export const categoryReducer = categorySlice.reducer;
