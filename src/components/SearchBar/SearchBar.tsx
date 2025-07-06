import { type Ref } from "react";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  ref: Ref<HTMLInputElement>;
}

const SearchBar = ({ onSubmit, ref }: SearchBarProps) => {
  return (
    <form className="flex gap-2" onSubmit={onSubmit}>
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
