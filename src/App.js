import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MenuList from "./pages/MenuList";
import DashboardLayout from "./components/DashboardLayout";
import BioForm from "./pages/BioForm";
import ListOfSOPs from "./pages/ListOfSOPs";
import SOPDocuments from "./pages/SOPDocuments";
import Annexure6 from "./pages/Annexure6";
import Annexure5 from "./pages/Annexure5";

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
          <Route path="annexure6" element={<Annexure6 />} />
          <Route path="annexure5" element={<Annexure5 />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
