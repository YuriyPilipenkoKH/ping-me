import axiosInstance  from 'axios'

export const axios = axiosInstance.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials:true,

})