import PageHeader from "../Shared/Template/PageHeader";
import SearchBar from "../Shared/ResourceData/SearchBar";
import Table from "./Table";
import EditModal from "./EditModal";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import { useQuery } from "@tanstack/react-query";
import { getContacts } from "../../api/contacts/contacts";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useDebounce from "../../utils/Hooks/useDebounce";
import NavPagination from "../Shared/ResourceData/NavPagination";
import { ContactsResponse } from "../../types/contact";
import { AxiosError } from "axios";
import Paper from "../Shared/Template/Paper";
import ResponseError from "../../utils/Errors/ResponseError";
import { feedResources } from "../../features/table/tableSlice";

const Contacts = () => {
  const dispatch = useDispatch() as any;

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

  const { status, data } = useQuery({
    queryKey: ["contacts", queryParams],
    queryFn: () => getContacts(queryParams),
    onSuccess: (response: ContactsResponse) => {
      // feed table slice with contacts ids
      if (response.owned_ids)
        dispatch(
          feedResources({ ownerId: null, ids: response.owned_ids || [] })
        );
    },
    onError: (err: AxiosError) => ResponseError({ err }),
    keepPreviousData: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  // mount page
  useEffect(() => {
    // set page title
    document.title = "Contacts | Contact Hub";

    // feed table slice with contacts ids
    if (data?.owned_ids)
      dispatch(feedResources({ ownerId: null, ids: data.owned_ids || [] }));
  }, []);

  return (
    <>
      <PageHeader title="Contacts" />
      <Paper cls="block overflow-hidden p-0 sm:p-0">
        <SearchBar
          resource="contact"
          resourceName="contact"
          setSearchQuery={setSearchQuery}
        />

        <Table
          data={data}
          sortParams={sortParams}
          setSortParams={setSortParams}
        />

        {editModal && <EditModal />}
        {deleteModal.length > 0 && <DeleteModal />}
        {addModal && <AddModal />}

        {status === "success" && (
          <NavPagination
            page={data?.page}
            pages={data?.pages}
            count={data?.count}
            next={data?.next}
            prev={data?.prev}
            from={data?.from}
            to={data?.to}
          />
        )}
      </Paper>
    </>
  );
};

export default Contacts;
