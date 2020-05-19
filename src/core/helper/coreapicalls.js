import { API } from "../../backend";

const getProducts = () =>
  fetch(`${API}/product/allproducts`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

export { getProducts };
