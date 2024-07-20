import axios from 'axios';

export const BaseUrl = axios.create({
  baseURL: "http://0.0.0.0:8001/",
  headers: { 'Authorization': null },
  withCredentials: true,
});