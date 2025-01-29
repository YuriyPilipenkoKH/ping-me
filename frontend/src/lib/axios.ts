import axiosInstance  from 'axios'

export const axios = axiosInstance.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
  withCredentials:true,
  headers: { "Content-Type": "application/json" }
})