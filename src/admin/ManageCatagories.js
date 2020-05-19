import React, { Component } from "react";
import Base from "../core/Base";
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "./helper/adminapicall";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

export default class ManageCatagories extends Component {
  state = {
    allCategories: [],
    token: isAuthenticated().token,
    status: false,
    updateStatus: false,
    cateToUpdate: {},
  };

  updateModel = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    value={this.state.cateToUpdate.name || " "}
                    onChange={this.handleUpdateChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={this.updateCategoryBackend}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  updateCategoryBackend = () => {
    updateCategory(this.state.token, this.state.cateToUpdate).then(
      (response) => {
        if (response.error) {
          console.log(response);
        } else {
          this.setState({ updateStatus: true });
          this.getCategories();
        }
      }
    );
  };

  handleUpdateChange = (e) => {
    const cate = { ...this.state.cateToUpdate };
    cate.name = e.target.value;
    this.setState({ cateToUpdate: cate });
  };

  updateCate = (cate) => {
    this.setState({ cateToUpdate: cate });
  };

  getCategories = () =>
    getAllCategories().then((response) => {
      if (response.error) {
        console.log(response);
      } else {
        this.setState({ allCategories: response.categories });
      }
    });

  componentDidMount() {
    this.getCategories();
  }

  deleteSingleCategory = (id) => {
    this.setState({ status: false });
    deleteCategory(this.state.token, id).then((response) => {
      if (response.error) {
        console.log(response);
      } else {
        this.getCategories();
        this.setState({ status: true });
      }
    });
  };

  deleteStatus = () =>
    this.state.status && (
      <div className="text-danger bg-white p-2 rounded mb-2">
        <h5>Category Deleted</h5>
      </div>
    );

  updateStatus = () =>
    this.state.updateStatus && (
      <div className="text-success bg-white p-2 rounded mb-2">
        <h5>Category Updated</h5>
      </div>
    );

  render() {
    const mapAllCategories = () =>
      this.state.allCategories.map((cate) => {
        return (
          <li className="list-group-item" key={cate._id}>
            {cate.name}
            <button
              className="btn btn-danger btn-sm rounded float-right mr-2"
              onClick={this.deleteSingleCategory.bind(this, cate._id)}
            >
              Delete
            </button>

            <button
              type="button"
              className="btn btn-info btn-sm rounded float-right mr-2"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.updateCate.bind(this, cate)}
            >
              Update
            </button>
          </li>
        );
      });

    return (
      <Base
        title="All Categories"
        description="Manage All Categories Here"
        className="bg-success container p-4 rounded"
      >
        {this.updateModel()}
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {this.deleteStatus()}
            {this.updateStatus()}
            <button className="btn btn-primary btn-sm rounded">
              <Link to="/admin/dashboard" className="text-white">
                Admin Home
              </Link>
            </button>
            <hr />
            <div className="card">
              <div className="card-body">
                <ul className="list-group">{mapAllCategories()}</ul>
              </div>
            </div>
          </div>
        </div>
      </Base>
    );
  }
}
