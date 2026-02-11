import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return null;

  const logout = () => {
    localStorage.clear();
    // Dispatch custom event to notify App.jsx to update state
    window.dispatchEvent(new CustomEvent("authChange"));
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <h1 className="font-bold text-lg">LMS System</h1>

      <div className="flex gap-5 items-center">

        {/* ADMIN MENU */}
        {user.role === "ADMIN" && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/students">Students</Link>
            <Link to="/books">Books</Link>
            <Link to="/issue">Issue</Link>
            <Link to="/return">Return</Link>
            <Link to="/active-issues">Active Issues</Link>
            <Link to="/overdue">Overdue</Link>
            <Link to="/returned">Returned</Link>
          </>
        )}

        {/* STUDENT MENU */}
        {user.role === "STUDENT" && (
          <>
            <Link to="/student-dashboard">Books</Link>
            <Link to="/reset-password">Reset Password</Link>
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
