import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";

import { getAllCategories } from "./helper/adminapicall";
import { addProduct } from "./helper/adminapiproductcall";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    categories: [],
    price: "",
    stock: "",
    name: "",
    description: "",
    productImage: "",
    category: "",
    isCategoriesLoaded: false,
    error: false,
    success: false,
  });

  const {
    categories,
    isCategoriesLoaded,
    price,
    stock,
    name,
    description,
    productImage,
    success,
    error,
    category,
  } = values;

  const fetchCategories = () => {
    getAllCategories().then((response) => {
      if (response.error) {
        console.log(response);
      } else {
        setValues({
          ...values,
          categories: response.categories,
          category: response.categories[0]._id,
          isCategoriesLoaded: true,
        });
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const sForm = new FormData();
    sForm.append("name", name);
    sForm.append("price", price);
    sForm.append("stock", stock);
    sForm.append("category", category);
    sForm.append("description", description);
    sForm.append("productImage", productImage);

    addProduct(user._id, token, sForm).then((response) => {
      if (response.error) {
        console.log(response);
        setValues({ ...values, error: response.error });
      } else {
        setValues({
          ...values,
          price: "",
          stock: "",
          name: "",
          description: "",
          productImage: "",
          category: "",
          error: false,
          success: true,
        });
      }
    });

    console.log({ ...values });
  };

  const handleChange = (e) => {
    if (e.target.name === "productImage") {
      setValues({
        ...values,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        success: false,
        error: false,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addProductForm = () => (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Half"
          required
          name="name"
          onChange={handleChange}
          value={name}
        />
      </div>
      <div className="form-group">
        <label>Product Price</label>
        <input
          type="number"
          className="form-control"
          onChange={handleChange}
          name="price"
          value={price}
          required
          placeholder="20"
        />
      </div>
      <div className="form-group">
        <label>Product Stock</label>
        <input
          type="number"
          onChange={handleChange}
          className="form-control"
          required
          name="stock"
          value={stock}
          placeholder="10"
        />
      </div>
      <div className="form-group">
        <label>Select Category</label>
        <select
          className="form-control"
          onChange={handleChange}
          required
          name="category"
          value={category}
        >
          {isCategoriesLoaded &&
            categories.map((category, index) => (
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
          onChange={handleChange}
          name="productImage"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          onChange={handleChange}
          value={description}
          name="description"
          required
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <input
          type="submit"
          value="Add Product"
          className="btn btn-outline-success rounded"
        />
      </div>
    </form>
  );

  const successMessage = () =>
    success && (
      <div className="text-success bg-white p-4 rounded mb-2">
        <h5>Product Created</h5>
      </div>
    );

  const errorMessage = () =>
    error && (
      <div className="text-danger bg-white p-4 rounded mb-2">
        <h5>{error}</h5>
      </div>
    );

  return (
    <Base
      title="Add Product"
      description="Admin Can Add Product from here"
      className="container bg-light p-4 rounded"
    >
      <h4 className="text-center">Add Product</h4>
      {successMessage()}
      {errorMessage()}
      {addProductForm()}
    </Base>
  );
};

export default AddProduct;
