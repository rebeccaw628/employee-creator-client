import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../services/employees-services";

export interface EmployeeState {
  employees: Employee[];
}
const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
  },
});
export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
