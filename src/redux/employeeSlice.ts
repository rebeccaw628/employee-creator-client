import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  getEmployeeById,
  getEmployeesBySearch,
  updateEmployeeById,
  type APIEmployee,
  type Employee,
  type UpdateEmployee,
} from "../services/employees-services";

export interface EmployeeState {
  query: string;
  results: Employee[];
  selectedEmployee: Employee | null;
  status: string;
  error: string | null;
}
const initialState: EmployeeState = {
  query: "",
  results: [],
  selectedEmployee: null,
  status: "idle",
  error: null,
};

export const searchEmployee = createAsyncThunk<
  Employee[],
  string,
  { rejectValue: string }
>("employees/search", async (searchTerm: string, { rejectWithValue }) => {
  try {
    const response = await getEmployeesBySearch(searchTerm);
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("An unknown error occurred");
  }
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.results.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchEmployee.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(searchEmployee.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.results = action.payload;
      })
      .addCase(searchEmployee.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload as string;
      });
  },
});
export const { addEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
