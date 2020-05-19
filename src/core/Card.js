import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/carthelper";

export default function Card({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [redirect, setRedirect] = useState(false);

  const getARedirect = (redirect) => redirect && <Redirect to="/cart" />;

  const addtocart = () => addItemToCart(product, () => setRedirect(true));

  const showAddToCart = (addToCart) =>
    addToCart && (
      <button
        onClick={addtocart}
        className="btn btn-block btn-outline-success mt-2 mb-2"
      >
        Add to Cart
      </button>
    );
  const showRemoveFromCart = (addToCart) =>
    addToCart && (
      <button
        onClick={() => {
          removeItemFromCart(product._id);
          setReload(!reload);
        }}
        className="btn btn-block btn-outline-danger mt-2 mb-2"
      >
        Remove from cart
      </button>
    );

  return (
    <div className="card text-white bg-dark border border-info mb-2">
      <div className="card-header lead font-weight-bold">{product.name}</div>
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper photo={product.photo} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">{product.price}$</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
}
