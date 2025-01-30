import axiosInstance  from 'axios'

const API = import.meta.env.VITE_API


export const axios = axiosInstance.create({
  // baseURL: import.meta.env.MODE === "development" ? "http:///api" : `${API}/api`,
  baseURL:  `${API}/api`,
  withCredentials:true,
  headers: { "Content-Type": "application/json" }
})

