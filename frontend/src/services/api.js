import axios from "axios";

const API = axios.create({
	baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api",
});

export const getRates = () => API.get("/mi-product-rates/");
export const getRate = (id) => API.get(`/mi-product-rates/${id}/`);
export const createRate = (formData) => API.post("/mi-product-rates/", formData);
export const updateRate = (id, formData) => API.put(`/mi-product-rates/${id}/`, formData);
export const deleteRate = (id) => API.delete(`/mi-product-rates/${id}/`);
export default API;
