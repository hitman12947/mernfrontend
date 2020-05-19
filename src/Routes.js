import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";

// public routes
import Signup from "./user/Signup";
import Signin from "./user/Signin";

// custom defined routes
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";

// views
import UserDashBoard from "./user/UserDashBoard";

// admin views
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCatagories from "./admin/ManageCatagories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import Cart from "./core/Cart";

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <PrivateRoute path="/cart" exact component={Cart} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoute path="/admin/addproduct" exact component={AddProduct} />
        <AdminRoute
          path="/admin/updateproduct/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/manageproducts"
          exact
          component={ManageProducts}
        />
        <AdminRoute
          path="/admin/createcategory"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/managecategories"
          exact
          component={ManageCatagories}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
