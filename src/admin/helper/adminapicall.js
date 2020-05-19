import { API } from "../../backend";

// create Category

const addCategory = (userId, token, category) => {
  return fetch(`${API}/category/addcategory/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// get All Categories

const getAllCategories = () => {
  return fetch(`${API}/category/categories`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// delete single category

const deleteCategory = (token, categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// update Category

const updateCategory = (token, category) => {
  return fetch(`${API}/category/${category._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { addCategory, getAllCategories, deleteCategory, updateCategory };
