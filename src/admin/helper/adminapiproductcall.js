import { API } from "../../backend";

// create Category

const addProduct = (userId, token, product) =>
  fetch(`${API}/product/createProduct/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

const updateProduct = (userId, token, productId, product) =>
  fetch(`${API}/product/updateProduct/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

const getAllProducts = () =>
  fetch(`${API}/product/allproducts`)
    .then((response) => response.json())
    .catch((err) => console.log(err));

const getAProduct = (productId) => {
  console.log(productId);
  return fetch(`${API}/product/getProduct/${productId}`)
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const deleteAProduct = (productId, token, userId) =>
  fetch(`${API}/product/deleteProduct/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

export {
  addProduct,
  getAllProducts,
  deleteAProduct,
  updateProduct,
  getAProduct,
};
