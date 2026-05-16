import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      alert("Login successful");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#111", color: "white", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ color: "red" }}>Login</h1>

      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;