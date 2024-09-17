import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../images/Logo.svg";
import { useLogin } from "../hooks/useLogin";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, success } = useLogin();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success === true) {
      toast.success("Login successful");
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      await login(username, password);
    }
    setValidated(true);
  };

  return (
    <section className="bg-light p-3 p-md-4 p-xl-5">
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
            <div className="card border border-light-subtle rounded-4">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="row">
                  <div className="col-12">
                    <div className="mb-5">
                      <div className="text-center mb-4">
                        <a href="#!">
                          <img
                            src={logoImg}
                            alt="Logo"
                            width="200"
                            height="170"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  className={`row g-3 needs-validation ${
                    validated ? "was-validated" : ""
                  }`}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          validated && !username ? "is-invalid" : ""
                        }`}
                        name="username"
                        id="text"
                        placeholder="user123"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <div className="invalid-feedback">
                        Please enter your username.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className={`form-control ${
                          validated && !password ? "is-invalid" : ""
                        }`}
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="invalid-feedback">
                        Please provide a password.
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn bsb-btn-xl btn-primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Logging" : "Login"}
                      </button>{" "}
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-12">
                    <hr className="mt-5 mb-4 border-secondary-subtle" />
                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                      <Link
                        to="/signup"
                        className="link-secondary text-decoration-none"
                      >
                        Create new account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
