import { useDispatch } from "react-redux";
import Paper from "../../Shared/Template/Paper";
import { useMutation } from "@tanstack/react-query";
import { deleteUserWithToken } from "../../../api/sessions";
import toast from "react-hot-toast";
import ResponseError from "../../../utils/Errors/ResponseError";
import { AxiosError } from "axios";
import { logoutUser } from "../../../features/sessions/sessionSlice";
import Modal from "../../Shared/Template/Modal";
import { useState } from "react";

export const DeleteUser = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string | null;
  refreshToken: string | null;
}) => {
  const dispatch = useDispatch() as any;
  const [openModal, setOpenModal] = useState(false);

  // delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUserWithToken,
    onSuccess: () => {
      dispatch(logoutUser({ refreshToken }));
      toast.success("Conta excluída com sucesso!");
    },
    onError: (e: AxiosError) =>
      ResponseError({ err: e, message: "Não foi possível excluir a conta" }),
  });

  // handle button click
  const handleButtonClick = () => {
    if (!accessToken) {
      toast.error("Não foi possível excluir a conta");
      return;
    }

    deleteUserMutation.mutate(accessToken);
  };

  return (
    <>
      <Paper>
        <div className="2xl:col-span-2">
          <h3 className="mb-4 text-xl font-semibold text-red-700">
            Excluir Conta
          </h3>

          <p className="text-gray-500">
            Esta ação é irreversível, você tem certeza que deseja excluir sua
            conta permanentemente?
          </p>

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-red-700 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Excluir
          </button>
        </div>
      </Paper>

      {openModal && (
        <Modal closeFn={() => setOpenModal(false)} maxWidth="max-w-lg">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow">
            {/* <!-- Modal header --> */}
            <div className="flex justify-end p-2">
              <button
                type="button"
                onClick={() => setOpenModal(false)}
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
                Tem certeza que deseja excluir esta conta?
              </h3>
              <button
                type="button"
                onClick={() => handleButtonClick()}
                disabled={deleteUserMutation.isLoading}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2"
              >
                Sim, excluir
              </button>
              <button
                type="button"
                onClick={() => setOpenModal(false)}
                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
