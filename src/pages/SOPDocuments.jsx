import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaArrowRight,FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SOPDocuments() {

    const [data, setData] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/dashboard/add-form/${id}`);
    };
const handleAdd = () => {
    navigate(`/dashboard/add-form/-1`);
};
  


    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {
                    Query: {
                        AccessID: "TR335",
                        ScreenName: "SOPDocuments",
                        Filter: "CompanyID=76",
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
                        <th style={styles.th}>S.No</th>
                        <th style={styles.th}>BatchNo</th>
                        <th style={styles.th}>Name of the Product</th>
                        <th style={styles.th}>Manufacturing Date</th>
                        <th style={styles.th}>Expiry Date</th>
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
                                <td style={{ ...styles.td, textAlign: "center" }}>
                                    {/* Edit Icon */}
                                    <FaEdit
                                        title="Edit"
                                        style={{
                                            cursor: "pointer",
                                            color: "#16a34a",
                                            fontSize: "18px",
                                            marginRight: "12px"
                                        }}
                                        onClick={() => handleEdit(item.RecordID)}
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