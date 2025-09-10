import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

const OAuth2Success = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const hash = window.location.hash;
  const tokenIndex = hash.indexOf('token=');
  const token = tokenIndex !== -1 ? hash.substring(tokenIndex + 6) : null;

  if (!token) {
    navigate("/login", { replace: true });
    return;
  }

  fetch("http://localhost:8080/api/auth/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch user info");
      return res.json();
    })
    .then(async (user) => {
      await login(token, user);
    })
    .catch(() => {
      navigate("/login", { replace: true });
    })
    .finally(() => setLoading(false));
}, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading ? <p>Processing login...</p> : <p>Redirecting...</p>}
    </div>
  );
};

export default OAuth2Success;
