import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.username) {

    // Store username in sessionStorage
    sessionStorage.setItem("username", formData.username);

    navigate("/dashboard");
  } else {
    alert("Enter username & password");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* <h2 style={styles.heading}>Welcome Back</h2> */}
        <h2 style={styles.subText}>Login </h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4e73df, #1cc88a)",
    padding: "20px"
  },
  card: {
    background: "#fff",
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px"
  },
  subText: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#666"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#4e73df",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  }
};

export default Login;
