const AUTH_ROUTES = {
    LOGIN:"/login",
    REGISTER:"/register"
}

const ROUTES = {
    HOME:"/",
    PRODUCTDETAILS:"/product-details",
    PRODUCTLIST:"product-list",
    CART:"/cart",
    SINGLEPRODUCTDETAILS:"/product-details/:id"     
}

const USERROUTES ={
USER:'/user',
USERORDERS:"/user/my-orders",
CARTDETAILS:"/user/cart-details",
ORDERDETAILS:"/user/order-details"
}

const ADMINROUTES={
   ADMINUSER:"/admin/users",
   ADMINEDITUSER:"/admin/edit-user",
   ADMINPRODUCT:"/admin/products",
   CREATEPRODUCTPAGE:"/admin/create-new-product",
   EDITPRODUCTPAGE:"/admin/edit-product",
   ADMINORDER:"/admin/orders",
   ADMINORDERDETAILS:"/admin/order-details",
   ADMINCHAT:"/admin/chats",
   ADMINANLYTICS:"/admin/analytics"
}

const All_Routes = {
    AUTH_ROUTES,
    ROUTES,
    USERROUTES,
    ADMINROUTES

  };
  export default All_Routes;