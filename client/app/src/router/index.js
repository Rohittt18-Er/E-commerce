import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
// import CommonSnackbar from "../components/Common-Snackbar/CommonSnackbar";
import ErrorPage from "../pages/404/404";
import routeConfig from "./routesConfig";
import PrivateRoutes from "./privatesRoutes";
import MainLayout from "../components/mainLayout/MainLayout";
import ScrolToTop from "../utils/ScrolToTop";


const RouterGate = () => {
  return (
    <>
      <React.Suspense>
        <BrowserRouter>
        <ScrolToTop/>
          <Routes>
            {routeConfig.authRoutes.map((route) => (
              <Route key={route.path} {...route} />
            ))}
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route element={<MainLayout/>}>
              {routeConfig.routes.map((route) => (
                <Route key={route.path} {...route}>
                  {route.routes.map((nestedRoute) => (
                    <Route key={nestedRoute.path} {...nestedRoute} />
                  ))}
                </Route>
              ))}
            </Route>

  {/* User Routes */}
             
            <Route element={<PrivateRoutes admin={false} />}>
              {routeConfig.userRoutes.map((route) => (
                <Route key={route.path} {...route}>
                  {/* Use a Route component for nested routes */}
                  {route.routes.map((nestedRoute) => (
                    <Route key={nestedRoute.path} {...nestedRoute} />
                  ))}
                </Route>
              ))}
            </Route>

   {/* Admin Routes */}
            <Route element={<PrivateRoutes admin={true} />}>
              {routeConfig.adminRoutes.map((route) => (
                <Route key={route.path} {...route}>
                  {/* Use a Route component for nested routes */}
                  {route.routes.map((nestedRoute) => (
                    <Route key={nestedRoute.path} {...nestedRoute} />
                  ))}
                </Route>
              ))}
            </Route>

          </Routes>
        </BrowserRouter>
        {/* <CommonSnackbar /> */}
      </React.Suspense>
    </>
  );
};

export default RouterGate;
