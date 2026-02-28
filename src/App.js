import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MenuList from "./pages/MenuList";
import DashboardLayout from "./components/DashboardLayout";
import BioForm from "./pages/BioForm";
import ListOfSOPs from "./pages/ListOfSOPs";
import SOPDocuments from "./pages/SOPDocuments";
import AnnexureForm1 from "./pages/AnnexureForm1";
import AnnexureForm2 from "./pages/AnnexureForm2";
import AnnexureForm3 from "./pages/AnnexureForm3";
import AnnexureForm4 from "./pages/AnnexureForm4";

// "homepage": "https://karthikgit47.github.io/greensignal",

function App() {
  const isLoggedIn = true;

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route path="menu" element={<MenuList />} />
          <Route path="add-form/:id/:mode" element={<BioForm />} />
          <Route path="list-of-sops" element={<ListOfSOPs />} />
          <Route path="sop-documents/:id" element={<SOPDocuments />} />
          <Route path="annexure-form-1" element={<AnnexureForm1 />} />
          <Route path="annexure-form-2" element={<AnnexureForm2 />} />
          <Route path="annexure-form-3" element={<AnnexureForm3 />} />
          <Route path="annexure-form-4" element={<AnnexureForm4 />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
