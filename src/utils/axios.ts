import axios from 'axios';

export const proxy = axios.create({
  baseURL: process.env.REACT_APP_API_LOCATION || "",
});