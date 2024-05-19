import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, fetchAdminProduct, fetchSingleProduct, upDateProduct, uploadImageProduct } from "../thunks/apiThunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    totalProduct:[],
   productData:{},
   imageData:{},
    error: null,
    deleteProduct:{},
    singleProductData:{}
  },
  reducers: {
    removeSingleProductData: (state, action) => {
     state.singleProductData={}
    },
  },
  extraReducers(builder) {


    builder.addCase(createProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.productData = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.productData = {};
    });

    builder.addCase(uploadImageProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(uploadImageProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.imageData = action.payload;
    });
    builder.addCase(uploadImageProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.imageData = {};
    });

    builder.addCase(fetchAdminProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAdminProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.totalProduct = action.payload.data.product;
    });
    builder.addCase(fetchAdminProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
   
    });

    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.deleteProduct = action.payload;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });


    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      state.singleProductData = null;
      state.isLoading = true;
      
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.singleProductData = action.payload
    });
    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.singleProductData = {};
    });

    builder.addCase(upDateProduct.pending, (state, action) => {
      state.singleProductData = null;
      state.isLoading = true;
      
    });
    builder.addCase(upDateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
 
    });
    builder.addCase(upDateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.singleProductData = {};
    });



  },
});

export const { removeSingleProductData } = productSlice.actions;
export const productReducer = productSlice.reducer;
