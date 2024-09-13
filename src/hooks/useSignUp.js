import { useState } from "react";
import useAuthContext from "./useAuthContext"; // Correct import
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext(); // Correct destructuring
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const signUpFn = async (username, password, email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return { signUpFn, loading, error, success };
};
