import { useRef, useState, type Ref } from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useSearchParams } from "react-router";
import { setSearch } from "../../redux/querySlice";

interface SearchBarProps {
  ref: Ref<HTMLInputElement>;
}

const SearchBar = ({ ref }: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = searchInputRef.current?.value;
    console.log("searching:", searchValue);
    dispatch(setSearch(searchValue));
    // const existingFilters = `${searchParams.getAll(
    //   "contractType"
    // )}${searchParams.getAll("employmentBasis")}`;
    // console.log("existingFilters to construct", existingFilters);
    const newSearchParams = new URLSearchParams(searchParams);
    console.log(newSearchParams);
    if (searchValue) {
      newSearchParams.set("search", searchValue);
    } else {
      newSearchParams.delete("search");
    }
    setSearchParams(newSearchParams);
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        ref={ref}
        name="search"
        type="search"
        placeholder="Search..."
        className="placeholder-gray-500 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
      />
      <Button variants={"cursor-pointer"}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </form>
  );
};

export default SearchBar;
