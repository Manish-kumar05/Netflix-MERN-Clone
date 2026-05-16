import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#111", color: "white", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ color: "red" }}>Register</h1>

      <form onSubmit={handleRegister}>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <br /><br />

        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />

        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;