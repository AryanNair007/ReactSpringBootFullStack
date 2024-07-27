import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../Security/AuthContext";
import { deleteTodoByIdApi } from "../../api/todoApiService";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

function TodoManager() {
  const authContext = useAuth();
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);

  const fetchTodosData = useCallback(async () => {
    const username = authContext.user.username;
    const response = await apiClient.get(`/users/${username}/todos`);
    const result = response.data;
    setTodos([...result]);
    return result;
  }, [authContext.user]);
  useEffect(() => {
    (async () => {
      await fetchTodosData();
    })();
  }, [fetchTodosData]);

  const deleteTodo = async (id) => {
    await deleteTodoByIdApi(authContext.user.username, id);
    setMessage("Todo Successfully Deleted");
    setTimeout(() => setMessage(null), 5000);
    await fetchTodosData();
  };

  const updateTodo = async (id) => {
    navigate(`/todos/${id}`);
  };

  const addNewTodo = async () => {
    navigate(`/todos/-1`);
  };

  return (
    <div className="container">
      <h1>Things You Want To Do!</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Is Done</th>
              <th>Target Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, id) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.isDone ? "True" : "False"}</td>
                  <td>{todo.targetDate}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        updateTodo(todo.id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button className="btn btn-success" onClick={addNewTodo}>
            Add New Todo{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoManager;
