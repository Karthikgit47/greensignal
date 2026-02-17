import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function MenuList() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { id: 1, name: "Paracetamol 500mg", mfg: "12-01-2025", exp: "11-01-2027" },
    { id: 2, name: "Amoxicillin 250mg", mfg: "05-02-2025", exp: "04-02-2027" },
    { id: 3, name: "Vitamin C Tablets", mfg: "20-03-2025", exp: "19-03-2027" },
    { id: 4, name: "Cough Syrup", mfg: "15-04-2025", exp: "14-04-2027" },
    { id: 5, name: "Insulin Injection", mfg: "01-05-2025", exp: "30-04-2026" },
  ];

  return (
    <div>
      <div style={styles.topBar}>
        <h3>Menu List</h3>
        <button
          style={styles.addBtn}
          onClick={() => navigate("/dashboard/add-form")}
        >
          +
        </button>
      </div>

      {/* Desktop Table */}
      {!isMobile && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Name of Product</th>
              <th style={styles.th}>Manufacturing Date</th>
              <th style={styles.th}>Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.mfg}</td>
                <td style={styles.td}>{item.exp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <div>
          {data.map((item, index) => (
            <div key={item.id} style={styles.card}>
              <p><strong>S.No:</strong> {index + 1}</p>
              <p><strong>Product:</strong> {item.name}</p>
              <p><strong>MFG Date:</strong> {item.mfg}</p>
              <p><strong>Expiry Date:</strong> {item.exp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  addBtn: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontSize: "26px",
    border: "none",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    background: "#1e293b",
    color: "#fff",
    textAlign: "left",
  },

  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "8px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.08)",
  },
};

export default MenuList;
