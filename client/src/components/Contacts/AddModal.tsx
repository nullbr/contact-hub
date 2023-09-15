import { toast } from "react-hot-toast";
import { createContact } from "../../api/contacts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateContactPayload } from "../../types/contacts";
import { AxiosError } from "axios";
import { setAddModal } from "../../features/table/tableSlice";
import { LoaderIcon } from "../../assets/icons/loaderIcon";
import Modal from "../Shared/Template/Modal";
import ResponseError from "../../utils/Errors/ResponseError";
import { LocationPicker } from "./LocationPicker";
import { useState } from "react";
import { LocationPayload } from "../../types/locations";

const AddModal = () => {
  const { accessToken } = useSelector((state: RootState) => state.sessions);
  const queryClient = useQueryClient();
  const [location, setLocation] = useState<LocationPayload | null>(null);

  // modal state
  const dispatch = useDispatch() as any;

  // mutate contact
  const contactMutation = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      queryClient.invalidateQueries(["dashboard"]);

      toast.success("Contact criada com sucesso.");
      handleCloseModal();
    },
    onError: (err: AxiosError) => ResponseError({ err }),
  });

  // handle submit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // get form data
    const formData = new FormData(event.currentTarget);
    const entries = Object.fromEntries(formData.entries()) as {
      name: string;
      phone_number: string;
      cpf: string;
    };

    // validate required fields
    if (!entries.name && entries.name === "")
      return toast.error("Nome é obrigatório");

    if (!entries.phone_number && entries.phone_number === "")
      return toast.error("Número de telefone é obrigatório");

    if (!location) return toast.error("Localização é obrigatório");

    // submit form data
    const payload: CreateContactPayload = {
      contact: {
        name: entries.name,
        phone_number: entries.phone_number,
        cpf: entries.cpf,
      },
      location,
    };

    contactMutation.mutate({
      accessToken,
      payload,
    });
  };

  // handle close modal
  const handleCloseModal = () => {
    dispatch(setAddModal({ state: false, resource: null }));
  };

  return (
    <Modal closeFn={handleCloseModal}>
      {/* <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow p-6">
        {/* <!-- Modal header --> */}
        <div className="flex items-start justify-between pb-5 border-b rounded-t">
          <h3>Adicionar Contact</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => handleCloseModal()}
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
        <form onSubmit={handleSubmit}>
          {/* form fields */}
          <div className="grid grid-cols-6 gap-6 pt-6">
            <div className="col-span-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-input"
                placeholder="Contato"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Número de Telefone
              </label>

              <input
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-input"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="cpf"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                CPF
              </label>

              <input
                type="text"
                name="cpf"
                id="cpf"
                className="form-input"
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          {/* location select */}
          <div className="items-center sm:flex sm:gap-6 pt-4">
            <LocationPicker location={location} setLocation={setLocation} />
          </div>

          {/* <!-- Modal footer --> */}
          <div className="flex justify-end pt-6 border-t border-gray-200 rounded-b mt-6">
            <button
              disabled={contactMutation.isLoading}
              type="submit"
              className={`flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
                contactMutation.isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary-700 hover:bg-primary-800"
              }`}
            >
              {contactMutation.isLoading && <LoaderIcon />}
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddModal;
