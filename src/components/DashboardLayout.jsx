import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const isDashboardHome = location.pathname === "/dashboard";

  const dashboardBoxes = [
    { title: "QUALITY", color: "#5a5c69" },
    { title: "LOGISTICS", color: "#fd7e14" },
    { title: "ADMIN", color: "#20c997" },    
    { title: "SOP", color: "#f6c23e" },
    { title: "HR", color: "#e74a3b" },
    { title: "PRODUCTION", color: "#858796" },   
    { title: "SALES", color: "#4e73df" },
    { title: "PURCHASE", color: "#1cc88a" },
    { title: "INVENTORY", color: "#36b9cc" },
  ];

  return (
    <div style={styles.layout}>
      <Sidebar isOpen={isOpen} />

      <div style={styles.main}>
        {/* Top Header */}
        <div style={styles.header}>
          <button
            style={styles.menuBtn}
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <span style={{ fontWeight: "600" }}>Dashboard</span>
        </div>

        <div style={styles.content}>
          {isDashboardHome && (
            <div style={styles.grid}>
              {dashboardBoxes.map((box, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.card,
                    backgroundColor: box.color,
                  }}
                >
                  <div style={styles.cardHeader}>
                    {box.title}
                  </div>

                  <div style={styles.divider}></div>

                  <div style={styles.statusRow}>
                    <span>Prepared</span>
                    <span>(12)</span>
                  </div>
                  <div style={styles.statusRow}>
                    <span>Reviewed</span>
                    <span>(7)</span>
                  </div>
                  <div style={styles.statusRow}>
                    <span>Approved</span>
                    <span>(4)</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f1f5f9",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: "60px",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    padding: "0 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  menuBtn: {
    fontSize: "20px",
    marginRight: "15px",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  content: {
    padding: "25px",
  },

  /* Dashboard Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  cardHeader: {
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  divider: {
    margin: "15px 0",
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.5)",
  },

  statusRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
};

export default DashboardLayout;