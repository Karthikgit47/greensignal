import React from "react";

function AnnexureForm2() {
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
        inputStyle: {
            width: "100%",
            height: "35px",
            border: "none",
            outline: "none",
            fontFamily: "Times New Roman",
            fontSize: "14px",
        }
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <table style={{ ...styles.table, marginBottom: "20px" }}>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid black", fontSize: "17px", borderRight: "none", padding: "10px", }}>
                                <b>SOP Title:</b>
                            </td>
                            <td
                                colSpan="2"
                                style={{ border: "1px solid black", borderLeft: "none", padding: "10px" }}
                            >
                                <input type="text" style={{ ...styles.inputStyle, width: "60%" }} />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ border: "1px solid black", fontSize: "17px", borderRight: "none", padding: "10px", width: "15%" }}>
                                <b>SOP Number:</b>
                            </td>
                            <td
                                colSpan="2"
                                style={{ border: "1px solid black",  borderLeft: "none", padding: "10px" }}
                            >
                                <input type="text" style={styles.inputStyle} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* ================= ANNEXURE TABLE ================= */}

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            {[
                                "SL#",
                                "Annexure No.",
                                "Requested Date",
                                "No. of Copies Issued",
                                "Issued Logbook No.",
                                "Issued By (Sign and Date)",
                                "Received By (Sign and Date)",
                                "Additional Info",
                            ].map((heading, index) => (
                                <th
                                    key={index}
                                    style={{
                                        border: "1px solid black",
                                         background: "#f2f2f2",
                                        padding: "8px",
                                        fontSize: "18px",
                                        width: index === 0 ? "5%" : index === 1 ? "7%" : "auto"                                    }}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 10 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 8 }).map((_, colIndex) => (
                                    <td
                                        key={colIndex}
                                        style={{
                                            border: "1px solid black",
                                            padding: "10px",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                outline: "none",
                                                fontFamily: "Times New Roman",
                                                fontSize: "13px",
                                            }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Remarks Row Inside Same Table */}
                        <tr>
                            <td
                                colSpan="8"
                                style={{
                                    border: "1px solid black",
                                    padding: "10px",
                                }}
                            >
                                <b>Remarks:</b>{" "}
                                <input
                                    type="text"
                                    style={{
                                        width: "70%",
                                        marginLeft: "15px",
                                        border: "none",
                                        outline: "none",
                                        fontFamily: "Times New Roman",
                                        fontSize: "17px",
                                    }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    );
}

export default AnnexureForm2;