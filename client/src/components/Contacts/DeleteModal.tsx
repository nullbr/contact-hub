import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteContact, deleteContacts } from "../../api/contacts/contacts";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setDeleteModal, setSelected } from "../../features/table/tableSlice";
import { AxiosError } from "axios";
import Modal from "../Shared/Template/Modal";
import ResponseError from "../../utils/Errors/ResponseError";

const DeleteModal = () => {
  const queryClient = useQueryClient();
  const { accessToken } = useSelector((state: RootState) => state.sessions);

  // modal state
  const { deleteModal } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch() as any;

  // delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);

      toast.success("Contact excluída com sucesso");
    },
    onError: (err: AxiosError) => ResponseError({ err }),
  });

  // delete multiple mutation
  const deleteMultipleMutation = useMutation({
    mutationFn: deleteContacts,
    onSuccess: () => {
      dispatch(setSelected(null));

      toast.success("Contacts excluídas com sucesso");

      queryClient.invalidateQueries(["contacts"]);
    },
    onError: (err: AxiosError) =>
      ResponseError({
        err,
        message: "Ocorreu um erro ao excluir as contacts",
      }),
  });

  // handle delete
  const handleDelete = () => {
    if (deleteModal.length === 0) return;

    dispatch(setDeleteModal(null));

    if (deleteModal.length === 1) {
      deleteMutation.mutate({ id: deleteModal[0], accessToken });
      return;
    }

    deleteMultipleMutation.mutate({ ids: deleteModal, accessToken });
  };

  return (
    <Modal closeFn={() => dispatch(setDeleteModal(null))} maxWidth="max-w-lg">
      {/* <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow">
        {/* <!-- Modal header --> */}
        <div className="flex justify-end p-2">
          <button
            type="button"
            onClick={() => dispatch(setDeleteModal(null))}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className="p-6 pt-0 text-center">
          <svg
            className="w-16 h-16 mx-auto text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mt-5 mb-6 text-lg text-gray-500">
            Tem certeza que deseja excluir{" "}
            {deleteModal.length > 1 ? "todos selecionados" : "o contact"}?
          </h3>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
          >
            Sim, excluir
          </button>
          <button
            type="button"
            onClick={() => dispatch(setDeleteModal(null))}
            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteModal;
