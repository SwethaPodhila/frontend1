import React from "react";

function Dashboard() {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow-lg rounded-4">
        <h2>🎉 Welcome to Dashboard</h2>
        <button
          className="btn btn-danger mt-3"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
