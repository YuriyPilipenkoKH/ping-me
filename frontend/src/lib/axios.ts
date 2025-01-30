import axiosInstance  from 'axios'
import dotenv from 'dotenv';

dotenv.config();

const API = process.env.API
console.log('API',API); 

export const axios = axiosInstance.create({
  // baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : `${API}/api`,
  baseURL:  `${API}/api`,
  withCredentials:true,
  headers: { "Content-Type": "application/json" }
})

//
//
//
//
//