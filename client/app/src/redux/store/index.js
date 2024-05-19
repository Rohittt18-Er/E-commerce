import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { authReducer } from "./slices/authSlice";
import { categoryReducer } from "./slices/categorySlice";
import { productReducer } from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
  },
});

export {
  upDateProduct,
  fetchSingleProduct,
  addUser,
  fetchUsers,
  removeUser,
  fetchCategory,
  getAttributesValueByKey,
  getAttributesValue,
  createProduct,
  fetchAdminProduct,
  uploadImageProduct,
} from "./thunks/apiThunk";
