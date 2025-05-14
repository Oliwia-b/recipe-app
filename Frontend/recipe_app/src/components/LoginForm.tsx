import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconPwd from "../assets/show-password.png";
import login from "../services/loginService";
import { register } from "../services/loginService";

interface Props {
  header: string;
  button: string;
  authentication: "login" | "register";
}

export default function LoginForm({ header, button, authentication }: Props) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<Boolean>(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [error, setError] = useState("");
  const [popup, setPopup] = useState("");

  const navigate = useNavigate();

  function onSubmit(formData: FormData) {
    const email = formData.get("username") as string;
    const password = formData.get("password") as string;

    if (authentication === "login") {
      (async function () {
        const result = await login(email, password);

        if (result.access_token) {
          localStorage.setItem("accessToken", result.access_token);
          navigate("/dashboard");
        } else {
          setError(result);
        }
      })();
    } else if (authentication === "register") {
      (async function () {
        const result = await register(email, password);

        if (result.message === "User registered successfully") {
          setPopup("Account created successfully!");
          setError("");
        } else {
          setError(result);
        }
      })();
    }
  }

  return (
    <form className="login-form" action={onSubmit}>
      {authentication === "register" && <div className="popup">{popup}</div>}
      <h2>{header}</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input required id="email" type="email" name="username" />
        <div className="mail-validation-error">
          {error === "User not found" && <span className="error">{error}</span>}
          {error === "Account with this email already exists" && (
            <span className="error">{error}</span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(e) => setCurrentPwd(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            required
          ></input>

          <span onClick={() => setShowPassword((prev) => !prev)}>
            <img src={iconPwd} alt="show-password-icon" />
          </span>
        </div>
        <div className="pwd-validation-error">
          {passwordFocused && currentPwd.length < 8 && (
            <p className="password-requirement">
              Must be at least 8 characters and cannot contain spaces
            </p>
          )}
          {error === "Wrong password" && (
            <p className="error pwd-error">{error}</p>
          )}
          {error ===
            "Password should be at least 8 characters long and cannot contain spaces" && (
            <p className="error pwd-error">{error}</p>
          )}
        </div>
      </div>

      <button>{button}</button>
    </form>
  );
}
