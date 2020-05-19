import React, { Component } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { addCategory } from "./helper/adminapicall";

export default class AddCategory extends Component {
  state = {
    user: isAuthenticated().user,
    token: isAuthenticated().token,
    category: "",
    success: false,
    error: false,
  };

  handleChange = (e) => {
    this.setState({ category: e.target.value, success: false, error: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    addCategory(this.state.user._id, this.state.token, {
      name: this.state.category,
    }).then((response) => {
      if (response.error) {
        this.setState({ error: response.error });
      } else {
        this.setState({ category: "", success: true });
      }
    });
  };

  successMessage = () =>
    this.state.success && (
      <div className="text-success bg-white p-4 rounded mb-2">
        <h5>Category Created</h5>
      </div>
    );

  errorMessage = () =>
    this.state.error && (
      <div className="text-danger bg-white p-4 rounded mb-2">
        <h5>{this.state.error}</h5>
      </div>
    );

  addCategory = () => (
    <div className="card border-0">
      <h4 className="card-header">Add Category</h4>
      <div className="card-body">
        <button className="mb-3 btn btn-info btn-sm rounded">
          <Link to="/admin/dashboard" className="text-white">
            Admin Home
          </Link>
        </button>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange}
              placeholder="Add Category ex. Summer"
              value={this.state.category}
            />
          </div>
          <input
            type="submit"
            className="btn btn-outline-info rounded"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );

  render() {
    return (
      <Base
        title="Add Category"
        description="Add New Categories here"
        className="container bg-info rounded"
      >
        <div className="row p-4">
          <div className="col-md-8 offset-md-2">
            {this.successMessage()}
            {this.errorMessage()}
            {this.addCategory()}
          </div>
        </div>
      </Base>
    );
  }
}
