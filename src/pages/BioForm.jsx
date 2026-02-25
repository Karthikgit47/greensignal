import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormikProductautocomplete } from "../components/Autocomplete";

function AddForm() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [data, setData] = useState({});
  const { id, mode } = useParams();
  const [isAccepted, setIsAccepted] = useState(false);

  const location = useLocation();
  const { batchStatus } = location.state || {};

  console.log("BatchStatus received:", batchStatus);

  // const [searchParams] = useSearchParams();

  //  const mode = searchParams.get("mode") || "edit";
  const navigate = useNavigate();
  const [preparedBy, setpreparedBy] = useState([]);
  const [selectedpreparedBy, setselectedpreparedBy] = useState(null);
  const [reviewedBy, setreviewedBy] = useState([]);
  const [selectedreviewedBy, setselectedreviewedBy] = useState(null);
  const [approvedBy, setapprovedBy] = useState([]);
  const [selectedapprovedBy, setselectedapprovedBy] = useState(null);

  const [formData, setFormData] = useState({
    NameoftheProduct: "",
    ManufacturingDate: "",
    IP: "N",
    BP: "N",
    BatchNo: "",
    ExpiryDate: "",
    Description: "",
    NumberofVials: 0,

    DepyrogenationTunnelRejection: 0,
    AfterDepyrogenationBeforeFillingRejection: 0,
    FillingRejection: 0,
    VialWashingRejection: 0,
    LyophilizerUnloadingRejection: 0,
    CappingRejection: 0,
    VisualInspectionRejection: 0,
    QCFinishedProductSampling: 0,
    LabellingRejection: 0,
    CDLaddGMSDSamples: 0,
    RetentionSamples: 0,
    OtherSamples: 0,
    VVMRejection: 0,
    TotalNumberofVialsafterVVMActivity: 0,
    PackingRejection: 0,
    OverallRejection: 0,

    SOPID: 0,
    TotalNoOfVialsReceived: 0,
    TotalRejections: 0,
    TotalSamples: 0,
    TotalRejectionsAndQCSamples: 0,
    TotalVialsReadySummary: 0,
    TotalVialsRelease: 0,
    BatchStatus: "Prepared",

    PreparedName: "",
    PreparedBy: "",
    PreparedDate: "",
    ReviewedBy: "",
    ReviewedDate: "",
    ApprovdBy: "",
    ApprovdDate: "",
    ReviewComments: "",
    ApprovedComments: "",
  });
  useEffect(() => {
    const A = Number(formData.NumberofVials || 0);

    const totalRejections =
      Number(formData.VialWashingRejection || 0) +
      Number(formData.DepyrogenationTunnelRejection || 0) +
      Number(formData.AfterDepyrogenationBeforeFillingRejection || 0) +
      Number(formData.FillingRejection || 0) +
      Number(formData.RowbyRowRejection || 0) +
      Number(formData.LyophilizerUnloadingRejection || 0) +
      Number(formData.CappingRejection || 0) +
      Number(formData.VisualInspectionRejection || 0) +
      Number(formData.QCFinishedProductSampling || 0) +
      Number(formData.LabellingRejection || 0);

    const totalSamples =
      Number(formData.CDLaddGMSDSamples || 0) +
      Number(formData.RetentionSamples || 0) +
      Number(formData.OtherSamples || 0);

    const D = totalRejections + totalSamples;

    const totalReadySummary = A - D;

    const overallRejection =
      D +
      Number(formData.VVMRejection || 0) +
      Number(formData.PackingRejection || 0);

    const finalRelease = A - overallRejection;

    setFormData((prev) => ({
      ...prev,
      TotalRejections: totalRejections,
      TotalSamples: totalSamples,
      TotalRejectionsAndQCSamples: D,
      TotalVialsReadySummary: totalReadySummary,
      OverallRejection: overallRejection,
      TotalVialsRelease: finalRelease,
    }));
  }, [
    formData.NumberofVials,
    formData.VialWashingRejection,
    formData.DepyrogenationTunnelRejection,
    formData.AfterDepyrogenationBeforeFillingRejection,
    formData.FillingRejection,
    formData.RowbyRowRejection,
    formData.LyophilizerUnloadingRejection,
    formData.CappingRejection,
    formData.VisualInspectionRejection,
    formData.QCFinishedProductSampling,
    formData.LabellingRejection,
    formData.CDLaddGMSDSamples,
    formData.RetentionSamples,
    formData.OtherSamples,
    formData.VVMRejection,
    formData.PackingRejection,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          accessid: "TR335",
          action: "get",
          recid: id,
        };

        const response = await axios.post(
          "https://bosuat.beyondexs.com/api/APIController.php",
          payload,
          {
            // params: {
            //   data: JSON.stringify(payload)
            // },
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
            },
          },
        );

        console.log("API Response:", response.data);
        setData(response.data?.Data || {});

        if (response.data?.Data) {
          setselectedpreparedBy(response.data?.Data.PreparedBy);
          setselectedreviewedBy(response.data?.Data.ReviewedBy);
          setselectedapprovedBy(response.data?.Data.ApprovdBy);
          setFormData((prev) => ({
            ...prev,
            ...response.data.Data,
          }));
        }
      } catch (error) {
        console.error(error.response || error);
      }
    };
    const fetchEmployees = async () => {
      const employees = await fetchemployeedata();
      setpreparedBy(employees ?? []);
      setreviewedBy(employees ?? []);
      setapprovedBy(employees ?? []);
    };
    fetchEmployees();

    fetchData();
  }, []);

  const fetchemployeedata = async () => {
    try {
      const payload = {
        Query: {
          AccessID: "2117",
          ScreenName: "Employee",
          Filter: `CompanyID='76' GROUP BY RecordID`,
        },
      };
      //{"Query":{"AccessID":"2117","ScreenName":"Employee","Filter":"CompanyID='76' GROUP BY RecordID","Any":"","CompId":""}}
      const response = await axios.post(
        "https://bosuat.beyondexs.com/api/wslistview_mysql.php",
        payload,
        {
          params: {
            data: JSON.stringify(payload),
          },
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
          },
        },
      );

      console.log("API Employee Response:", response.data?.Data?.rows);
      return response.data?.Data?.rows;
    } catch (error) {
      console.error(error.response || error);
    }
  };
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
      textAlign: "right",
      //  textAlign: "right",
    },
    numberinput: {
      width: "100%",
      border: "none",
      outline: "none",
      fontFamily: "Times New Roman, serif",
      fontSize: isMobile ? "11px" : "14px",
      //  textAlign: "right",
    },

    bold: {
      fontWeight: "bold",
    },

    center: {
      textAlign: "center",
    },
    inputtext: {
      textAlign: "left",
      border: "none",
      outline: "none",
    },
  };

  const [manufactureDate, setManufactureDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSave = async (action) => {
    console.log(formData);
    console.log(selectedpreparedBy, "selectedpreparedBy");
    console.log(action, "action");
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const formatted = now.toISOString().slice(0, 19).replace("T", " ");
    console.log(formatted);
    // const storedUser = sessionStorage.getItem("username");
    // console.log("Fetching and User:", storedUser);
    const storedEMp = sessionStorage.getItem("EmpData");
    // console.log(storedUser.Data)
    const parsedUser = JSON.parse(storedEMp);
    const PrepareBy = parsedUser.Data.EMP_PREPAREDBY;
    const ReviewBY = parsedUser.Data.EMP_REVIEWBY;
    const ApprovedBy = parsedUser.Data.EMP_APPROVEDBY;
    const UserID = parsedUser.Data.EMP_RECID;
    console.log(parsedUser); // full object
    console.log(parsedUser.Data); // Data object
    console.log(parsedUser.Data.EMP_RECID); // specific value

    let preparedById = selectedpreparedBy || formData.PreparedBy;
    let reviewedById = selectedreviewedBy || formData.ReviewedBy;
    let approvedById = selectedapprovedBy || formData.ApprovdBy;
    let batchStatus = formData.BatchStatus;
    let reviewedDate = formData.ReviewedDate;
    let approvedDate = formData.ApprovdDate;
    let preparedDate = formData.PreparedDate;

    if (formData.BatchStatus == "Yet to be Prepared") {
      preparedById = UserID;
    }
    if (formData.BatchStatus == "Preapred") {
      reviewedById = UserID;
    }
    if (formData.BatchStatus == "Reviewed") {
      approvedById = UserID;
    }
    if (action == "P") {
      if (formData.BatchStatus == "Yet to be Prepared") {
        preparedById = UserID;
        batchStatus = "Preapred";
        preparedDate = formatted;
      }
      if (formData.BatchStatus == "Preapred") {
        reviewedById = UserID;
        batchStatus = "Reviewed";
        reviewedDate = formatted;
      }
      if (formData.BatchStatus == "Reviewed") {
        approvedById = UserID;
        batchStatus = "Approved";
        approvedDate = formatted;
      }
    }
    // let reviewedDate = null;
    // let approvedDate = null;
    // let preparedDate = null;

    // if (
    //   (formData.PreparedDate == null || formData.PreparedDate == "") &&
    //   selectedpreparedBy
    // ) {
    //   preparedDate = today;
    // }
    // if (
    //   (formData.ReviewedDate == null || formData.ReviewedDate == "") &&
    //   formData.BatchStatus == "Prepared" &&
    //   selectedreviewedBy
    // ) {
    //   reviewedDate = today;
    // }
    // if (
    //   (formData.ApprovdDate == null || formData.ApprovdDate == "") &&
    //   formData.BatchStatus == "Reviewed" &&
    //   selectedapprovedBy
    // ) {
    //   approvedDate = today;
    // }

    // Prepared
    // if (
    //   (!formData.PreparedDate || formData.PreparedDate === "") &&
    //   batchStatus === "Prepared" &&
    //   selectedpreparedBy
    // ) {
    //   preparedDate = today;
    // }

    // // Reviewed
    // if (
    //   (!formData.ReviewedDate || formData.ReviewedDate === "") &&
    //   batchStatus === "Reviewed" &&
    //   selectedreviewedBy
    // ) {
    //   reviewedDate = today;
    // }

    // // Approved
    // if (
    //   (!formData.ApprovdDate || formData.ApprovdDate === "") &&
    //   batchStatus === "Approved" &&
    //   selectedapprovedBy
    // ) {
    //   approvedDate = today;
    // }

    // return;
    try {
      const payload = {
        accessid: "TR335",
        action: id == -1 ? "insert" : "update",
        data: {
          RecordID: id,
          CompanyID: "76",
          NameoftheProduct: formData.NameoftheProduct || "",
          ManufacturingDate: formData.ManufacturingDate || null,
          IP: formData.IP || "N",
          BP: formData.BP || "N",
          BatchNo: formData.BatchNo || "",
          ExpiryDate: formData.ExpiryDate || null,
          Description: formData.Description || "",
          NumberofVials: Number(formData.NumberofVials) || 0,
          DepyrogenationTunnelRejection:
            Number(formData.DepyrogenationTunnelRejection) || 0,
          AfterDepyrogenationBeforeFillingRejection:
            Number(formData.AfterDepyrogenationBeforeFillingRejection) || 0,
          FillingRejection: Number(formData.FillingRejection) || 0,
          VialWashingRejection: Number(formData.VialWashingRejection) || 0,
          LyophilizerUnloadingRejection:
            Number(formData.LyophilizerUnloadingRejection) || 0,
          CappingRejection: Number(formData.CappingRejection) || 0,
          VisualInspectionRejection:
            Number(formData.VisualInspectionRejection) || 0,
          QCFinishedProductSampling:
            Number(formData.QCFinishedProductSampling) || 0,
          LabellingRejection: Number(formData.LabellingRejection) || 0,
          CDLaddGMSDSamples: Number(formData.CDLaddGMSDSamples) || 0,
          RetentionSamples: Number(formData.RetentionSamples) || 0,
          OtherSamples: Number(formData.OtherSamples) || 0,
          VVMRejection: Number(formData.VVMRejection) || 0,
          TotalNumberofVialsafterVVMActivity:
            Number(formData.TotalNumberofVialsafterVVMActivity) || 0,
          PackingRejection: Number(formData.PackingRejection) || 0,
          OverallRejection: Number(formData.OverallRejection) || 0,
          TotalNoOfVialsReceived: Number(formData.TotalNoOfVialsReceived) || 0,
          TotalRejections: Number(formData.TotalRejections) || 0,
          TotalSamples: Number(formData.TotalSamples) || 0,
          TotalRejectionsAndQCSamples:
            Number(formData.TotalRejectionsAndQCSamples) || 0,
          TotalVialsReadySummary: Number(formData.TotalVialsReadySummary) || 0,
          TotalVialsRelease: Number(formData.TotalVialsRelease) || 0,
          BatchStatus: batchStatus,
          RowbyRowRejection: Number(formData.RowbyRowRejection) || 0,
          SOPID: 1,
          PreparedBy: preparedById || 0,
          ReviewedBy: reviewedById || 0,
          ApprovdBy: approvedById || 0,
          PreparedDate: preparedDate,
          ReviewedDate: reviewedDate,
          ApprovdDate: approvedDate,
          ReviewComments: formData.ReviewComments || "",
          ApprovedComments: formData.ApprovedComments || "",
        },
      };

      console.log("Payload for Save:", payload);
      // return;
      const response = await axios.post(
        "https://bosuat.beyondexs.com/api/APIController.php",
        payload,
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cGUiOiJKV1QifQ.eyJzdWIiOiJCZXhAMTIzIiwibmFtZSI6IkJleCIsImFkbWluIjp0cnVlLCJleHAiOjE2Njk4ODA2MTV9.uVL-s9M7nOPBH01dT1bpQbu0xbwXK4JT7HQo8h87t50",
            "Content-Type": "application/json",
          },
        },
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
                  style={styles.inputtext}
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
                  value="Y"
                  checked={formData.IP === "Y"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      IP: e.target.checked ? "Y" : "N",
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
                  value="Y"
                  checked={formData.BP === "Y"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      BP: e.target.checked ? "Y" : "N",
                    }))
                  }
                />
              </td>

              {/* Batch No */}
              <td style={{ ...styles.cell, width: "25%" }}>
                <b>Batch No</b>
                <br />
                <input
                  type="text"
                  style={styles.inputtext}
                  name="BatchNo"
                  value={formData.BatchNo || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td style={styles.cell}>
                <b>Manufacturing Date</b>
              </td>

              <td style={styles.cell}>
                <input
                  style={styles.inputtext}
                  type="date"
                  name="ManufacturingDate"
                  value={formData.ManufacturingDate || ""}
                  onChange={(e) => {
                    const value = e.target.value;

                    setFormData((prev) => ({
                      ...prev,
                      ManufacturingDate: value,
                      ExpiryDate: "",
                    }));
                  }}
                />
              </td>

              <td colSpan="2" style={styles.cell}></td>

              <td style={styles.cell}>
                <b>Expiry Date</b>
                <br />
                <input
                  style={styles.inputtext}
                  type="date"
                  name="ExpiryDate"
                  value={formData.ExpiryDate || ""}
                  min={formData.ManufacturingDate || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      ExpiryDate: e.target.value,
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
              <th style={{ ...styles.header, width: "8%" }}>#</th>
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
                <input
                  type="number"
                  style={styles.input}
                  name="NumberofVials"
                  value={formData.NumberofVials || ""}
                  onChange={handleChange}
                />
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
              <td style={styles.cell}>
                After Depyrogenation Before Filling Rejection
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="AfterDepyrogenationBeforeFillingRejection"
                  value={
                    formData.AfterDepyrogenationBeforeFillingRejection || ""
                  }
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
                <input
                  type="number"
                  name="TotalRejections"
                  value={formData.TotalRejections || ""}
                  onChange={handleChange}
                  style={styles.input}
                  readOnly
                />
              </td>
            </tr>

            {/* 3 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>3</td>
              <td style={styles.cell}>CDL + GMSD Samples</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="CDLaddGMSDSamples"
                  value={formData.CDLaddGMSDSamples || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={styles.cell}></td>
              <td style={styles.cell}>Retention Samples</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="RetentionSamples"
                  value={formData.RetentionSamples || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            <tr>
              <td style={styles.cell}></td>
              <td style={styles.cell}>Other Samples</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="OtherSamples"
                  value={formData.OtherSamples || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            {/* Total Samples */}
            <tr>
              <td style={styles.cell}></td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Samples (C)
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="TotalSamples"
                  value={formData.TotalSamples || ""}
                  onChange={handleChange}
                  style={styles.input}
                  readOnly
                />
              </td>
            </tr>

            {/* 4 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>4</td>
              <td style={styles.cell}>
                Total Rejections and QC Samples (D = B + C)
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="TotalRejectionsAndQCSamples"
                  value={formData.TotalRejectionsAndQCSamples || ""}
                  onChange={handleChange}
                  style={styles.input}
                  readOnly
                />
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
                <input
                  type="number"
                  name="TotalVialsReadySummary"
                  value={formData.TotalVialsReadySummary || ""}
                  onChange={handleChange}
                  style={styles.input}
                  readOnly
                />
              </td>
            </tr>

            {/* 6 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>6</td>
              <td style={styles.cell}>VVM Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  style={styles.input}
                  name="VVMRejection"
                  value={formData.VVMRejection || ""}
                  onChange={handleChange}
                />
              </td>
            </tr>

            {/* 7 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>7</td>
              <td style={styles.cell}>
                Total Number of Vials after VVM Activity
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="TotalNumberofVialsafterVVMActivity"
                  value={formData.TotalNumberofVialsafterVVMActivity || ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            {/* 8 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>8</td>
              <td style={styles.cell}>Packing Rejection</td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="PackingRejection"
                  value={formData.PackingRejection ?? ""}
                  onChange={handleChange}
                  style={styles.input}
                />
              </td>
            </tr>

            {/* 9 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>9</td>
              <td style={styles.cell}>
                Overall Rejection (E) = (D) + VVM Rejection + Packing Rejection
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  name="OverallRejection"
                  value={formData.OverallRejection || ""}
                  onChange={handleChange}
                  style={styles.input}
                  readOnly
                />
              </td>
            </tr>

            {/* 10 */}
            <tr>
              <td style={{ ...styles.cell, ...styles.center }}>10</td>
              <td style={{ ...styles.cell, ...styles.bold }}>
                Total Number of Vials Ready for Release = (A) - (E)
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  style={styles.input}
                  name="TotalVialsRelease"
                  value={formData.TotalVialsRelease || ""}
                  onChange={handleChange}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>

        {mode === "edit" && (
          <div style={{ marginTop: "20px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={isAccepted}
                onChange={(e) => setIsAccepted(e.target.checked)}
                style={{ marginRight: "8px" }}
              />
              {/* I agree to the Terms & Conditions */}
              The above entered details are correct and have been verified.
            </label>
          </div>
        )}

        {isAccepted && batchStatus === "Prepared" && (
          <div
            style={{
              marginTop: "30px",
              borderRadius: "10px",
              maxWidth: "600px",
              width: "100%", // Ensure container uses full width
            }}
          >
            <label style={{ fontWeight: "bold", color: "#003366" }}>
              Comments
            </label>
            <textarea
              type="text"
              name="ReviewComments"
              placeholder="Enter your comments"
              value={formData.ReviewComments || ""}
              onChange={handleChange}
              style={{
                ...styles.textarea,
                width: "100%",
                marginTop: "20px",
                height: "100px",
              }}
            />
          </div>
        )}

        {isAccepted && batchStatus === "Revieved" && (
          <div
            style={{
              marginTop: "30px",
              borderRadius: "10px",
              maxWidth: "600px",
              width: "100%", // Ensure container uses full width
            }}
          >
            <label style={{ fontWeight: "bold", color: "#003366" }}>
              Comments
            </label>
            <textarea
              type="text"
              name="ApprovedComments"
              placeholder="Enter your comments"
              value={formData.ApprovedComments || ""}
              onChange={handleChange}
              style={{
                ...styles.textarea,
                width: "100%",
                marginTop: "20px",
                height: "100px",
              }}
            />
          </div>
        )}

        {/* {batchStatus === "Prepared" && (
          <div
            style={{
              marginTop: "30px",
              borderRadius: "10px",
              maxWidth: "600px"
            }}
          >
            <label style={{ fontWeight: "bold", color: "#003366" }}>Comments</label>
            <textarea type="text" style={{ ...styles.textarea, width: "100%", marginTop: '20px', height: "100px" }}></textarea>
          </div>)} */}

        {/* Approval Section */}
        {isAccepted && batchStatus === "Reviewed" && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "2px solid #9cb0c5",
              borderRadius: "10px",
              backgroundColor: "#E6F0FF",
              maxWidth: "600px",
            }}
          >
            <h2 style={{ marginBottom: "15px", color: "#003366" }}>
              Approve Check List
            </h2>
            <ul
              style={{
                paddingLeft: "25px",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "2",
              }}
            >
              <li>Number verified</li>
              <li>Form Checked</li>
              <li>Datas are in order</li>
            </ul>
          </div>
        )}

        {mode === "print" && (
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
                  <input
                    type="text"
                    name="PreparedName"
                    value={formData.PreparedName || ""}
                    onChange={handleChange}
                    style={styles.inputtext}
                  />
                  {/* <FormikProductautocomplete
                    // label="Prepared By"
                    options={preparedBy} // pass state here
                    value={formData.PreparedBy}
                    disabled={
                      formData.BatchStatus === "Reviewed" ||
                      formData.BatchStatus === "Approved"
                    }
                    //disabled={(formData.BatchStatus==""||formData.BatchStatus=="Prepared")==true?true:false}
                    onChange={(value) => {
                      console.log("Selected RecordID:", value);
                      if (value) {
                        setselectedpreparedBy(value);
                      } else {
                        setselectedpreparedBy(null);
                      }
                      setFormData((prev) => ({
                        ...prev,
                        PreparedBy: value,
                      }));
                    }}
                  /> */}
                </td>

                <td style={styles.cell}>
                  <input
                    type="text"
                    name="ReviewedBy"
                    value={formData.ReviewedBy || ""}
                    onChange={handleChange}
                    style={styles.inputtext}
                  />
                  {/* <FormikProductautocomplete
                    // label="Prepared By"
                    options={reviewedBy} // ✅ pass state here
                    value={formData.ReviewedBy}
                    disabled={
                      true
                    }
                    onChange={(value) => {
                      console.log("Selected RecordID:", value);
                      if (value) {
                        setselectedreviewedBy(value);
                      } else {
                        setselectedreviewedBy(null);
                      }
                      setFormData((prev) => ({
                        ...prev,
                        ReviewedBy: value,
                      }));
                    }}
                  /> */}
                </td>

                <td style={styles.cell}>
                  <input
                    type="text"
                    name="ApprovdBy"
                    value={formData.ApprovdBy || ""}
                    onChange={handleChange}
                    style={styles.inputtext}
                  />
                  {/* <FormikProductautocomplete
                    // label="Prepared By"
                    options={approvedBy} // ✅ pass state here
                    value={formData.ApprovdBy}
                    disabled={true
                      // formData.BatchStatus === "Approved" ||
                      // formData.BatchStatus === "Prepared"
                    }
                    onChange={(value) => {
                      console.log("Selected RecordID:", value);
                      if (value) {
                        setselectedapprovedBy(value);
                      } else {
                        setselectedapprovedBy(null);
                      }
                      setFormData((prev) => ({
                        ...prev,
                        ApprovdBy: value,
                      }));
                    }}
                  /> */}
                </td>
              </tr>

              {/* Sign & Date Row */}
              <tr>
                <td style={{ ...styles.cell, fontWeight: "bold" }}>
                  Sign & Date
                </td>

                <td style={styles.cell}>
                  <input
                    type="text"
                    name="PreparedDate"
                    value={formData.PreparedDate || ""}
                    onChange={handleChange}
                    style={styles.input}
                    readOnly
                  />
                </td>

                <td style={styles.cell}>
                  <input
                    type="text"
                    name="ReviewedDate"
                    value={formData.ReviewedDate || ""}
                    onChange={handleChange}
                    style={styles.input}
                    readOnly
                  />
                </td>

                <td style={styles.cell}>
                  <input
                    type="text"
                    name="ApprovdDate"
                    value={formData.ApprovdDate || ""}
                    onChange={handleChange}
                    style={styles.input}
                    readOnly
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* {isAccepted && ( */}
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          {isAccepted && batchStatus !== "Approved" && (
            <button
              // onClick={handleSave("P")}
              onClick={() => handleSave("P")}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "12px",
              }}
            >
              Save & Submit
            </button>
          )}

          {batchStatus != "Approved" && mode === "edit" &&(
            <button
              // onClick={handleSave("S")}
              onClick={() => handleSave("S")}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "12px",
              }}
            >
              {formData.BatchStatus == "Yet to be Picked" ? "Save" : "Query"}
            </button>
          )}

          <button
            //onClick={handleSave}
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#d6693e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
        {/* // )} */}
      </div>
    </div>
  );
}

export default AddForm;
