import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBookOpen, } from "react-icons/fa";
import { useParams, useLocation } from "react-router-dom";
import { List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";



function ListOfLogNotes() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    const location = useLocation();


    const handleSOPs = (recordId, annexureNo) => {
        // navigate(`/dashboard/sop-documents/${recordId}`);

          navigate(`/dashboard/sop-documents/${recordId}`,{state: { SopName: sopName,
        SopID: SopId,
        DocumentName: documentName,
        DocumentID: documentId,
    AnnexureNo: annexureNo,}})
    }

    const sopName = location.state?.SopName || "Documents";
    const SopId= location.state?.SopID || id;
    const documentName = location.state?.DocumentName || "Documents";
    const documentId = location.state?.DocumentID || id;



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

                const filter = `CompanyID='${companyId}' AND SopDocumentListID='${sopId}'`;

                const payload = {
                    Query: {
                        AccessID: "TR339",
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
                            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
                        },
                    }
                );

                console.log("Log Notes API Response:", response.data);

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
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "10px",

                }}
            >
                <h3 >
                    <span
                        style={{ cursor: "pointer", }}
                        onClick={() => navigate(`/dashboard/list-of-sops`)}
                    >
                        List of SOPs
                    </span>
                </h3>
                <span>/</span>
                <h3 >
                    <span
                        style={{ cursor: "pointer", }}
                        onClick={() => navigate(`/dashboard/list-of-documents/${SopId}`,{state: { Description: sopName }})}
                    >
                        {sopName}
                    </span>
                </h3>

                <span>/</span>

                <h3 >
                    <span
                        style={{ cursor: "pointer", }}
                    // onClick={() => navigate(`/dashboard/list-of-log-notes/${id}`)}
                    >
                        {documentName}
                    </span>
                </h3>
            </div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>#</th>
                        <th style={styles.th}>Annexure No</th>
                        <th style={styles.th}>Request Date</th>
                        <th style={styles.th}>No Of Copy Issue </th>
                        <th style={styles.th}>Issue LogBook# </th>
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
                                <td style={{ ...styles.td, width: "120px" }}>{item.AnnexureNo}</td>
                                <td style={styles.td}>{item.RequestDate}</td>
                                <td style={styles.td}>{item.NoOfCopyIssue}</td>
                                <td style={styles.td}>{item.IssueLogBookNo}</td>
                                <td style={{ ...styles.td, textAlign: "center" }}>
                                    <FaArrowRight
                                        style={{
                                            cursor: "pointer",
                                            color: "#254da8",
                                            fontSize: "18px",
                                            opacity: 1,
                                        }}
                                        onClick={() => {
                                            handleSOPs(item.RecordID, item.AnnexureNo);
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

export default ListOfLogNotes;