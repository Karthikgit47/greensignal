import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookOpen, FaEye } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaE } from "react-icons/fa6";

function ListOfDocuments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const handlelogNotes = (recordId, documentName) => {
    navigate(`/dashboard/list-of-log-notes/${recordId}`, {
      state: {
        SopName: sopName,
        SopID: id,
        DocumentName: documentName,
        DocumentID: recordId,
        Code: sopCode
      },
    });
  };
    const handlelogAnnexure = (recordId, documentName, sortOrder) => {
    navigate(`/dashboard/annexure-${sortOrder}`, {
      state: {
        SopName: sopName,
        SopID: id,
        DocumentName: documentName,
        DocumentID: recordId,
      },
    });
  };

  const sopName = location.state?.Description || "Documents";
  const sopCode = location.state?.Code || "Documents";

  useEffect(() => {
    const fetchNewScreenData = async () => {
      setLoading(true);
      try {
        const storedUser = sessionStorage.getItem("EmpData");
        const parsedUser = JSON.parse(storedUser);

        // If CompanyID should be dynamic from logged user
        const companyId = parsedUser?.Data?.EMP_CMRECID;

        // If SopID is fixed (example: 4)
        const sopId = id;

        const filter = `CompanyID='${companyId}' AND SopID='${sopId}'`;

        const payload = {
          Query: {
            AccessID: "TR338",
            Filter: filter,
            Any: "",
          },
        };

        const response = await axios.get(
          "https://bosuat.beyondexs.com/api/wslistview_mysql.php",
          {
            params: {
              data: JSON.stringify(payload),
            },
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
            },
          },
        );

        console.log("New Screen API Response:", response.data);

        setData(response.data?.Data?.rows || []);
      } catch (error) {
        console.error("Error:", error.response || error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewScreenData();
  }, []);

  return (
    <div>
      <style>{spinnerKeyframes}</style>
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <h3 style={{ fontWeight: "500" }}>
          {/* <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/list-of-sops")}
          >
            List of SOPs
          </span> */}

          {/* <span style={{ margin: "0 8px", color: "#888" }}>/</span> */}

          {/* <span style={{ fontWeight: "600", color: "#000" }}>{sopName}</span> */}
          <span style={{ fontWeight: "600", color: "#000" }}>{sopCode} (Documents)</span>
        </h3>
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>SL#</th>
            <th style={styles.th}>Type Of Document</th>
            <th style={styles.th}>Document Name</th>
            <th style={styles.th}>Action </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                <div style={spinnerStyle}></div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.RecordID || index}>
                <td style={styles.td}>{item.SLNO}</td>
                <td style={{ ...styles.td, width: "120px" }}>
                  {item.TypeOfDocumentName}
                </td>
                <td style={styles.td}>{item.DocumentName}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <FaBookOpen
                    title="Log Notes"
                    style={{ cursor: "pointer", color: "#80b0e4" }}
                    onClick={() => {
                      handlelogNotes(item.RecordID, item.DocumentName);
                    }}
                  />
                  {id==3 && item.TypeOfDocumentName=="Annexure" && (<FaEye
                    title="View"
                    style={{
                      cursor: "pointer",
                      color: "#80b0e4",
                      fontSize: "18px",
                      paddingLeft: "15px",
                    }}
                    onClick={() => {
                      handlelogAnnexure(item.RecordID, item.DocumentName,item.SortOrder);
                    }}
                  />)}
                  
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const spinnerStyle = {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #254da8",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  animation: "spin 1s linear infinite",
  margin: "auto",
};

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },

  th: {
    border: "1px solid #ddd",
    padding: "12px",
    background: "#727b88",
    color: "#fff",
    textAlign: "left",
  },

  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
};

export default ListOfDocuments;
