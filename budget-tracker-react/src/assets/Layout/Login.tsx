import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../API/AuthApi.tsx";
import { saveToken, decodeToken } from "../../Auth/authUtility.tsx";
import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin() {

    if (!username.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await loginUser({ username, password });
      saveToken(res.token);

      const user = decodeToken();

      if (user?.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  }

  return (
     <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={handleLogin}>
          Sign In
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
