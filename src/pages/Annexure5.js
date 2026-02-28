import React, { useState } from "react";
import { Box, Paper, IconButton } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import Sidebar from "../components/Sidebar";

function Annexure5() {
  const [rows, setRows] = useState(Array(10).fill({}));

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Paper
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "950px",
              border: "2px solid black",
              padding: "10px",
              fontFamily: "Times New Roman",
              fontSize: "14px",
            }}
          >
            {/* TABLE */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid black",
              }}
              border="1"
            >
              <thead>
                <tr
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    padding: "4px",
                    border: "1px solid black",
                  }}
                >
                  <td style={{ width: "5%" }}>S.No.</td>
                  <td style={{ width: "21%" }}>Document Name</td>
                  <td style={{ width: "15%" }}>Document Number</td>
                  <td style={{ width: "8%" }}>Requested date</td>
                  <td style={{ width: "7%" }}>No. of Copies issued</td>
                  <td style={{ width: "8%" }}>
                    Issued By
                    <br />
                    (Sign and Date)
                  </td>
                  <td style={{ width: "9%" }}>
                    Received by
                    <br />
                    (Sign and Date)
                  </td>
                  <td style={{ width: "7%" }}>No. of Copies Retrived</td>
                  <td style={{ width: "10%" }}>
                    Retrived and destructed by
                    <br />
                    (Sign and Date)
                  </td>
                  <td style={{ width: "5%" }}>Remarks</td>
                </tr>
              </thead>

              <tbody>
                {rows.map((_, index) => (
                  <tr key={index}>
                    <td align="center">{index + 1}</td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        type="date"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        type="number"
                        min="0"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                        onWheel={(e) => e.target.blur()}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        type="number"
                        min="0"
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                        onWheel={(e) => e.target.blur()}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>

                    <td
                      style={{
                        padding: "4px",
                        border: "1px solid black",
                      }}
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* FOOTER */}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
              }}
            >
              <span>Form no. QA-GNL-003/FV-20</span>
              <span>Page 1 of 1</span>
            </div>
          </div>
        </Paper>
      </Box>
    </Box>
  );
}

export default Annexure5;
