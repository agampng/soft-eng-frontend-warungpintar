import axios from "axios";

import errorResponseHandler from "./errorResponseHandler";

const instance = axios.create({
  baseURL: `https://pokeapi.co/api/v2/`,
});

instance.interceptors.response.use(
  (response) => response,
  errorResponseHandler
);

export default instance;
