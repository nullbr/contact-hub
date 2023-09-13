import { useDispatch, useSelector } from "react-redux";
import { ContactsResponse } from "../../types/contact";
import ColumnHeader from "../Shared/ResourceData/ColumnHeader";
import { toggleSelectAll } from "../../features/table/tableSlice";
import { RootState } from "../../store";
import Contact from "./Contact";

const Table = ({
  data,
  sortParams,
  setSortParams,
}: {
  data: ContactsResponse | undefined;
  sortParams: {
    sort?: string | undefined;
    direction?: string | undefined;
  };
  setSortParams: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const dispatch = useDispatch() as any;
  const { selectAll } = useSelector((state: RootState) => state.table);

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="p-4 flex items-center">
                  <input
                    id="checkbox-all"
                    aria-describedby="checkbox-1"
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => dispatch(toggleSelectAll())}
                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 cursor-pointer hover:scale-105"
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </th>
                <ColumnHeader
                  title="nome"
                  column="name"
                  sortParams={sortParams}
                  setSortParams={setSortParams}
                  cls="w-1/4"
                />
                <ColumnHeader
                  title="Coligação"
                  column="coalition"
                  sortParams={sortParams}
                  setSortParams={setSortParams}
                  cls="w-1/4"
                />
                <ColumnHeader
                  title="Eleição"
                  column="election_year"
                  sortParams={sortParams}
                  setSortParams={setSortParams}
                  cls="w-1/4"
                />

                <th
                  scope="col"
                  className="p-4 text-xs font-medium text-left text-gray-500 uppercase"
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="relative bg-white divide-y divide-gray-200">
              {data?.contacts &&
                data.contacts.map((contact) => (
                  <Contact key={contact.id} contact={contact} />
                ))}

              {/* none found */}
              {data?.count === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Nenhuma contact encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Table;
