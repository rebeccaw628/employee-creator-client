import type { FilterState } from "./Filter";

export const DefaultFilterState: FilterState = {
  contractType: [],
  employmentBasis: [],
};

export interface DefaultFilterState {
  contractType: string[];
  employmentBasis: string[];
}
