import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeePage from "./pages/EmployeePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employee/:id" element={<EmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
