import React from "react";
import { useAuth } from "../Security/AuthContext";
import { retrieveAllTodoByUsername } from "../../api/todo-api";
function TodoManager() {
  const authContext = useAuth();

  const today = new Date();
  const targetDate = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate() + 3
  );
  const todoFromBackend = retrieveAllTodoByUsername(auth);
  const todos = [
    {
      id: 1,
      description: "Learn FullStack",
      isDone: false,
      targetDate: targetDate,
    },
    {
      id: 2,
      description: "Learn SpringBoot",
      isDone: false,
      targetDate: targetDate,
    },
    {
      id: 3,
      description: "Learn Docker",
      isDone: false,
      targetDate: targetDate,
    },
  ];

  return (
    <div className="container">
      <h1>Todo Management Area</h1>
      <div>Things You Want To Do!</div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Id</td>
              <td>Description</td>
              <td>Is Done</td>
              <td>Target Date</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, id) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.description}</td>
                  <td>{todo.isDone ? "True" : "False"}</td>
                  <td>{todo.targetDate.toDateString()}</td>
                  <td>
                    <button>Delete</button>
                  </td>
                  <td>
                    <button>Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoManager;
