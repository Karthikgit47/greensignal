import { NavLink } from "react-router-dom";
import GreenSignalLogo from "../images/Greensignal.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, isMobile }) {

  const [openSOP, setOpenSOP] = useState(false);

  const storedUser = sessionStorage.getItem("EmpData");
  const parsedUser = JSON.parse(storedUser);

  const navigate = useNavigate();
  

  const linkStyle = ({ isActive }) => ({
    padding: "10px 15px",
    display: "block",
    textDecoration: "none",
    color: "white",
    background: isActive ? "#334155" : "transparent"
  });

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
            style={{ width: "150px", height: "auto",cursor:'pointer' }}
          onClick={()=> navigate("/dashboard")}
          />
        ) : (
          "GS"
        )}
      </div>
      <hr style={{border:"1px solid #3c4249"}}></hr>
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>
          {parsedUser?.Data?.EMP_NAME || "Guest User"}
        </h4>
        {/* <small style={{ fontSize: "12px", opacity: 0.8 }}>
          {parsedUser?.Data?.EMP_CODE || ""}
        </small> */}
      </div><hr style={{border:"1px solid #3c4249"}}></hr>

      <div
        onClick={() => setOpenSOP(!openSOP)}
        style={{
          padding: "10px 15px",
          cursor: "pointer",
          color: "white",
          marginTop: "10px "
        }}
      >
        📋 {isOpen && "SOP"}
      </div>


      {openSOP && (
        <div style={{ paddingLeft: "20px" }}>
          <NavLink to="/dashboard/list-of-sops" style={linkStyle}>
            {isOpen && "QA"}
          </NavLink>

          {/* <NavLink to="/dashboard/menu/qa" style={linkStyle}>
            {isOpen && "QA"}
          </NavLink> */}
        </div>
      )}

      {/* <NavLink
        to="/dashboard/menu"
        style={({ isActive }) => ({ ...styles.link, background: isActive ? "#334155" : "transparent" })} >
        📋 {isOpen && "SOP"}
      </NavLink> */}

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
