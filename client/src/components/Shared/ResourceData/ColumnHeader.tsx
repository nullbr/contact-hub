export type SortParams = {
  sort?: string | undefined;
  direction?: string | undefined;
};

const ColumnHeader = ({
  title,
  column,
  sortParams,
  setSortParams,
  cls,
}: {
  title: string;
  column: string;
  cls?: string;
  sortParams: {
    sort?: string | undefined;
    direction?: string | undefined;
  };
  setSortParams:
    | React.Dispatch<React.SetStateAction<{}>>
    | ((params: SortParams) => void);
}) => {
  // handle sort button click
  const handleSort = () => {
    // if column is already sorted
    if (sortParams.sort === column) {
      // if direction is ascending
      if (sortParams.direction === "asc") {
        // set direction to descending
        setSortParams({ sort: column, direction: "desc" });
      } else {
        // set direction to ascending
        setSortParams({ sort: column, direction: "asc" });
      }
    } else {
      // set column and direction
      setSortParams({ sort: column, direction: "asc" });
    }
  };

  return (
    <th
      scope="col"
      className={`p-2 text-xs font-medium text-left text-gray-500 ${cls}`}
    >
      <button type="button" onClick={handleSort} className="flex uppercase">
        {title}

        {/* show down arrow if column is being sorted and its ascending */}
        {sortParams.sort === column && sortParams.direction === "asc" && (
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        )}

        {/* show up arrow if column is being sorted and its descending */}
        {sortParams.sort === column && sortParams.direction === "desc" && (
          <span className="pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </span>
        )}
      </button>
    </th>
  );
};

export default ColumnHeader;
