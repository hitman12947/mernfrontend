import { API } from "../../backend";

export const createOrder = (userId, token, orders) =>
  fetch(`${API}/order/createOrder/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orders }),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
