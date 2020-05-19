import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((response) => {
      if (response.error) {
        console.log(response);
        setError(response.error);
      } else {
        setProducts(response.products);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to tshirt store">
      <div className="text-center">
        <h2>All Tshirts</h2>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-4 mb-4" key={index}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default Home;
