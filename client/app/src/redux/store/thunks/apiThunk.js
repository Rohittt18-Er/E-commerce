import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../auth/api";

const fetchCategory = createAsyncThunk("category/fetch", async () => {
  const response = await api.get("/category");
  return response.data;
});

const getAttributesValue = createAsyncThunk(
  "category/getAttribute",
  async () => {
    const response = await api.get("/category/attributesValue");
    return response.data;
  }
);

const getAttributesValueByKey = createAsyncThunk(
  "category/getAttributesValueByKey",
  async (postData, thunkAPI) => {
    try {
      const response = await api.post("/category/findValueByKey", postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const createProduct = createAsyncThunk(
  "product/createProduct",
  async (postData, thunkAPI) => {
    try {
      const response = await api.post("/product/createProduct", postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const uploadImageProduct = createAsyncThunk(
  "product/imageUpload",
  async (postData) => {
    const response = await api.post(
      `/product/imageUpload/${postData.get("id")}`,
      postData
    );
    return response.data;
  }
);

const fetchAdminProduct = createAsyncThunk("product/fetch", async () => {
  const response = await api.get("/product");
  return response.data;
});

const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  const response = await api.delete(`/product/admin/${id}`);
  return response.data;
});

const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingle",
  async (id) => {
    const response = await api.get(`/product/get-one/${id}`);
    return response.data;
  }
);

const upDateProduct = createAsyncThunk("product/update", async (postData) => {
  console.log("postData".postData);
  const response = await api.post(
    `/product/updateProduct/${postData.id}`,
    postData
  );
  return response.data;
});

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await api.get("/user");

  return response.data;
});

const removeUser = createAsyncThunk("user/delete", async (postData) => {
  const response = await api.delete(`/user/deleteAdminUser/${postData}`);
  return response.data;
});

const addCategory = createAsyncThunk("category/add", async (data) => {
  const response = await api.post("/category", data);

  return response.data;
});

const addUser = createAsyncThunk("users/add", async () => {
  const response = await axios.post("http://localhost:3005/users", {
    name: "test",
  });

  return response.data;
});

export {
  addCategory,
  upDateProduct,
  fetchSingleProduct,
  deleteProduct,
  createProduct,
  addUser,
  fetchUsers,
  removeUser,
  fetchCategory,
  getAttributesValueByKey,
  getAttributesValue,
  uploadImageProduct,
  fetchAdminProduct,
};
