import React, { Component } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { updateProduct, getAProduct } from "./helper/adminapiproductcall";
import { getAllCategories } from "./helper/adminapicall";

export default class UpdateProduct extends Component {
  state = {
    categories: [],
    price: "",
    stock: "",
    name: "",
    description: "",
    productImage: "",
    category: "",
    user: {},
    token: "",
    isCategoriesLoaded: false,
    error: false,
    success: false,
  };

  getCategories = () =>
    getAllCategories().then((response) => {
      if (response.error) {
        console.log(response);
      } else {
        this.setState({
          categories: response.categories,
          isCategoriesLoaded: true,
        });
      }
    });

  preload = () => {
    const id = this.props.match.params.productId;
    this.setState({
      user: isAuthenticated().user,
      token: isAuthenticated().token,
    });

    getAProduct(id)
      .then((response) => {
        console.log(response);
        if (response.error) {
          console.log(response);
        } else {
          this.setState({
            name: response.name,
            category: response.category,
            description: response.description,
            price: response.price,
            stock: response.stock,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.preload();
    this.getCategories();
  }

  handleChange = (e) => {
    if (e.target.name === "productImage") {
      this.setState({ productImage: e.target.files[0] });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        success: false,
        error: false,
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const sForm = new FormData();
    sForm.append("name", this.state.name);
    sForm.append("price", this.state.price);
    sForm.append("stock", this.state.stock);
    sForm.append("category", this.state.category);
    sForm.append("description", this.state.description);
    sForm.append("productImage", this.state.productImage);

    updateProduct(
      this.state.user._id,
      this.state.token,
      this.props.match.params.productId,
      sForm
    ).then((response) => {
      if (response.error) {
        console.log(response);
        this.setState({ error: response.error });
      } else {
        this.setState({
          price: "",
          stock: "",
          name: "",
          description: "",
          productImage: "",
          category: "",
          error: false,
          success: true,
        });
        this.props.history.push('/admin/manageproducts')
      }
    });
  };

  updateProductForm = () => (
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Half"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        />
      </div>
      <div className="form-group">
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          onChange={this.handleChange}
          name="price"
          value={this.state.price}
          placeholder="20"
        />
      </div>
      <div className="form-group">
        <label>Product Stock</label>
        <input
          type="number"
          onChange={this.handleChange}
          className="form-control"
          name="stock"
          value={this.state.stock}
          placeholder="10"
        />
      </div>
      <div className="form-group">
        <label>Select Category</label>
        <select
          className="form-control"
          onChange={this.handleChange}
          name="category"
          value={this.state.category}
        >
          {this.state.isCategoriesLoaded &&
            this.state.categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Product Image</label>
        <input
          type="file"
          className="form-control-file border-0 rounded"
          onChange={this.handleChange}
          name="productImage"
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          onChange={this.handleChange}
          value={this.state.description}
          name="description"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Update Product"
          className="btn btn-outline-success rounded"
        />
      </div>
    </form>
  );
  render() {
    return (
      <Base
        title="Update Product"
        description="Admin can update product detail from this page"
        className="container bg-light p-4"
      >
        <div className="container">
          <h3 className="text-center">Update Product</h3>

          {this.updateProductForm()}
        </div>
      </Base>
    );
  }
}
