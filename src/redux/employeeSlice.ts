import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  getEmployeeById,
  updateEmployeeById,
  type APIEmployee,
  type Employee,
  type UpdateEmployee,
} from "../services/employees-services";

export interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  status: string;
  error: string | null;
}
const initialState: EmployeeState = {
  employees: [],
  selectedEmployee: null,
  status: "idle",
  error: null,
};

// export const updateEmployeeByIdThunk = createAsyncThunk<
//   Employee,
//   { id: number; data: APIEmployee }
// >("employee/updateEmployeeById", async ({ id, data }) => {
//   const updated = await updateEmployeeById(id, data);
//   return updated;
// });

// export const getEmployeeByIdThunk = createAsyncThunk<Employee, number>(
//   "employee/getEmployeeById",
//   async (id) => {
//     const employeeData = await getEmployeeById(id);
//     return employeeData;
//   }
// );

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getEmployeeByIdThunk.pending, (state) => {
  //       state.status = "LOADING";
  //     })
  //     .addCase(getEmployeeByIdThunk.fulfilled, (state) => {
  //       state.status = "SUCCESS";
  //     })
  //     .addCase(getEmployeeByIdThunk.rejected, (state) => {
  //       state.status = "FAILED";
  //     });
  // },
});
export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
