import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Room from "./components/Room";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Chat from "./components/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path=""
            element={<ProtectedRoute>{/* <Conversations /> */}</ProtectedRoute>}
          />
          <Route path="register" element={<Register />} />
          <Route path="chat" element={<Chat />} />

          <Route path="find-room" element={<Room />} />

          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
