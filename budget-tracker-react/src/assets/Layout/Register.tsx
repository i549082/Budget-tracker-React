import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../API/AuthApi.tsx";
import { saveToken, decodeToken } from "../../Auth/authUtility.tsx";
import styles from './Register.module.css';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  async function handleRegister() {
    setError("");

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await registerUser({ username, email, password });

      saveToken(res.token);

      const user = decodeToken();

      if (user?.role === "ADMIN") navigate("/admin");
      else navigate("/dashboard");
    } catch {
      setError("Failed to register. Try a different username/email.");
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create account</h2>

        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className={styles.button} onClick={handleRegister}>
          Register
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Register;
