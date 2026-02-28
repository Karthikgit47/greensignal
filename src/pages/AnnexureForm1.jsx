import React from "react";

function AnnexureForm1() {
   
    const [isMobile, setIsMobile] = React.useState(
        window.innerWidth < 768
    );

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

   
    const styles = {
        wrapper: {
            padding: isMobile ? "8px" : "30px",
            background: "#f0f2f5",
            display: "flex",
            justifyContent: "center",
        },
        container: {
            width: "100%",
            background: "#fff",
            padding: isMobile ? "8px" : "20px",
            border: "2px solid black",
            fontFamily: "Times New Roman, serif",
            fontSize: isMobile ? "11px" : "14px",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        thtd: {
            border: "1px solid black",
            padding: "10px",
            verticalAlign: "middle",
            fontSize: isMobile ? "11px" : "17px",
            
        },
        inputStyle: {
               width: "100%",
        height: "35px",
        border: "none",
        outline: "none",
        fontFamily: "Times New Roman",
        fontSize: "14px",
        }
    };

  

  
    const [formData, setFormData] = React.useState({
        facility1: false,
        facility2: false,
        sopTitle: "",
        sopNumber: "",
        rows: Array.from({ length: 8 }, () => ({
            sno: "",
            version: "",
            modification: "",
            type: "",
            issuedCopies: "",
            issuedBy: "",
            receivedBy: "",
            retrievedCopies: "",
            destructedBy: "",
            remarks: "",
        })),
    });

    
    const handleRowChange = (index, field, value) => {
        const updatedRows = [...formData.rows];
        updatedRows[index][field] = value;
        setFormData({ ...formData, rows: updatedRows });
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                {/* //  TOP SECTION  */}
                <table style={{ ...styles.table, marginBottom: "20px" }}>
                    <tbody>
                        <tr>
                            <td style={{ ...styles.thtd, width: "15%" }}>
                                <b>Facility:</b>
                            </td>

                            <td style={{ ...styles.thtd, width: "42%" }}>
                                <b>Manufacturing facility-1</b>{" "}
                                <input
                                    type="checkbox"
                                    checked={formData.facility1}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            facility1: e.target.checked,
                                        })
                                    }
                                />
                            </td>

                            <td style={{ ...styles.thtd, width: "43%" }}>
                                <b>Manufacturing facility-2</b>{" "}
                                <input
                                    type="checkbox"
                                    checked={formData.facility2}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            facility2: e.target.checked,
                                        })
                                    }
                                />
                            </td>
                        </tr>

                        {/* SOP Title */}
                        <tr>
                            <td style={{ ...styles.thtd, borderRight: "none" }}>
                                <b>SOP Title:</b>
                            </td>

                            <td
                                colSpan="2"
                                style={{ ...styles.thtd, borderLeft: "none" }}
                            >
                                <input
                                    type="text"
                                    value={formData.sopTitle}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            sopTitle: e.target.value,
                                        })
                                    }
                                    style={styles.inputStyle}
                                />
                            </td>
                        </tr>
                      
                        <tr>
                            <td style={{ ...styles.thtd, borderRight: "none" }}>
                                <b>SOP Number:</b>
                            </td>
                            <td
                                colSpan="2"
                                style={{ ...styles.thtd, borderLeft: "none" }}
                            >
                                <input
                                    type="text"
                                    value={formData.sopNumber}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            sopNumber: e.target.value,
                                        })
                                    }
                                    style={styles.inputStyle}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* MAIN TABLE */}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.thtd, width: "6%", background: "#f2f2f2" }}>SL#</th>
                            <th style={{ ...styles.thtd, width: "8%", background: "#f2f2f2" }}>
                                Version No.
                            </th>
                            <th style={{ ...styles.thtd, width: "10%", background: "#f2f2f2" }}>
                                Modification No.
                            </th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>Type of Copy</th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>No of copies issued</th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>
                                Issued By sign and Date
                            </th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>
                                Received By sign and Date
                            </th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>
                                No. of Copies Retrieved
                            </th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>
                                Retrieved and Destructed By sign and Date
                            </th>
                            <th style={{ ...styles.thtd, background: "#f2f2f2" }}>Remarks</th>
                        </tr>
                    </thead>

                    <tbody>
                        {formData.rows.map((row, index) => (
                            <tr key={index}>
                                <td style={styles.thtd}>
                                    <input
                                        value={row.sno}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "sno",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.version}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "version",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.modification}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "modification",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.type}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "type",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.issuedCopies}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "issuedCopies",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.issuedBy}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "issuedBy",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.receivedBy}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "receivedBy",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.retrievedCopies}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "retrievedCopies",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.destructedBy}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "destructedBy",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>

                                <td style={styles.thtd}>
                                    <input
                                        value={row.remarks}
                                        onChange={(e) =>
                                            handleRowChange(
                                                index,
                                                "remarks",
                                                e.target.value
                                            )
                                        }
                                        style={styles.inputStyle}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AnnexureForm1;