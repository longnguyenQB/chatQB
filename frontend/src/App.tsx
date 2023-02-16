import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ActiveConversations } from "./components/ActiveConversations";
import Chat from "./components/Chat";
// import { Conversations from "./components/Conversations";
import Login from "./components/Login";
import Room from "./components/Room";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/Navbar";
import Register from "./components/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthContextProvider>
              <Navbar />
            </AuthContextProvider>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />
          <Route
            path="find-room/"
            element={
              <ProtectedRoute>
                <Room />
              </ProtectedRoute>
            }
          />
          <Route
            path="chats/:conversationName"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />

          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
