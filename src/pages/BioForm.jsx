import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function AddForm() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [data, setData] = useState({});
  const { id } = useParams();
 const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    NameoftheProduct: "",
    ManufacturingDate: "",
    IP: "",
    BP: "",
    BatchNo: "",
    ExpiryDate: "",
    Description: "",
    NumberofVials: "",

    DepyrogenationTunnelRejection: "",
    AfterDepyrogenationBeforeFillingRejection: "",
    FillingRejection: "",
    VialWashingRejection: "",
    LyophilizerUnloadingRejection: "",
    CappingRejection: "",
    VisualInspectionRejection: "",
    QCFinishedProductSampling: "",
    LabellingRejection: "",
    CDLaddGMSDSamples: "",
    RetentionSamples: "",
    OtherSamples: "",
    VVMRejection: "",
    TotalNumberofVialsafterVVMActivity: "",
    PackingRejection: "",
    OverallRejection: "",

    SOPID: "",
    TotalNoOfVialsReceived: "",
    TotalRejections: "",
    TotalSamples: "",
    TotalRejectionsAndQCSamples: "",
    TotalVialsReadySummary: "",
    TotalVialsRelease: "",

    PreparedName: "",
    PreparedBy: "",
    PreparedDate: "",
    ReviewedBy: "",
    ReviewedDate: "",
    ApprovdBy: "",
    ApprovdDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          accessid: "TR335",
          action: "get",
          recid: id

        };

        const response = await axios.post(
          "https://bosuat.beyondexs.com/api/APIController.php", payload,
          {
            // params: {
            //   data: JSON.stringify(payload)
            // },
            headers: {
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50"
            }
          }
        );

        console.log("API Response:", response.data);
        setData(response.data?.Data || {});

        if (response.data?.Data) {
          setFormData(prev => ({
            ...prev,
            ...response.data.Data
          }));
        }

      } catch (error) {
        console.error(error.response || error);
      }
    };

    fetchData();
  }, []);


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

  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

 const handleSave = async () => {
  try {
    const payload = {
      accessid: "TR335",
      action: id==-1 ? "insert" : "update",
      data: {
        RecordID: id,
        CompanyID: "76",
        NameoftheProduct: formData.NameoftheProduct || "",
        ManufacturingDate: formData.ManufacturingDate || null,
        IP: formData.IP || "",
        BP: formData.BP || "",
        BatchNo: formData.BatchNo || "",
        ExpiryDate: formData.ExpiryDate || null,
        Description: formData.Description || "",
        NumberofVials: Number(formData.NumberofVials) || 0,
        DepyrogenationTunnelRejection: Number(formData.DepyrogenationTunnelRejection) || 0,
        AfterDepyrogenationBeforeFillingRejection: Number(formData.AfterDepyrogenationBeforeFillingRejection) || 0,
        FillingRejection: Number(formData.FillingRejection) || 0,
        VialWashingRejection: Number(formData.VialWashingRejection) || 0,
        LyophilizerUnloadingRejection: Number(formData.LyophilizerUnloadingRejection) || 0,
        CappingRejection: Number(formData.CappingRejection) || 0,
        VisualInspectionRejection: Number(formData.VisualInspectionRejection) || 0,
        QCFinishedProductSampling: Number(formData.QCFinishedProductSampling) || 0,
        LabellingRejection: Number(formData.LabellingRejection) || 0,
        CDLaddGMSDSamples: Number(formData.CDLaddGMSDSamples) || 0,
        RetentionSamples: Number(formData.RetentionSamples) || 0,
        OtherSamples: Number(formData.OtherSamples) || 0,
        VVMRejection: Number(formData.VVMRejection) || 0,
        TotalNumberofVialsafterVVMActivity: Number(formData.TotalNumberofVialsafterVVMActivity) || 0,
        PackingRejection: Number(formData.PackingRejection) || 0,
        OverallRejection: Number(formData.OverallRejection) || 0,
        TotalNoOfVialsReceived: Number(formData.TotalNoOfVialsReceived) || 0,
        TotalRejections: Number(formData.TotalRejections) || 0,
        TotalSamples: Number(formData.TotalSamples) || 0,
        TotalRejectionsAndQCSamples: Number(formData.TotalRejectionsAndQCSamples) || 0,
        TotalVialsReadySummary: Number(formData.TotalVialsReadySummary) || 0,
        TotalVialsRelease: Number(formData.TotalVialsRelease) || 0,
        BatchStatus: formData.BatchStatus || "",
        RowbyRowRejection: Number(formData.RowbyRowRejection) || 0,
        SOPID: 1,
        PreparedBy: Number(formData.PreparedBy) || 0,
        ReviewedBy: Number(formData.ReviewedBy) || 0,
        ApprovdBy: Number(formData.ApprovdBy) || 0,
        PreparedDate: formData.PreparedDate || null,
        ReviewedDate: formData.ReviewedDate || null,
        ApprovdDate: formData.ApprovdDate || null
      }
    };

    const response = await axios.post(
      "https://bosuat.beyondexs.com/api/APIController.php",
      payload,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Response:", response.data);
    alert("Data saved successfully!");
     navigate(`/dashboard/sop-documents/${id}`);
  } catch (error) {
    console.error("Save error:", error.response?.data || error);
    alert("Error saving data! Check console for details.");
  }
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
                <input
                  style={styles.input}
                  type="text"
                  name="NameoftheProduct"
                  value={formData.NameoftheProduct || ""}
                  onChange={handleChange}
                />
              </td>

              {/* IP */}
              <td style={{ ...styles.cell, width: "5%", textAlign: "center" }}>
                <b>IP</b>
                <br />
                <input
                  type="checkbox"
                  name="IP"
                  value="I"
                  checked={formData.IP === "I"}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      IP: e.target.checked ? "I" : ""
                    }))
                  }
                />
              </td>

              {/* BP */}
              <td style={{ ...styles.cell, width: "5%", textAlign: "center" }}>
                <b>BP</b>
                <br />
                <input
                  type="checkbox"
                  name="BP"
                  value="B"
                  checked={formData.BP === "B"}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      BP: e.target.checked ? "B" : ""
                    }))
                  }
                />
              </td>

              {/* Batch No */}
              <td style={{ ...styles.cell, width: "25%" }}>
                <b>Batch No</b>
                <br />
                <input type="text" style={styles.input}
                  name="BatchNo"
                  value={formData.BatchNo || ""}
                  onChange={handleChange} />
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td style={styles.cell}>
                <b>Manufacturing Date</b>
              </td>

              <td style={styles.cell}>
                <input
                  style={styles.input}
                  type="date"
                  name="ManufacturingDate"
                  value={formData.ManufacturingDate || ""}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData(prev => ({
                      ...prev,
                      ManufacturingDate: value,
                      ExpiryDate: ""
                    }));
                  }}
                />
              </td>

              <td colSpan="2" style={styles.cell}></td>

              <td style={styles.cell}>
                <b>Expiry Date</b>
                <br />
                <input
                  style={styles.input}
                  type="date"
                  name="ExpiryDate"
                  value={formData.ExpiryDate || ""}
                  min={formData.ManufacturingDate || ""}
                  onChange={(e) =>
                    setFormData(prev => ({
                      ...prev,
                      ExpiryDate: e.target.value
                    }))
                  }
                />
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
                <input type="number" style={styles.input}
                  name="NumberofVials"
                  value={formData.NumberofVials || ""}
                  onChange={handleChange} />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>2</td>
              <td style={styles.cell}>Vial Washing Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="VialWashingRejection"
                  value={formData.VialWashingRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Depyrogenation Tunnel Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="DepyrogenationTunnelRejection"
                  value={formData.DepyrogenationTunnelRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>After Depyrogenation Before Filling Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="AfterDepyrogenationBeforeFillingRejection"
                  value={formData.AfterDepyrogenationBeforeFillingRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Filling Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="FillingRejection"
                  value={formData.FillingRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Row by Row Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="RowbyRowRejection"
                  value={formData.RowbyRowRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Lyophilizer Unloading Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="LyophilizerUnloadingRejection"
                  value={formData.LyophilizerUnloadingRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Capping Rejection </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="CappingRejection"
                  value={formData.CappingRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Visual Inspection Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="VisualInspectionRejection"
                  value={formData.VisualInspectionRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>QC Finished Product Sampling</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="QCFinishedProductSampling"
                  value={formData.QCFinishedProductSampling || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={{ ...styles.cell, ...styles.center }}></td>
              <td style={styles.cell}>Labeling Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="LabellingRejection"
                  value={formData.LabellingRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>


            {/* Total Rejections */}
            <tr>
              <td style={styles.cell}></td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Rejections (B)
              </td>
              <td style={styles.cell}>
                <input type="number" style={styles.input} />
              </td>
            </tr>

            {/* 3 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>3</td>
              <td style={styles.cell}>CDL + GMSD Samples</td>
              <td style={styles.cell}>
                <input type="number"
                  name="CDLaddGMSDSamples"
                  value={formData.CDLaddGMSDSamples || ""}
                  onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            <tr>
              <td style={styles.cell}></td>
              <td style={styles.cell}>Retention Samples</td>
              <td style={styles.cell}>
                <input type="number"
                  name="RetentionSamples"
                  value={formData.RetentionSamples || ""}
                  onChange={handleChange} style={styles.input} />

              </td>
            </tr>

            <tr>
              <td style={styles.cell}></td>
              <td style={styles.cell}>Other Samples</td>
              <td style={styles.cell}>
                <input type="number"
                  name="OtherSamples"
                  value={formData.OtherSamples || ""}
                  onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            {/* Total Samples */}
            <tr>
              <td style={styles.cell}></td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Samples (C)
              </td>
              <td style={styles.cell}>
                <input type="number" style={styles.input} />
              </td>
            </tr>

            {/* 4 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>4</td>
              <td style={styles.cell}>
                Total Rejections and QC Samples (D = B + C)
              </td>
              <td style={styles.cell}>
                <input type="number"
                  name="TotalRejectionsAndQCSamples"
                  value={formData.TotalRejectionsAndQCSamples || ""}
                  onChange={handleChange} style={styles.input} />
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
                <input type="number"
                  name="TotalVialsReadySummary"
                  value={formData.TotalVialsReadySummary || ""}
                  onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            {/* 6 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>6</td>
              <td style={styles.cell}>VVM Rejection</td>
              <td style={styles.cell}>
                <input type="number" style={styles.input}
                  name="VVMRejection"
                  value={formData.VVMRejection || ""}
                  onChange={handleChange} />
              </td>
            </tr>

            {/* 7 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>7</td>
              <td style={styles.cell}>
                Total Number of Vials after VVM Activity
              </td>
              <td style={styles.cell}>
                <input type="number"
                  name="TotalNumberofVialsafterVVMActivity"
                  value={formData.TotalNumberofVialsafterVVMActivity || ""}
                  onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            {/* 8 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>8</td>
              <td style={styles.cell}>Packing Rejection</td>
              <td style={styles.cell}>
                <input type="number"
                  name="PackingRejection"
                  value={formData.PackingRejection || ""}
                  onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            {/* 9 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>9</td>
              <td style={styles.cell}>
                Overall Rejection (E) = (D) + VVM Rejection + Packing Rejection
              </td>
              <td style={styles.cell}>
                <input type="number"
                  name="OverallRejection"
                  value={formData.OverallRejection || ""}
                  onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            {/* 10 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>10</td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Number of Vials Ready for Release = (A) - (E)
              </td>
              <td style={styles.cell}>
                <input type="number" style={styles.input}
                  name="TotalVialsRelease"
                  value={formData.TotalVialsRelease || ""}
                  onChange={handleChange} />
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
                <input type="text" name="PreparedName" value={formData.PreparedName || ""} onChange={handleChange} style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" name="ReviewedBy" value={formData.ReviewedBy || ""} onChange={handleChange} style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" name="ApprovdBy" value={formData.ApprovdBy || ""} onChange={handleChange} style={styles.input} />
              </td>
            </tr>

            {/* Sign & Date Row */}
            <tr>
              <td style={{ ...styles.cell, fontWeight: "bold" }}>
                Sign & Date
              </td>

              <td style={styles.cell}>
                <input type="text" name="PreparedDate" value={formData.PreparedDate || ""} onChange={handleChange} style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" name="ReviewedDate" value={formData.ReviewedDate || ""} onChange={handleChange} style={styles.input} />
              </td>

              <td style={styles.cell}>
                <input type="text" name="ApprovdDate" value={formData.ApprovdDate || ""} onChange={handleChange} style={styles.input} />
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddForm;
