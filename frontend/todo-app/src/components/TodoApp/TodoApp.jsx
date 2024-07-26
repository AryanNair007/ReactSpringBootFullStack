import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./TodoApp.css";
import LoginComponent from "../Login/LoginComponent";
import WelcomeComponent from "../Welcome/WelcomeComponent";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import TodoList from "../TodoManager/TodoManager";
import Header from "../Header/Header";
import Logout from "../Logout/Logout";
import AuthProvider from "../Security/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthenticatedRoute from "../AuthenticatedRoute/AuthenticatedRoute";
import TodoComponent from "../TodoComponent/TodoComponent";

function TodoApp() {
  return (
    <div className="todo-app">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <div className="todo-main">
            <Routes>
              <Route path="/" element={<LoginComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route
                path="/welcome/:username"
                element={
                  <AuthenticatedRoute>
                    <WelcomeComponent />
                  </AuthenticatedRoute>
                }
              />
              {/* <Route path="/welcome" element={<WelcomeComponent />} /> */}
              <Route
                path="/todos"
                element={
                  <AuthenticatedRoute>
                    <TodoList />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/todos/:id"
                element={
                  <AuthenticatedRoute>
                    <TodoComponent />
                  </AuthenticatedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <AuthenticatedRoute>
                    <Logout />
                  </AuthenticatedRoute>
                }
              />
              <Route path="*" element={<ErrorComponent />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default TodoApp;
