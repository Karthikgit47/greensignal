import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GreenSignalLogo from "../images/Greensignal.png";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState("");

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.usercode.trim()) {
      newErrors.usercode = "User Code is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors((prev) => ({
      ...prev,
      ...newErrors
    }));
  };

  const [formData, setFormData] = useState({
    usercode: "",
    password: "",
    subscriptionCode: "b2025-atm01",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorData("");

    //
    try {
      setLoading(true);

      const payload = {
        Query: {
          Code: formData.usercode,
          Password: formData.password,
          LicenseKey: "b2025-atm01"
        }
      };

      
      const response = await axios.post(
        "https://essuat.beyondexs.com/api/ESSLController.php",
        {
          // data: JSON.stringify(payload)
        },
        {
          params: {
            data: JSON.stringify(payload)
          },
          headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50"
          }
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.Status !== "Y") {
        throw new Error(response.data.Msg || "Login failed");
      }
      sessionStorage.setItem("EmpData", JSON.stringify(response.data));
      // Store session
      sessionStorage.setItem("username", formData.usercode);
      sessionStorage.setItem("licence", formData.subscriptionCode);

      navigate("/dashboard");
    } catch (error) {
      setErrorData(
        error.response?.data?.Msg || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* <h2 style={styles.heading}>Welcome Back</h2> */}
        <div style={styles.logo}>
          <img
            src={GreenSignalLogo}
            alt="Company Logo"
            style={{ width: "180px", height: "auto" }}
          />
        </div>

        <h2 style={styles.subText}>Login </h2>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>User Code</label>
            <input
              type="text"
              name="usercode"
              placeholder="Enter user code"
              value={formData.usercode}
              onChange={handleChange}
              style={styles.input}

            />
           
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.optionsRow}>
            <div style={styles.rememberMe}>
              <input
                type="checkbox"
                name="rememberMe"
                // // checked={formData.rememberMe || false}
                // // onChange={(e) =>
                // //   setFormData({
                // //     ...formData,
                // //     rememberMe: e.target.checked
                // //   })
                // }
                style={styles.checkbox}
              />
              <label style={styles.rememberLabel}>Remember Me</label>
            </div>

            <div>
              <span
                style={styles.forgotPassword}
              >
                Forgot Password?
              </span>
            </div>
          </div>

          {/* <div style={styles.inputGroup}>
            <label style={styles.label}>Subscription Code</label>
            <input
              type="password"
              name="subscriptionCode"
              placeholder="Enter subscription code"
              value={formData.subscriptionCode}
              onChange={handleChange}
              style={styles.input}
            />
          </div> */}

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
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    fontFamily: "Segoe UI, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "45px 35px",
    borderRadius: "16px",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
    transition: "0.3s ease-in-out",
  },

  logo: {
    textAlign: "center",
    marginBottom: "25px",
  },

  label: {
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },

  subText: {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "600",
    fontSize: "25px",
    color: "#2c5364",
    letterSpacing: "0.5px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginTop: "6px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #2c5364, #0f2027)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
    fontSize: "16px",
    fontWeight: "600",
    letterSpacing: "0.5px",
    boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
    transition: "0.3s ease"
  },
  optionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },

  rememberMe: {
    display: "flex",
    alignItems: "center",
    gap: "6px"
  },

  checkbox: {
    cursor: "pointer"
  },

  rememberLabel: {
    fontSize: "14px",
    color: "#555",
    cursor: "pointer"
  },

  forgotPassword: {
    fontSize: "14px",
    color: "#2e7d32",
    cursor: "pointer",
    textDecoration: "underline"
  }
};

export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import GreenSignalLogo from "../images/Greensignal.png";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.username) {

//       // Store username in sessionStorage
//       sessionStorage.setItem("username", formData.username);

//       navigate("/dashboard");
//     } else {
//       alert("Enter username & password");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         {/* <h2 style={styles.heading}>Welcome Back</h2> */}
//         <div style={styles.logo} >
//           <img src={GreenSignalLogo} alt="Company Logo" style={{ width: "150px", height: "auto" }} />
//         </div>

//         <h2 style={styles.subText}>Login </h2>

//         <form onSubmit={handleSubmit}>
//           <div style={styles.inputGroup}>
//             <label>Username</label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Enter username"
//               value={formData.username}
//               onChange={handleChange}
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.inputGroup}>
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               value={formData.password}
//               onChange={handleChange}
//               style={styles.input}
//             />
//           </div>

//           <button type="submit" style={styles.button}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(135deg, #4e73df, #1cc88a)",
//     padding: "20px"
//   },
//   card: {
//     background: "#fff",
//     width: "100%",
//     maxWidth: "400px",
//     padding: "40px",
//     borderRadius: "12px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "10px"
//   },
//   subText: {
//     textAlign: "center",
//     marginBottom: "20px",
//     color: "#666"
//   },
//   inputGroup: {
//     display: "flex",
//     flexDirection: "column",
//     marginBottom: "15px"
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     marginTop: "5px"
//   },
//   button: {
//     width: "100%",
//     padding: "12px",
//     background: "#4e73df",
//     color: "#fff",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     marginTop: "10px"
//   },
//   logo: {
//     fontWeight: "bold",
//     marginBottom: "30px",
//     textAlign: "center"
//   },
// };

// export default Login;
