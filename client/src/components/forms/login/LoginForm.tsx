import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginFieldErrors } from "../../../interfaces/LoginFieldErrors";
import ErrorHandler from "../../../handler/ErrorHandler";
import SpinnerSmall from "../../SpinnerSmall";

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loadingLogin: false,
    email: "",
    password: "",
    errors: {} as LoginFieldErrors,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    setState((prevState) => ({
      ...prevState,
      loadingLogin: true,
    }));

    login(state.email, state.password)
      .then(() => {
        navigate("/genders");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else if (error.response.status === 401) {
          setState((prevState) => ({
            ...prevState,
            errors: { general: error.response.data.message },
          }));
        } else {
          ErrorHandler(error, null);
        }
      })
      .finally(() => {
        setState((prevState) => ({
          ...prevState,
          loadingLogin: false,
        }));
      });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className={`form-control ${state.errors.email ? "is-invalid" : ""}`}
            name="email"
            id="email"
            value={state.email}
            onChange={handleInputChange}
            autoFocus
          />
          {state.errors.email && (
            <span className="text-danger">{state.errors.email[0]}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className={`form-control ${
              state.errors.password ? "is-invalid" : ""
            }`}
            name="password"
            id="password"
            value={state.password}
            onChange={handleInputChange}
          />
          {state.errors.password && (
            <span className="text-danger">{state.errors.password[0]}</span>
          )}
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={state.loadingLogin}
          >
            {state.loadingLogin ? (
              <>
                <SpinnerSmall /> Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
