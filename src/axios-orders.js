import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-3251d-default-rtdb.firebaseio.com/",
});

export default instance;
