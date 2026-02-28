
import React from "react";

function AnnexureForm3() {

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
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                        tableLayout: "fixed", // important for width control
                    }}
                >
                    <thead>
                        <tr>
                            {[
                                "SL#",
                                "Document No.",
                                "Document Title",
                                "Obsoleted By Sign and Date",
                                "Retention Period (MM/YY)",
                                "Destructed By Sign and Date",
                                "Remarks",
                            ].map((heading, index) => (
                                <th
                                    key={index}
                                    style={{
                                        border: "1px solid black",
                                        padding: "8px",
                                        fontSize: "18px",
                                        background: "#f2f2f2",
                                        width:
                                            index === 0 ? "5%" :
                                                index === 1 ? "12%" :
                                                    index === 2 ? "18%" :
                                                        index === 3 ? "20%" :
                                                            index === 4 ? "10%" :
                                                                index === 5 ? "20%" :
                                                                    "15%",
                                    }}
                                >
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 11 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 7 }).map((_, colIndex) => (
                                    <td
                                        key={colIndex}
                                        style={{
                                            border: "1px solid black",
                                            padding: "12px",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                outline: "none",
                                                fontFamily: "Times New Roman",
                                                fontSize: "14px",
                                            }}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AnnexureForm3;