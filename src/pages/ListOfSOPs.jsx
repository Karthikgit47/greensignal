import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ListOfSOPs() {


    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/dashboard/sop-documents/${id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const payload = {
                    Query: {
                        AccessID: "TR337",
                        ScreenName: "List Of SOPs",
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
        <table style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>S.No</th>
                    <th style={styles.th}>Code</th>
                    <th style={styles.th}>Description</th>
                    <th style={styles.th}>Action </th>
                </tr>
            </thead>

            <tbody>
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={item.RecordID || index}>
                            <td style={styles.td}>{item.SLNO}</td>
                            <td style={styles.td}>{item.Code}</td>
                            <td style={styles.td}>{item.Description}</td>
                            <td style={{ ...styles.td, textAlign: "center" }}>
                                <FaArrowRight
                                    style={{
                                        cursor: item.IsEnable === "Y" ? "pointer" : "not-allowed",
                                        color: item.IsEnable === "Y" ? "#254da8" : "#ccc",
                                        fontSize: "18px",
                                        opacity: item.IsEnable === "Y" ? 1 : 0.5
                                    }}
                                    onClick={() => {
                                        if (item.IsEnable === "Y") {
                                            handleView(item.RecordID);
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

export default ListOfSOPs;