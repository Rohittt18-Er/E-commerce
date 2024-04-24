import React from "react";
import { Navigate } from "react-router-dom";

import MainLayout from "../components/mainLayout/MainLayout";

const PrivateRoutes = ({admin}) => {
  // Check if the user is authenticated
let auth=false
  if(admin){
    // check wheather admin is authenticated
    let adminAuth=true
    if(adminAuth){
      auth=true
    }
  }else{
        // check wheather user is authenticated
    let userAuth=true
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
