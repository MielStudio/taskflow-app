import { Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import TasksList from "./pages/TasksList"
import TaskDetails from "./pages/TaskDetails"
import CreateTask from "./pages/CreateTask"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <TasksList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-task"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
