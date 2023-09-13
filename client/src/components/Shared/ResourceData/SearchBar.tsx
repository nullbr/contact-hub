import { useDispatch } from "react-redux";
import {
  ResourceName,
  deleteSelected,
  setAddModal,
} from "../../../features/table/tableSlice";
import AddButton from "../Buttons/AddButton";
import SearchInput from "../Inputs/searchInput";
import pluralizar from "../../../utils/Scripts/pluralizar";

const SearchBar = ({
  resource,
  resourceName,
  setSearchQuery,
  showAdd = true,
  showDelete = true,
}: {
  resource: ResourceName;
  resourceName: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string | null>>;
  showAdd?: boolean;
  showDelete?: boolean;
}) => {
  // add modal state
  const dispatch = useDispatch() as any;

  return (
    <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
      <div className="w-full mb-1">
        <div className="flex flex-col sm:flex-row">
          <div className="items-center mb-3 flex divide-x divide-gray-100 sm:mb-0">
            <div className="pr-3 relative mt-1 w-auto sm:w-72 xl:w-96 flex-1">
              <label htmlFor={resourceName} className="sr-only">
                Buscar
              </label>
              <SearchInput
                changeFn={setSearchQuery}
                placeHolder={`Buscar ${pluralizar(resourceName, 2)}`}
                id={resourceName}
              />
            </div>
            {showDelete && (
              <div className="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0">
                <button
                  type="button"
                  onClick={() => dispatch(deleteSelected())}
                  className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
          {showAdd && (
            <div className="flex items-center sm:ml-auto space-x-2 sm:space-x-3">
              {/* add button */}
              <AddButton
                actionFn={() =>
                  dispatch(setAddModal({ state: true, resource: resource }))
                }
                resourceName={resourceName}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SearchBar;
