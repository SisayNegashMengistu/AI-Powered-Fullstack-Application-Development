import axios from "axios";

// Every request in requests.js is relative to this base URL.
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
