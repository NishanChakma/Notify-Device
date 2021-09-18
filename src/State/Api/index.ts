import axios from "axios";

export const callApi = axios.create({
  baseURL: "http://35.201.2.209:8000/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});