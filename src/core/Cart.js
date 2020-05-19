import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/carthelper";
import StripCheckout from "./StripCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllCartItem = () => {
    return (
      <div>
        <h2>This is load product</h2>
        {products.map((product, index) => (
          <Card
            product={product}
            key={index}
            addToCart={false}
            removeFromCart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => (
    <div>
      <h2>this is checkout sections</h2>
    </div>
  );

  return (
    <Base title="Cart Page" description="Your Items in Cart">
      <div className="text-center">
        <h2>All Cart Items</h2>
        <div className="row">
          <div className="col-6">{loadAllCartItem()}</div>
          <div className="col-6">
            <StripCheckout
              products={products}
              setReload={setReload}
              reload={reload}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
