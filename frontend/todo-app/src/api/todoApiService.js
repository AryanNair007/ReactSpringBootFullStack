import apiClient from "./apiClient";
export const retrieveTodoByUsername = async (username) => {
  apiClient.get(`/users/${username}/todos`);
};

export const deleteTodoByIdApi = (username, id) =>
  apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoApi = (username, id) =>
  apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodoApi = (username, id, todo) =>
  apiClient.put(`/users/${username}/todos/${id}`, todo);

export const createdTodoApi = (username, todo) =>
  apiClient.post(`/users/${username}/todos`, todo);
