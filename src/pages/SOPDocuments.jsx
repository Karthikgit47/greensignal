import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaArrowRight, FaPrint, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaE } from "react-icons/fa6";

function SOPDocuments() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleEdit = (id, batchStatus) => {
    navigate(`/dashboard/add-form/${id}/edit`, {
      state: { batchStatus: batchStatus },
    });
  };

  const handlePrint = (id) => {
    navigate(`/dashboard/add-form/${id}/print`);
  };
  const handleAdd = () => {
    navigate(`/dashboard/add-form/-1`);
  };

  const [username, setUsername] = useState("");
  const [PrepareBy, setPrepareBy] = useState("");
  const [ReviewBY, setReviewBy] = useState("");
  const [ApprovedBy, setApprovedBy] = useState("");
  useEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    console.log("Fetching and User:", storedUser);
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("EmpData");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setPrepareBy(parsedUser.Data.EMP_PREPAREDBY);
      setReviewBy(parsedUser.Data.EMP_REVIEWBY);
      setApprovedBy(parsedUser.Data.EMP_APPROVEDBY);
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const storedUser = sessionStorage.getItem("username");
        const storedUser = sessionStorage.getItem("EmpData");
        // console.log(storedUser.Data)
        const parsedUser = JSON.parse(storedUser);
        const PrepareBy = parsedUser.Data.EMP_PREPAREDBY;
        const ReviewBY = parsedUser.Data.EMP_REVIEWBY;
        const ApprovedBy = parsedUser.Data.EMP_APPROVEDBY;

        console.log(parsedUser); // full object
        console.log(parsedUser.Data); // Data object
        console.log(parsedUser.Data.EMP_NAME); // specific value
        console.log("Fetching and User:", storedUser);
        let Filter1 = `CompanyID=${parsedUser.Data.EMP_CMRECID}`;

        let Filter = `CompanyID=${parsedUser.Data.EMP_CMRECID} AND (Preparedby =${parsedUser.Data.EMP_RECID} OR Approvdby =${parsedUser.Data.EMP_RECID} OR ReviewedBy=${parsedUser.Data.EMP_RECID})`;
        let statuses = [];

        if (PrepareBy === "Y") {
          statuses.push("'Yet to be Picked','Prepared'");
        }

        if (ReviewBY === "Y") {
          statuses.push("'Reviewed'");
        }

        if (ApprovedBy === "Y") {
          statuses.push("'Approved'");
        }

        let batchstatus = "";

        if (statuses.length > 0) {
          batchstatus = "BatchStatus IN (" + statuses.join(", ") + ")";
          Filter += ` AND ${batchstatus} `;
        }

        console.log(batchstatus);
        // if (PrepareBy == "Y") {
        //   Filter += ` AND BatchStatus = 'Yet to Be Picked' AND PreparedBy = ${parsedUser.Data.EMP_RECID} AND ReviewedBy = ${parsedUser.Data.EMP_RECID} AND ApprovdBy = ${parsedUser.Data.EMP_RECID} `;
        // }
        // if (ReviewBY == "Y") {
        //   Filter += " AND BatchStatus='Prepared'";
        // }
        // if (ApprovedBy == "Y") {
        //   Filter += " AND BatchStatus IN ('Reviewed', 'Approved')";
        // }
        let conditions = [];
        const empId = parsedUser.Data.EMP_RECID;
        console.log(PrepareBy, "PrepareBy");
        console.log(ApprovedBy, "ApprovedBy");
        console.log(ReviewBY, "ReviewBY");
        // if (PrepareBy === "Y") {
        //   conditions.push(
        //     `(BatchStatus = 'Yet to Be Picked' AND PreparedBy = ${empId})`,
        //   );
        // }

        // if (ReviewBY === "Y") {
        //   conditions.push(
        //     `(BatchStatus = 'Prepared' AND ReviewedBy = ${empId})`,
        //   );
        // }

        // if (ApprovedBy === "Y") {
        //   conditions.push(
        //     `(BatchStatus IN ('Reviewed', 'Approved') AND ApprovdBy = ${empId})`,
        //   );
        // }

        // if (conditions.length > 0) {
        //   Filter += " AND (" + conditions.join(" OR ") + ")";
        // }
        console.log(Filter, "Filter");
        const payload = {
          Query: {
            AccessID: "TR335",
            ScreenName: "SOPDocuments",
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
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {/* Top Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h3>List of SOPs</h3>

        <FaPlus
          title="Add Product"
          style={{
            cursor: "pointer",
            color: "#2563eb",
            fontSize: "20px",
          }}
          onClick={handleAdd}
        />
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>#</th>
            <th style={styles.th}>Batch No</th>
            <th style={styles.th}>Name of the Product</th>
            <th style={styles.th}>Manufacturing Date</th>
            <th style={styles.th}>Expiry Date</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {/* {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item.RecordID || index}>
                <td style={styles.td}>{item.SLNO}</td>
                <td style={styles.td}>{item.BatchNo}</td>
                <td style={styles.td}>{item.NameoftheProduct}</td>
                <td style={styles.td}>{item.ManufacturingDate}</td>
                <td style={styles.td}>{item.ExpiryDate}</td>
                <td style={styles.td}>{item.BatchStatus}</td>
                <td style={{ ...styles.td, textAlign: "center" }}>
                  <FaEdit
                    title="Edit"
                    style={{
                      //cursor:item.BatchStatus === "Approved"? "not-allowed": "pointer",
                      //color: item.BatchStatus !== "Approved" ? "#3561c0" : "#ccc",
                       cursor: "pointer",
                       color: "#3468d8",
                      fontSize: "18px",
                      marginRight: "12px",
                    }}
                    //                                       onClick={
                    //   item.BatchStatus !== "Approved"
                    //     ? () => handleEdit(item.RecordID, item.BatchStatus)
                    //     : undefined
                    // }
                    onClick={
                      (PrepareBy === "Y" &&
                        item.BatchStatus === "Yet to be Picked") ||
                      (ReviewBY === "Y" && item.BatchStatus === "Prepared") ||
                      (ApprovedBy === "Y" && item.BatchStatus === "Reviewed")
                        ? () => handleEdit(item.RecordID, item.BatchStatus)
                        : undefined
                    }
                    // onClick={() => handleEdit(item.RecordID, item.BatchStatus)}
                  />
                  <FaPrint
                    title="Print"
                    style={{
                      cursor:
                        item.BatchStatus === "Approved"
                          ? "pointer"
                          : "not-allowed",
                      color:
                        item.BatchStatus === "Approved" ? "#142a58" : "#ccc",
                      fontSize: "18px",
                      opacity: item.BatchStatus === "Approved" ? 1 : 0.5,
                    }}
                    onClick={() => {
                      if (item.BatchStatus === "Approved") {
                        handlePrint(item.RecordID);
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
          )} */}
          {data && data.length > 0 ? (
  data.map((item, index) => {

    const canEdit =
      (PrepareBy === "Y" && item.BatchStatus === "Yet to be Picked") ||
      (ReviewBY === "Y" && item.BatchStatus === "Prepared") ||
      (ApprovedBy === "Y" && item.BatchStatus === "Reviewed");

    const canPrint = item.BatchStatus === "Approved";

    return (
      <tr key={item.RecordID || index}>
        <td style={styles.td}>{item.SLNO}</td>
        <td style={styles.td}>{item.BatchNo}</td>
        <td style={styles.td}>{item.NameoftheProduct}</td>
        <td style={styles.td}>{item.ManufacturingDate}</td>
        <td style={styles.td}>{item.ExpiryDate}</td>
        <td style={styles.td}>{item.BatchStatus}</td>

        <td style={{ ...styles.td, textAlign: "center" }}>
          
          {/* ✅ EDIT */}
          <FaEdit
            title="Edit"
            style={{
              cursor: canEdit ? "pointer" : "not-allowed",
              color: canEdit ? "#3468d8" : "#ccc",
              fontSize: "18px",
              marginRight: "12px",
              pointerEvents: canEdit ? "auto" : "none"
            }}
            onClick={
              canEdit
                ? () => handleEdit(item.RecordID, item.BatchStatus)
                : undefined
            }
          />

          {/* ✅ PRINT */}
          <FaPrint
            title="Print"
            style={{
              // cursor: canPrint ? "pointer" : "not-allowed",
              // color: canPrint ? "#142a58" : "#ccc",
               cursor:  "pointer" ,
              color: "#142a58" ,
              fontSize: "18px",
              //opacity: canPrint ? 1 : 0.5,
              //pointerEvents: canPrint ? "auto" : "none"
               opacity: 1 ,
              pointerEvents: "auto" 
            }}
            // onClick={
            //   canPrint
            //     ? () => handlePrint(item.RecordID)
            //     : undefined
            // }
            onClick={
               () => handlePrint(item.RecordID)
            }
          />

        </td>
      </tr>
    );
  })
) : (
  <tr>
    <td colSpan="7" style={{ ...styles.td, textAlign: "center" }}>
      No Data Found
    </td>
  </tr>
)}
        </tbody>
      </table>
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

export default SOPDocuments;
