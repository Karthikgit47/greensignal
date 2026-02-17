import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import MenuList from "./pages/MenuList";
import DashboardLayout from "./components/DashboardLayout";
import BioForm from "./pages/BioForm";


function App() {
  const isLoggedIn = true; // later replace with AuthContext

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route path="menu" element={<MenuList />} />
          <Route path="add-form" element={<BioForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
