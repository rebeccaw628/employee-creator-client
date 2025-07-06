import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getEmployeesByQuery,
  type Employee,
} from "../services/employees-services";
import { type FilterState } from "../components/Filter/Filter";
import { DefaultFilterState } from "../components/Filter/defaultFilterState";

export interface QueryState {
  search: string;
  filters: FilterState;
  results: Employee[];
  // selectedEmployee: Employee | null;
  status: "LOADING" | "SUCCESS" | "FAILED" | "IDLE";
  error: string | null;
}
const initialState: QueryState = {
  search: "",
  filters: DefaultFilterState,
  results: [],
  // selectedEmployee: null,
  status: "IDLE",
  error: null,
};

export const queryEmployees = createAsyncThunk<
  Employee[],
  { searchTerm: string; queryParams: string },
  { rejectValue: string }
>(
  "employees/search",
  async ({ searchTerm, queryParams }, { rejectWithValue }) => {
    try {
      const response = await getEmployeesByQuery(searchTerm, queryParams);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      // state.filters = { ...state.filters, ...action.payload };
    },
    clearSearch: (state) => {
      state.search = "";
    },
    clearFilters: (state) => {
      state.filters = { employmentBasis: [], contractType: [] };
    },
    clearAll: (state) => {
      state.search = "";
      state.filters = { employmentBasis: [], contractType: [] };
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(queryEmployees.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(queryEmployees.fulfilled, (state, action) => {
        state.status = "SUCCESS";
        state.results = action.payload;
      })
      .addCase(queryEmployees.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.payload as string;
      });
  },
});
export const { setSearch, setFilters, clearSearch, clearFilters, clearAll } =
  querySlice.actions;
export default querySlice.reducer;
