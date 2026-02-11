import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../services/api";

export default function VerifyEmail() {
  const token = new URLSearchParams(window.location.search).get("token");
  const [message, setMessage] = useState(() => {
    return token ? "Verifying..." : "Invalid verification link.";
  });

  useEffect(() => {
    if (!token) {
      return;
    }

    api
      .get(`/auth/verify?token=${token}`)
      .then(() => {
        setMessage("Email verified successfully! You can now login using your default password.");
      })
      .catch((err) => {
        setMessage(err.response?.data || "Verification failed");
      });
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-20 text-center">
      <h2 className="text-2xl font-bold">{message}</h2>

      {message.includes("successfully") && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => (window.location.href = "/auth")}
        >
          Go to Login
        </button>
      )}
    </div>
  );
}
