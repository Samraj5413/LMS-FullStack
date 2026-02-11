import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Books from "./pages/Books";
import Issue from "./pages/Issue";
import Return from "./pages/Return";
import ActiveIssues from "./pages/ActiveIssues";
import Overdue from "./pages/Overdue";
import Returned from "./pages/Returned";
import StudentDashboard from "./pages/StudentDashboard";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

function AuthRedirect() {
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch {
    // Ignore parse errors and proceed to login
  }
  
  if (user?.role === "ADMIN") {
    return <Navigate to="/" replace />;
  } else if (user?.role === "STUDENT") {
    return <Navigate to="/student-dashboard" replace />;
  }
  return <Auth />;
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      // Ignore parse errors
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        // Ignore parse errors
        setUser(null);
      }
    };

    window.addEventListener("storage", updateUser);

    window.addEventListener("authChange", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("authChange", updateUser);
    };
  }, []);

  const isLoggedIn = !!user;

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar user={user} />}

      <Routes>
        <Route path="/auth" element={<AuthRedirect />} />

        <Route path="/verify" element={<VerifyEmail />} />

        <Route
          path="/reset-password"
          element={isLoggedIn ? <ResetPassword /> : <Navigate to="/auth" />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Books />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Issue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/return"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Return />
            </ProtectedRoute>
          }
        />

        <Route
          path="/active-issues"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ActiveIssues />
            </ProtectedRoute>
          }
        />

        <Route
          path="/overdue"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Overdue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/returned"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Returned />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
