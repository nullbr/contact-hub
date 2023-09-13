import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPage, setPerPage } from "../../../features/table/tableSlice";
import { ChevronLeft, ChevronRight } from "../../../assets/icons/heroicons";

const NavPagination = ({
  page,
  pages,
  next,
  prev,
  count,
  from,
  to,
}: {
  page: number | undefined;
  pages: number | undefined;
  next: number | null | undefined;
  prev: number | null | undefined;
  count: number | undefined;
  from: number | undefined;
  to: number | undefined;
}) => {
  // page state
  const { perPage } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch() as any;

  // create array of pages
  const getPagesArray = () => {
    if (!pages || !page) return [];

    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(startPage + 4, pages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="block sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between">
      {/* items per page */}
      <div className="flex items-center justify-center mb-4 sm:mb-0">
        <div className="border-r border-gray-200 pr-2 mr-2">
          <label
            htmlFor="per-page"
            className="text-sm font-normal text-gray-500 pr-1"
          >
            Itens
          </label>
          <select
            name="per-page"
            id="per-page"
            className="inline-flex justify-center p-1 font-semibold text-gray-900 rounded cursor-pointer"
            value={perPage}
            onChange={(e) => dispatch(setPerPage(e.target.value))}
          >
            {[10, 15, 20, 30, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <span className="text-sm font-normal text-gray-500">
          Mostrando{" "}
          <span className="font-semibold text-gray-900">
            {from}-{to}
          </span>{" "}
          de <span className="font-semibold text-gray-900">{count}</span>
        </span>
      </div>
      {pages && pages > 1 && (
        <nav className="flex items-center justify-center">
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <button
                type="button"
                onClick={() => dispatch(setPage(prev))}
                disabled={!prev}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
                  prev ? "hover:bg-gray-100 hover:text-gray-700" : ""
                }`}
              >
                <ChevronLeft cls="w-2 h-2 mr-1" />
                <p className="hidden sm:block">Anterior</p>
              </button>
            </li>
            {getPagesArray().map((p) => (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => dispatch(setPage(p))}
                  disabled={p === page}
                  className={`px-3 h-8 leading-tight border border-gray-300 ${
                    p === page
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white hover:bg-gray-100 hover:text-gray-700 text-gray-500"
                  }`}
                >
                  {p}
                </button>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => dispatch(setPage(next))}
                disabled={!next}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
                  next ? "hover:bg-gray-100 hover:text-gray-700" : ""
                }`}
              >
                <p className="hidden sm:block">Próxima</p>
                <ChevronRight cls="w-2 h-2 ml-1" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default NavPagination;
