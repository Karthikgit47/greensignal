import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MenuList from "./pages/MenuList";
import DashboardLayout from "./components/DashboardLayout";
import BioForm from "./pages/BioForm";
import ListOfSOPs from "./pages/ListOfSOPs";
import SOPDocuments from "./pages/SOPDocuments";

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
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
