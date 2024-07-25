import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const getHelloWorld = () => apiClient.get("/hello-world");
export const getHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const getHelloWorldPathVariable = (name) =>
  apiClient.get(`/hello-world/path-variable/${name}`);
