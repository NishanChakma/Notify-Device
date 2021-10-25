import axios from "axios";

export const callApi = axios.create({
  baseURL: process.env.REACT_APP_API_KEY, //this should be in .env file while production
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
