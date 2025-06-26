import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeePage from "./pages/EmployeePage";
import NavBar from "./containers/NavBar/NavBar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employee/:id" element={<EmployeePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
