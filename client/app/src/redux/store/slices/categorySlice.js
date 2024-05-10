import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../thunks/apiThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = {};
    });
  },
});

export const categoryReducer = categorySlice.reducer;
