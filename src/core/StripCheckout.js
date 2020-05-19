import React, { useState, useEffect } from "react";
import { loadCart, emptyCart } from "./helper/carthelper";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import StripeCheckoutButton from "react-stripe-checkout";

export default function StripCheckout({
  products,
  setReload = (f) => f,
  reload = undefined,
}) {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((product) => (amount = amount + product.price));
    return amount;
  };

  const makePayment = () => {};

  const showStripButton = () =>
    isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey=""
        token={makePayment}
        amount={getFinalPrice() * 100}
        name="Checkout"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-outline-success">Pay With Strip</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-outline-info">Sign In</button>
      </Link>
    );

  return (
    <div>
      <h3>Strip Checkcout {getFinalPrice()}</h3>
      {showStripButton()}
    </div>
  );
}
