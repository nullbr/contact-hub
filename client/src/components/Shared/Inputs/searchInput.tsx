import { LoaderIcon } from "../../../assets/icons/loaderIcon";
import { SearchIcon } from "../../../assets/icons/sidebar";

const SearchInput = ({
  placeHolder = "Buscar",
  changeFn,
  disabled = false,
  autoFocus = false,
  id = "search-input",
  loading = false,
}: {
  placeHolder?: string;
  changeFn: (val: string, sec?: any) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  id?: string;
  loading?: boolean;
}) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute top-1/2 -translate-y-1/2 left-2.5"
      >
        {loading ? <LoaderIcon /> : <SearchIcon cls="w-4 h-4" />}
      </label>
      <input
        type="text"
        name={id}
        id={id}
        className="bg-gray-100/50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 pl-[2.1rem]"
        placeholder={placeHolder}
        onChange={(e) => changeFn(e.target.value)}
        autoComplete="off"
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </div>
  );
};
export default SearchInput;
