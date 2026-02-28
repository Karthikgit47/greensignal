import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  FaEdit,
  FaArrowRight,
  FaWpforms,
  FaTimesCircle,
  FaCopy,
  FaPrint,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaE } from "react-icons/fa6";

function SOPDocuments() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  console.log("loction",location)
  const sopName = location.state?.SopName || "Documents";
  const SopId = location.state?.SopID || id;
  const documentName = location.state?.DocumentName || "Documents";
  const documentId = location.state?.DocumentID || id;
  const AnnexureNo = location.state?.AnnexureNo || null;
  const LogNoteID = location.state?.LogNoteID || location.state?.DocumentIssuedID||null;

  const handleEdit = (id, batchStatus, docid,mode) => {
    navigate(`/dashboard/add-form/${id}/${mode}`, {
      state: {
        BatchStatus: batchStatus,
        DocumentIssuedID: docid,
        SopID: SopId,
        SopName: sopName,
        DocumentName: documentName,
        DocumentID: documentId,
        AnnexureNo: AnnexureNo,
      },
    });
  };

  const handlePrint = (id,batchStatus, docid) => {
    navigate(`/dashboard/add-form/${id}/print`, {
      state: {
        Batchtatus: batchStatus,
        DocumentIssuedID: docid,
        SopID: SopId,
        SopName: sopName,
        DocumentName: documentName,
        documentId: documentId,
        AnnexureNo: AnnexureNo,
      },
    });
  };

  const handleStrike = (id,batchStatus, docid) => {
    navigate(`/dashboard/add-form/${id}/strike`, {
      state: {
        BatchStatus: batchStatus,
        DocumentIssuedID: docid,
        SopID: SopId,
        SopName: sopName,
        DocumentName: documentName,
        documentId: documentId,
        AnnexureNo: AnnexureNo,
      },
    });
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
      setLoading(true);
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
        // let Filter1 = `CompanyID=${parsedUser.Data.EMP_CMRECID} AND SOPID=${id}`;
        let Filter1 = `CompanyID=${parsedUser.Data.EMP_CMRECID} AND DocumentIssuedID =${id}`;

        let Filter = `CompanyID=${parsedUser.Data.EMP_CMRECID} AND (Preparedby =${parsedUser.Data.EMP_RECID} OR Approvdby =${parsedUser.Data.EMP_RECID} OR ReviewedBy=${parsedUser.Data.EMP_RECID})`;
        let statuses = [];

        if (PrepareBy === "Y") {
          statuses.push("'Picked','Prepared'");
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
      } finally {
        setLoading(false); // stop loading
      }
    };

    fetchData();
  }, []);

  // For pagination

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // how many numbers visible in middle

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start < maxVisible - 1) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    // Show first page
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Show last page
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div style={{ padding: "4px" }}>
      <style>{spinnerKeyframes}</style>
      {/* Top Header Section */}
      {/* <div
        style={{
          display: "flex",
          //justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          gap: "6px",
        }}
      >
        <h3>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/dashboard/list-of-sops`)}
          >
            List of SOPs
          </span>
        </h3>

        <span>/</span>
        <h3>
          <span
            style={{ cursor: "pointer" }}
            // onClick={() => navigate(`/dashboard/list-of-log-notes/${id}`)}
          >
            List of Log Notes
          </span>
        </h3>

        {/* <FaPlus
          title="Add Product"
          style={{
            cursor: "pointer",
            color: "#2563eb",
            fontSize: "20px",
          }}
          onClick={handleAdd}
        /> */}
      {/* <FaWpforms
          //onClick={() => navigate('/dashboard/annexure-form-1')}
          onClick={() => navigate("/dashboard/form-list")}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            color: "#007bff",
            marginRight: "30px"
          }}
        /> 
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "10px",
        }}
      >
        <h3>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/dashboard/list-of-sops`)}
          >
            List of SOPs
          </span>
        </h3>
        <span>/</span>
        <h3>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/dashboard/list-of-documents/${SopId}`, {
                state: { Description: sopName },
              })
            }
          >
            {sopName}
          </span>
        </h3>

        <span>/</span>

        <h3>
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate(`/dashboard/list-of-log-notes/${LogNoteID}`, {
                state: {
                  SopName: sopName,
                  SopID: SopId,
                  DocumentName: documentName,
                  DocumentID: documentId,
                },
              })
            }

            //          navigate(`/dashboard/list-of-log-notes/${recordId}`, {
            //   state: {
            //     SopName: sopName,
            //     SopID: id,
            //     DocumentName: documentName,
            //     DocumentID: recordId,
            //   },
            // });
          >
            {documentName}
          </span>
        </h3>
        <span>/</span>

        <h3>
          <span
            style={{ cursor: "pointer" }}
            // onClick={() => navigate(`/dashboard/list-of-log-notes/${id}`)}
          >
            {AnnexureNo}
          </span>
        </h3>
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
          {loading ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                <div style={spinnerStyle}></div>
              </td>
            </tr>
          ) : currentRows.length > 0 ? (
            currentRows.map((item, index) => {
              const canEdit =
                (PrepareBy === "Y" && item.BatchStatus === "Picked") ||
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
                        pointerEvents: canEdit ? "auto" : "none",
                      }}
                      onClick={
                        canEdit
                          ? () =>
                              handleEdit(
                                item.RecordID,
                                item.BatchStatus,
                                item.DocumentIssuedID,
                                "edit"
                              )
                          : undefined
                      }
                    />

                    <FaTimesCircle
                      title={
                        item.IsStrike === "Y" ? "Already Striked" : "Strike"
                      }
                      style={{
                        cursor:
                          item.IsStrike === "N" ? "pointer" : "not-allowed",
                        color: item.IsStrike === "N" ? "#7ca3f7" : "#ccc",
                        fontSize: "18px",
                        marginRight: "12px",
                      }}
                      onClick={
                        item.IsStrike === "N"
                          // ? () => handleStrike(item.RecordID)
                          // : undefined
                          ?() =>
                              handleEdit(
                                item.RecordID,
                                item.BatchStatus,
                                item.DocumentIssuedID,
                                "strike"
                              )
                          : undefined
                      }
                    />

                    {/* ✅ PRINT */}
                    <FaPrint
                      title="Print"
                      style={{
                        // cursor: canPrint ? "pointer" : "not-allowed",
                        // color: canPrint ? "#142a58" : "#ccc",
                        cursor: "pointer",
                        color: "#142a58",
                        fontSize: "18px",
                        //opacity: canPrint ? 1 : 0.5,
                        //pointerEvents: canPrint ? "auto" : "none"
                        opacity: 1,
                        pointerEvents: "auto",
                      }}
                      // onClick={
                      //   canPrint
                      //     ? () => handlePrint(item.RecordID)
                      //     : undefined
                      // }
                      // onClick={() => handlePrint(item.RecordID)}
                      onClick={() =>
                              handleEdit(
                                item.RecordID,
                                item.BatchStatus,
                                item.DocumentIssuedID,
                                "print"
                              )
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

      {/* For pagination */}

      {data.length > 0 && (
        <>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: currentPage === 1 ? "#f0f0f0" : "#ffffff",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                fontWeight: "500",
              }}
            >
              ◀
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span key={index} style={{ padding: "0 8px" }}>
                    ...
                  </span>
                );
              }

              const isActive = currentPage === page;

              return (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  style={{
                    minWidth: "35px",
                    height: "35px",
                    borderRadius: "6px",
                    border: isActive ? "1px solid #003366" : "1px solid #ddd",
                    backgroundColor: isActive ? "#003366" : "#ffffff",
                    color: isActive ? "#fff" : "#333",
                    fontWeight: isActive ? "bold" : "normal",
                    cursor: "pointer",
                  }}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor:
                  currentPage === totalPages ? "#f0f0f0" : "#ffffff",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                fontWeight: "500",
              }}
            >
              ▶
            </button>
          </div>

          {/* Record Info */}
          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "13px",
              color: "#555",
            }}
          >
            Showing <b>{indexOfFirstRow + 1}</b> –
            <b>{Math.min(indexOfLastRow, data.length)}</b> of{" "}
            <b>{data.length}</b> records
          </div>
        </>
      )}
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
