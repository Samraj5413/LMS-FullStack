import { useState } from "react";
// import axios from "axios";
import api from "../services/api";

export default function ResetPassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Safely get user from localStorage
  const getUser = () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const user = getUser();

  if (!user || !user.email) {
    return <p className="text-center mt-10 text-red-600">Not logged in</p>;
  }

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirm) {
      setError("New passwords do not match");
      return;
    }

    if (!currentPassword || !newPassword) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Try with 'oldPassword' first (common Spring Boot pattern)
      // If that doesn't work, backend might expect 'currentPassword'
      const requestBody = {
        email: user.email,
        oldPassword: currentPassword,
        newPassword: newPassword,
      };

      await api.post("/auth/reset-password", requestBody);

      setMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");

    } catch (err) {
      // Handle different error response formats
      let errorMessage = "Failed to update password";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else {
          errorMessage = JSON.stringify(err.response.data);
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>

      <form onSubmit={handleReset} className="flex flex-col gap-4">

        <input
          type="password"
          placeholder="Current Password"
          className="border p-2"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="border p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="border p-2"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
