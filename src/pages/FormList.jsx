import { useNavigate } from "react-router-dom";


function FormList() {
    const navigate = useNavigate();

    const forms = [
        {
            name: "DOCUMENT ISSUE AND RECEIPT FORM FOR SOP",
            path: "/dashboard/annexure-form-1",
        },
        {
            name: "DOCUMENT ISSUE AND RECEIPT FORM FOR ANNEXURE",
            path: "/dashboard/annexure-form-2",
        },
        {
            name: "OBSOLETION AND DESTRUCTION LOGBOOK",
            path: "/dashboard/annexure-form-3",
        },
        {
            name: "UNCONTROLLED COPY DISTRIBUTION LOG",
            path: "/dashboard/annexure-form-4", // create if exists
        },
        {
            name: "DOCUMENT ISSUE AND RECEIPT FORM FOR OTHER THAN SOP AND ANNEXURE",
            path: "/dashboard/annexure5", // create if exists
        },
        {
            name: "DOCUMENT ISSUE AND RECEIPT FORM FOR PROTOCOL AND REPORT",
            path: "/dashboard/annexure6",
        }
    ];

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
    }
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <h3>List of Forms</h3></div>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>S.No</th>
                        <th style={styles.th}>Form Name</th>
                        <th style={styles.th}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {forms.map((form, index) => (
                        <tr key={index}>
                            {/* Serial Number */}
                            <td style={styles.td}>{index + 1}</td>

                            {/* Form Name */}
                            <td style={{ ...styles.td, textAlign: "left", paddingLeft: "10px" }}>
                                {form.name}
                            </td>

                            {/* Action Button */}
                            <td style={styles.td}>
                                <button
                                    style={{
                                        padding: "5px 12px",
                                        borderRadius: "5px",
                                        border: "none",
                                        backgroundColor: "#003366",
                                        color: "#fff",
                                        cursor: "pointer",
                                    }}
                                   onClick={() => navigate(form.path)}
                                >
                                    Open
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormList;