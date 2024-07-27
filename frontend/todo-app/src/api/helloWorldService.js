import apiClient from "./apiClient";
export const getHelloWorld = () => apiClient.get("/hello-world");
export const getHelloWorldBean = () => apiClient.get("/hello-world-bean");

export const getHelloWorldPathVariable = (name) =>
  apiClient.get(`/hello-world/path-variable/${name}`);
