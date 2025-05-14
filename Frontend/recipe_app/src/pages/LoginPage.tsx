import { useState } from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const [authentication, setAuthentication] = useState("login");

  return (
    <>
      <Header></Header>
      <main className="login-main-container">
        {authentication === "login" && (
          <div className="login-page-wrapper">
            <div className="welcome-message">
              <h2>Welcome back!</h2>
              <p>
                Log in to manage your ingredients and generate delicious recipes
                in seconds.
              </p>
              <br />
              <p>Don't have an account?</p>
              <button
                className="signup-btn"
                onClick={() => setAuthentication("register")}
              >
                Sign Up
              </button>
            </div>
            <LoginForm
              header={"Login"}
              button={"Login"}
              authentication={authentication}
            ></LoginForm>
          </div>
        )}

        {authentication === "register" && (
          <div className="register-page-wrapper">
            <div className="welcome-message">
              <h2>First time here?</h2>
              <p>
                Create an account to save ingredients and get AI-generated
                recipes tailored just for you.
              </p>
              <br />
              <p>Already have an account?</p>
              <button
                className="signup-btn"
                onClick={() => setAuthentication("login")}
              >
                Login
              </button>
            </div>
            <LoginForm
              header={"Create Account"}
              button={"Sign Up"}
              authentication={authentication}
            ></LoginForm>
          </div>
        )}
      </main>
    </>
  );
}
