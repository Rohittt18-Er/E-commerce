import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProductListPage from "../pages/ProductListPage";
import RegisterPage from "../pages/RegisterPage";
import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "../pages/admin/AdminChatsPage";
import AdminCreateProductPage from "../pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "../pages/admin/AdminEditProductPage";
import AdminEditUserPage from "../pages/admin/AdminEditUserPage";
import AdminOrderDetailsPage from "../pages/admin/AdminOrderDetailsPage";
import AdminOrdersPage from "../pages/admin/AdminOrdersPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import UserCartDetailsPage from "../pages/user/UserCartDetailsPage";
import UserOrderDetailsPage from "../pages/user/UserOrderDetailsPage";
import UserOrdersPage from "../pages/user/UserOrdersPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import AllRoutes from './routes'




export const authRoutes = [
    {
      path: AllRoutes.AUTH_ROUTES.LOGIN,
      exact: true,
      element: <LoginPage />,
      routes: [],
    },
    {
        path: AllRoutes.AUTH_ROUTES.REGISTER,
        exact: true,
        element: <RegisterPage/>,
        routes: [],
      },
  ];

  export const routes=[
    {
        path: AllRoutes.ROUTES.HOME,
        exact: true,
        element: <HomePage/>,
        routes: [],
      },
      {
        path: AllRoutes.ROUTES.PRODUCTDETAILS,
        exact: true,
        element: <ProductDetailsPage/>,
        routes: [],
      },
      {
        path: AllRoutes.ROUTES.PRODUCTLIST,
        exact: true,
        element: <ProductListPage/>,
        routes: [],
      },
      {
        path: AllRoutes.ROUTES.CART,
        exact: true,
        element: <CartPage/>,
        routes: [],
      }

  ]
  
  export const userRoutes=[
    {
        path: AllRoutes.USERROUTES.USER,
        exact: true,
        element: <UserProfilePage/>,
        routes: [],
      },

      {
        path: AllRoutes.USERROUTES.USERORDERS,
        exact: true,
        element: <UserOrdersPage/>,
        routes: [],
      },

      {
        path: AllRoutes.USERROUTES.CARTDETAILS,
        exact: true,
        element: <UserCartDetailsPage/>,
        routes: [],
      },
      
      
      {
        path: AllRoutes.USERROUTES.ORDERDETAILS,
        exact: true,
        element: <UserOrderDetailsPage/>,
        routes: [],
      },
      

  ]

  export const adminRoutes=[
    {
      path: AllRoutes.ADMINROUTES.ADMINUSER,
      exact: true,
      element: <AdminUsersPage/>,
      routes: [],
    },

    {
      path: AllRoutes.ADMINROUTES.ADMINEDITUSER,
      exact: true,
      element: <AdminEditUserPage/>,
      routes: [],
    },


    {
      path: AllRoutes.ADMINROUTES.ADMINPRODUCT,
      exact: true,
      element: <AdminProductsPage/>,
      routes: [],
    },

    {
      path: AllRoutes.ADMINROUTES.CREATEPRODUCTPAGE,
      exact: true,
      element: <AdminCreateProductPage/>,
      routes: [],
    },

    {
      path: AllRoutes.ADMINROUTES.EDITPRODUCTPAGE,
      exact: true,
      element: <AdminEditProductPage/>,
      routes: [],
    },

    {
      path: AllRoutes.ADMINROUTES.ADMINORDER,
      exact: true,
      element: <AdminOrdersPage/>,
      routes: [],
    },

    {
      path: AllRoutes.ADMINROUTES.ADMINORDERDETAILS,
      exact: true,
      element: <AdminOrderDetailsPage/>,
      routes: [],
    },

    
    {
      path: AllRoutes.ADMINROUTES.ADMINCHAT,
      exact: true,
      element: <AdminChatsPage/>,
      routes: [],
    },

    
    {
      path: AllRoutes.ADMINROUTES.ADMINANLYTICS,
      exact: true,
      element: <AdminAnalyticsPage/>,
      routes: [],
    },
    
    
  ]