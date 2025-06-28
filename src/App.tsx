import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeePage from "./pages/EmployeePage";
import NavBar from "./containers/NavBar/NavBar";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="flex h-screen">
          <NavBar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/employees/:id" element={<EmployeePage />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
