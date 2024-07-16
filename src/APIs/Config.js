import axios from 'axios';

export const BaseUrl = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: { 'Authorization': null },
  withCredentials: true,
});