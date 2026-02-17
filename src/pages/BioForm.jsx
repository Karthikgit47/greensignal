import React from "react";
import { useState, useEffect } from "react";


function AddForm() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
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

    cell: {
      border: "1px solid black",
      padding: isMobile ? "4px" : "6px",
      wordBreak: "break-word",
    },

    header: {
      border: "1px solid black",
      padding: isMobile ? "4px" : "6px",
      textAlign: "center",
      fontWeight: "bold",
    },

    input: {
      width: "100%",
      border: "none",
      outline: "none",
      fontFamily: "Times New Roman, serif",
      fontSize: isMobile ? "11px" : "14px",
    },

    bold: {
      fontWeight: "bold",
    },

    center: {
      textAlign: "center",
    },
  };



  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        {/* Top Table */}
        <table style={{ ...styles.table, marginBottom: "20px" }}>
          <tbody>
            {/* Row 1 */}
            <tr>
              {/* Name of Product */}
              <td style={{ ...styles.cell, width: "35%" }}>
                <b>Name of the Product</b>
              </td>

              <td style={{ ...styles.cell, width: "30%" }}>
                <input type="text" style={styles.input} />
              </td>

              {/* IP */}
              <td style={{ ...styles.cell, width: "5%", textAlign: "center" }}>
                <b>IP</b>
                <br />
                <input type="checkbox" />
              </td>

              {/* BP */}
              <td style={{ ...styles.cell, width: "5%", textAlign: "center" }}>
                <b>BP</b>
                <br />
                <input type="checkbox" />
              </td>

              {/* Batch No */}
              <td style={{ ...styles.cell, width: "25%" }}>
                <b>Batch No</b>
                <br />
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td style={styles.cell}>
                <b>Manufacturing Date</b>
              </td>

              <td style={styles.cell}>
                <input type="date" style={styles.input} />
              </td>

              <td colSpan="2" style={styles.cell}></td>

              <td style={styles.cell}>
                <b>Expiry Date</b>
                <br />
                <input type="date" style={styles.input} />
              </td>
            </tr>
          </tbody>
        </table>


        {/* Main Data Table */}
        <table style={{ ...styles.table, marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ ...styles.header, width: "8%" }}>S. No</th>
              <th style={{ ...styles.header, width: "72%" }}>Description</th>
              <th style={{ ...styles.header, width: "20%" }}>
                Number of Vials
              </th>
            </tr>
          </thead>

          <tbody>
            {/* 1 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>1</td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Number of Vials Received from Stores (A)
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 2 Group */}
            {[
              "Vial Washing Rejection",
              "Depyrogenation Tunnel Rejection",
              "After Depyrogenation Before Filling Rejection",
              "Filling Rejection",
              "Row by Row Rejection",
              "Lyophilizer Unloading Rejection",
              "Capping Rejection",
              "Visual Inspection Rejection",
              "QC Finished Product Sampling",
              "Labeling Rejection",
            ].map((item, index) => (
              <tr key={index}>
                <td style={{ ...styles.cell, ...styles.center }}>
                  {index === 0 ? "2" : ""}
                </td>
                <td style={styles.cell}>{item}</td>
                <td style={styles.cell}>
                  <input type="text" style={styles.input} />
                </td>
              </tr>
            ))}

            {/* Total Rejections */}
            <tr>
              <td style={styles.cell}></td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Rejections (B)
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 3 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>3</td>
              <td style={styles.cell}>CDL + GMSD Samples</td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            <tr>
              <td style={styles.cell}></td>
              <td style={styles.cell}>Retention Samples</td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            <tr>
              <td style={styles.cell}></td>
              <td style={styles.cell}>Other Samples</td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* Total Samples */}
            <tr>
              <td style={styles.cell}></td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Samples (C)
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 4 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>4</td>
              <td style={styles.cell}>
                Total Rejections and QC Samples (D = B + C)
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 5 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>5</td>
              <td style={styles.cell}>
                Total Number of Vials Ready for Release as per Summary Protocol
                Total = (A) - (D)
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 6 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>6</td>
              <td style={styles.cell}>VVM Rejection</td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 7 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>7</td>
              <td style={styles.cell}>
                Total Number of Vials after VVM Activity
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 8 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>8</td>
              <td style={styles.cell}>Packing Rejection</td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 9 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>9</td>
              <td style={styles.cell}>
                Overall Rejection (E) = (D) + VVM Rejection + Packing Rejection
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* 10 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>10</td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Number of Vials Ready for Release = (A) - (E)
              </td>
              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Approval Section */}
        <table style={{ ...styles.table, marginTop: "25px" }}>
          <thead>
            <tr>
              <th style={{ ...styles.header, width: "25%" }}>Description</th>
              <th style={{ ...styles.header, width: "25%" }}>Prepared By</th>
              <th style={{ ...styles.header, width: "25%" }}>
                Reviewed By (PD)
              </th>
              <th style={{ ...styles.header, width: "25%" }}>
                Approved By (QA)
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Name Row */}
            <tr>
              <td style={{ ...styles.cell, fontWeight: "bold" }}>Name</td>

              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>

            {/* Sign & Date Row */}
            <tr>
              <td style={{ ...styles.cell, fontWeight: "bold" }}>
                Sign & Date
              </td>

              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" style={styles.input} />
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default AddForm;
