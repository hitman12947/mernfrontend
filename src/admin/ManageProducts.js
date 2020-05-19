import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getAllProducts, deleteAProduct } from "./helper/adminapiproductcall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    allProducts: [],
    deleteProductId: "",
    deleteProductName: "",
  });

  const { allProducts, deleteProductName, deleteProductId } = values;

  const getAllProds = () => {
    getAllProducts().then((response) => {
      if (response.error) {
        console.log(response);
      } else {
        console.log(response);
        setValues({ ...values, allProducts: response.products });
      }
    });
  };

  const prepareToDelete = (product) => {
    setValues({
      ...values,
      deleteProductId: product._id,
      deleteProductName: product.name,
    });
  };

  const deleteProdct = () => {
    deleteAProduct(deleteProductId, token, user._id)
      .then((response) => {
        console.log(response);
        setValues({ ...values, deleteProductId: "", deleteProductName: "" });
        getAllProds();
      })
      .catch((err) => console.log(err));
  };

  const deleteModel = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Are You sure to delete {deleteProductName} ?
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-danger rounded"
                onClick={deleteProdct}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getAllProds();
  }, []);

  const mapAllProducts = () =>
    allProducts.map((product, index) => (
      <div className="col mb-4" key={index}>
        <div className="card">
          <img src={product.photo} className="card-img" />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.category}</p>
            <p className="card-text">{product.description}</p>
            <div className="d-flex justify-content-between font-weight-bold">
              <p className="card-text">Price: {product.price}$</p>
              <p className="card-text">Available: {product.stock} Unit</p>
            </div>
          </div>
          <div className="btn-group d-flex justify-content-around card-footer">
            <Link
              to={`/admin/updateproduct/${product._id}`}
              className="btn btn-primary mr-2 rounded"
            >
              Update
            </Link>
            <button
              className="btn btn-danger rounded"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={prepareToDelete.bind(this, product)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));
  return (
    <Base
      title="Mange Products"
      description="Admin can manage products from here......."
      className="container"
    >
      {deleteModel()}
      <div className="row row-cols-md-3">{mapAllProducts()}</div>
    </Base>
  );
};
export default ManageProducts;
