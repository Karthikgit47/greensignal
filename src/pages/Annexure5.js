import React from "react";

function AnnexureForm5() {
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
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "1000px", // important for scroll on mobile
    },
    thtd: {
      border: "1px solid black",
      padding: isMobile ? "5px" : "8px",
      textAlign: "center",
      verticalAlign: "middle",
    },
    input: {
      width: "100%",
      border: "none",
      outline: "none",
      fontFamily: "Times New Roman",
      fontSize: isMobile ? "11px" : "14px",
      background: "transparent",
    },
  };

  const [rows, setRows] = React.useState(
    Array.from({ length: 8 }, () => ({
      documentName: "",
      documentNumber: "",
      requestedDate: "",
      issuedCopies: "",
      issuedBy: "",
      receivedBy: "",
      retrievedCopies: "",
      destructedBy: "",
      remarks: "",
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <table style={styles.table}>
          <thead>
            <tr style={{ background: "#f2f2f2", fontWeight: "bold" }}>
              <th style={styles.thtd}>S.No.</th>
              <th style={styles.thtd}>Document Name</th>
              <th style={styles.thtd}>Document Number</th>
              <th style={styles.thtd}>Requested Date</th>
              <th style={styles.thtd}>No. of Copies Issued</th>
              <th style={styles.thtd}>
                Issued By <br />(Sign & Date)
              </th>
              <th style={styles.thtd}>
                Received By <br />(Sign & Date)
              </th>
              <th style={styles.thtd}>No. of Copies Retrieved</th>
              <th style={styles.thtd}>
                Retrieved & Destructed By <br />(Sign & Date)
              </th>
              <th style={styles.thtd}>Remarks</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={styles.thtd}>{index + 1}</td>

                <td style={styles.thtd}>
                  <input
                    value={row.documentName}
                    onChange={(e) =>
                      handleChange(index, "documentName", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    value={row.documentNumber}
                    onChange={(e) =>
                      handleChange(index, "documentNumber", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    type="date"
                    value={row.requestedDate}
                    onChange={(e) =>
                      handleChange(index, "requestedDate", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    type="number"
                    value={row.issuedCopies}
                    onChange={(e) =>
                      handleChange(index, "issuedCopies", e.target.value)
                    }
                    style={styles.input}
                    onWheel={(e) => e.target.blur()}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    value={row.issuedBy}
                    onChange={(e) =>
                      handleChange(index, "issuedBy", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    value={row.receivedBy}
                    onChange={(e) =>
                      handleChange(index, "receivedBy", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    type="number"
                    value={row.retrievedCopies}
                    onChange={(e) =>
                      handleChange(index, "retrievedCopies", e.target.value)
                    }
                    style={styles.input}
                    onWheel={(e) => e.target.blur()}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    value={row.destructedBy}
                    onChange={(e) =>
                      handleChange(index, "destructedBy", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>

                <td style={styles.thtd}>
                  <input
                    value={row.remarks}
                    onChange={(e) =>
                      handleChange(index, "remarks", e.target.value)
                    }
                    style={styles.input}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: isMobile ? "10px" : "12px",
          }}
        >
          <span>Form no. QA-GNL-003/FV-20</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

export default AnnexureForm5;