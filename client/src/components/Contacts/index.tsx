import SearchBar from "../Shared/ResourceData/SearchBar";
import Table from "./Table";
import EditModal from "./EditModal";
// import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../api/contacts";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "../../utils/Hooks/useDebounce";
import { AxiosError } from "axios";
import Paper from "../Shared/Template/Paper";
import ResponseError from "../../utils/Errors/ResponseError";
import Map from "../Shared/Map";
import { useMediaQuery } from "../../utils/Hooks/useMediaQuery";
import { feedResources } from "../../features/table/tableSlice";
import { ContactsResponse } from "../../types/contacts";

const Contacts = () => {
  const dispatch = useDispatch() as any;
  const isMobile = useMediaQuery("(max-width: 640px)");

  // queryParams
  const [sortParams, setSortParams] = useState<{
    sort?: string;
    direction?: string;
  }>({});
  const [searchQuery, setSearchQuery] = useState<null | string>(null);

  // debouce search query
  const debounceSearch = useDebounce(searchQuery, 300);

  // modals state
  const { editModal, addModal, deleteModal, page, perPage } = useSelector(
    (state: RootState) => state.table
  );

  // get session accessToken from state
  const { accessToken } = useSelector((state: RootState) => state.sessions);

  // query all contacts
  const queryParams = {
    accessToken,
    page,
    perPage,
    sortParams,
    debounceSearch,
  };

  const { data } = useQuery({
    queryKey: ["contacts", debounceSearch],
    queryFn: () => getContacts(queryParams),
    onSuccess: (response: ContactsResponse) =>
      dispatch(feedResources(response.ids)),
    onError: (err: AxiosError) => ResponseError({ err }),
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
  });

  // mount page
  useEffect(() => {
    // set page title
    document.title = "Contatos | Contact Hub";
  }, []);

  return (
    <article className="grid sm:grid-rows-2 xl:grid-rows-1 xl:grid-cols-2 gap-4 sm:absolute top-0 left-0 w-full sm:h-[100svh] sm:px-4 sm:pt-[4.5rem] sm:pb-14">
      {/* right side */}
      <Paper cls="block p-0 sm:p-0 overflow-y-auto">
        <SearchBar
          resource="contact"
          resourceName="contato"
          setSearchQuery={setSearchQuery}
        />

        <Table
          data={data}
          sortParams={sortParams}
          setSortParams={setSortParams}
        />

        {editModal && <EditModal />}
        {deleteModal.length > 0 && <DeleteModal />}
        {/* {addModal && <AddModal />} */}
      </Paper>

      {/* left side */}
      <Map
        cls="hidden sm:block mb-4"
        height={isMobile ? "h-72" : "h-full"}
        zoom={3}
        center={{
          lat: -14.235,
          lng: -51.9253,
        }}
        markers={(data?.contacts || []).map((contact) => ({
          position: {
            lat: contact.location.latitude,
            lng: contact.location.longitude,
          },
          title: contact.name,
        }))}
        setOnClick={() => {}}
      />
    </article>
  );
};

export default Contacts;
