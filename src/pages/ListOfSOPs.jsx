import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ListOfSOPs() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleView = (id, sopName) => {
    navigate(`/dashboard/sop-documents/${id}`, {
      state: { SopName: sopName },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const storedUser = sessionStorage.getItem("EmpData");
        // console.log(storedUser.Data)
        const parsedUser = JSON.parse(storedUser);

        console.log(parsedUser); // full object
        console.log(parsedUser.Data); // Data object
        console.log(parsedUser.Data.EMP_NAME); // specific value
        let Filter1 = `CompanyID=${parsedUser.Data.EMP_CMRECID} AND (FIND_IN_SET ('${parsedUser.Data.EMP_RECID}', SOP_PREPAREDBY) OR FIND_IN_SET ('${parsedUser.Data.EMP_RECID}', SOP_REVIEWEDBY) OR FIND_IN_SET ('${parsedUser.Data.EMP_RECID}', SOP_APPROVEDBY))`;

        const payload = {
          Query: {
            AccessID: "TR337",
            ScreenName: "List Of SOPs",
            Filter: Filter1,
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

        console.log("API Response:", response.data);
        setData(response.data?.Data?.rows || []);
      } catch (error) {
        console.error(error.response || error);
      }
      finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <style>{spinnerKeyframes}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3>List of SOPs</h3>

        {/* <button
          style={{
            width: "78px",
            height: "48px",
            background: "#2563eb",  
            color: "#fff",
            fontSize: "26px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/dashboard/form-list")}
        >
         Forms
        </button> */}
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Code</th>
            <th style={styles.th}>Description</th>
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
                <td style={{ ...styles.td, width: "120px" }}>{item.Code}</td>
                <td style={styles.td}>{item.Description}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <FaArrowRight
                    style={{
                      cursor: item.IsEnable === "Y" ? "pointer" : "not-allowed",
                      color: item.IsEnable === "Y" ? "#254da8" : "#ccc",
                      fontSize: "18px",
                      opacity: item.IsEnable === "Y" ? 1 : 0.5,
                    }}
                    onClick={() => {
                      if (item.IsEnable === "Y") {
                        handleView(item.RecordID, item.Description);
                      }
                      if (item.IsEnable === "Y" && item.Description === "DISTRIBUTION AND CONTROL OF DOCUMENTS") {
                        navigate("/dashboard/form-list");
                      }
                    }}
                  />
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

// Add this in a <style> tag somewhere in your component or global CSS
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
    background: "#727b88",
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

export default ListOfSOPs;
