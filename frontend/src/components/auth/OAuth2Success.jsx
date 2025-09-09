import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuth2Success = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    localStorage.setItem("token", token);

    fetch("http://localhost:8080/api/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((user) => {
        navigate("/patient/dashboard", { replace: true });
      })
      .catch(() => navigate("/login", { replace: true }))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? <p>Processing login...</p> : <p>Redirecting...</p>}
    </div>
  );
};

export default OAuth2Success;
