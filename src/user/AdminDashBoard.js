import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const adminLeftSide = () => (
    <div className="card border-0">
      <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/admin/createcategory" className="text-info">
            Create Category
          </Link>
        </li>
        <li className="list-group-item text-success">
          <Link to="/admin/managecategories" className="text-info">
            Manage Categories
          </Link>
        </li>
        <li className="list-group-item text-success">
          <Link to="/admin/addproduct" className="text-info">
            Create Product
          </Link>
        </li>
        <li className="list-group-item text-success">
          <Link to="/admin/manageproducts" className="text-info">
            Manage Products
          </Link>
        </li>
      </ul>
    </div>
  );

  const adminRightSide = () => (
    <div className="card border-0">
      <h4 className="card-header">Admin Info</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Name: </span>
          {name}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Email: </span>
          {email}
        </li>
        <li className="list-group-item">
          <span className="badge badge-success mr-2">Admin:</span>True
        </li>
      </ul>
    </div>
  );
  return (
    <Base
      title="Welcome to Admin Area"
      description="Manage All Products"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
