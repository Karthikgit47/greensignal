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

    const handleEdit = (id) => {
        navigate(`/dashboard/add-form/${id}/edit`);
    };

    const handlePrint = (id) => {
        navigate(`/dashboard/add-form/${id}/print`);
    };
    const handleAdd = () => {
        navigate(`/dashboard/add-form/-1`);
    };

    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedUser = sessionStorage.getItem("username");
        console.log("Fetching and User:", storedUser);
        if (storedUser) {
            setUsername(storedUser);
        }
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUser = sessionStorage.getItem("username");
                console.log("Fetching and User:", storedUser);
                let Filter = "CompanyID=76";
                if (storedUser == "Kabilan") {
                    Filter += " AND BatchStatus='Prepared'";
                }
                if (storedUser == "Nk") {
                    Filter += " AND BatchStatus='Ready'";
                }
                if (storedUser == "Cal") {
                    Filter += " AND BatchStatus IN ('Reviewed', 'Approved')";

                }
                const payload = {
                    Query: {
                        AccessID: "TR335",
                        ScreenName: "SOPDocuments",
                        Filter: Filter,
                        Any: ""
                    }
                };

                const response = await axios.get(
                    "https://bosuat.beyondexs.com/api/wslistview_mysql.php",
                    {
                        params: {
                            data: JSON.stringify(payload)
                        },
                        headers: {
                            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50"
                        }
                    }
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
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px"
            }}>
                <h3>List of SOPs</h3>

                <FaPlus
                    title="Add Product"
                    style={{
                        cursor: "pointer",
                        color: "#2563eb",
                        fontSize: "20px"
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
                    {data && data.length > 0 ? (
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
                                             cursor: item.BatchStatus === "Approved" ? "not-allowed" : "pointer",
                                              color: item.BatchStatus !== "Approved" ? "#3561c0" : "#ccc",
                                            // cursor: "pointer",
                                            // color: "#3468d8",
                                            fontSize: "18px",
                                            marginRight: "12px"
                                        }}
                                        onClick={() => handleEdit(item.RecordID)}
                                    />
                                    <FaPrint
                                        title="Print"
                                        style={{
                                            cursor: item.BatchStatus === "Approved" ? "pointer" : "not-allowed",
                                            color: item.BatchStatus === "Approved" ? "#142a58" : "#ccc",
                                            fontSize: "18px",
                                            opacity: item.BatchStatus === "Approved" ? 1 : 0.5
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