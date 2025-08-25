import { IoMdSearch } from "react-icons/io";
import { MdFilterAlt } from "react-icons/md";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Type anything to search...",
  onSearch,
  onFilterClick,
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="w-full py-2 pl-10 pr-10 border border-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />

      {/* Search Icon (Left) */}
      <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

      {/* Filter Icon (Right) */}
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        onClick={onFilterClick}
      >
        <MdFilterAlt className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchInput;
