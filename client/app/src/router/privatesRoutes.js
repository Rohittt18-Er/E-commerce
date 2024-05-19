import React from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../components/mainLayout/MainLayout";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectIsAuthenticated } from "../redux/store/slices/authSlice";

const PrivateRoutes = ({admin}) => {
  const isAdminAuth = useSelector(selectIsAdmin)
  const isUserAuthenticated = useSelector(selectIsAuthenticated)
  // Check if the user is authenticated
let auth=false
  if(admin){
    // check wheather admin is authenticated
    let adminAuth=isAdminAuth
    if(adminAuth){
      auth=true
    }
  }else{
        // check wheather user is authenticated
    let userAuth=isUserAuthenticated
    if(userAuth){
      auth=true
    }
  }

  
  if (!auth) {
    // If not authenticated, redirect to the login page
    return <Navigate to={"/login"}/>;
  }

  // If authenticated, render the protected routes
  return <MainLayout admin={admin}  />;
};

export default PrivateRoutes;
