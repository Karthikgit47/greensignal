import { NavLink } from "react-router-dom";
import GreenSignalLogo from "../images/Greensignal.png";


function Sidebar({ isOpen }) {
  return (
    <div
      style={{
        ...styles.sidebar,
        width: isOpen ? "220px" : "70px"
      }}
    >
      <div style={styles.logo}>
        {isOpen ? (
          <img
            src={GreenSignalLogo}
            alt="GreenSignal"
            style={{ width: "150px", height: "auto" }}
          />
        ) : (
          "GS"
        )}
      </div>

      <NavLink
        to="/dashboard/menu"
        style={({ isActive }) => ({
          ...styles.link,
          background: isActive ? "#334155" : "transparent"
        })}
      >
        📋 {isOpen && "SOP"}
      </NavLink>

      <NavLink
        to="/login"
        style={({ isActive }) => ({
          ...styles.link,
          background: isActive ? "#334155" : "transparent",
        })}
      >
        🔒 {isOpen && "Logout"}
      </NavLink>
    </div>
  );
}

const styles = {
  sidebar: {
    background: "#1e293b",
    color: "#fff",
    padding: "20px 10px",
    transition: "0.3s",
    overflow: "hidden"
  },
  logo: {
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center"
  },
  link: {
    display: "block",
    padding: "12px",
    borderRadius: "6px",
    color: "#fff",
    textDecoration: "none",
    marginBottom: "10px"
  }
};

export default Sidebar;
