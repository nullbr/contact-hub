import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getContact, editContact } from "../../api/contacts/contacts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { ContactPayload } from "../../types/contact";
import { getCoalitions } from "../../api/coalitions";
import { setEditModal } from "../../features/table/tableSlice";
import { AxiosError } from "axios";
import { LoaderIcon } from "../../assets/icons/loaderIcon";
import { toast } from "react-hot-toast";
import Modal from "../Shared/Template/Modal";
import ResponseError from "../../utils/Errors/ResponseError";

const EditModal = () => {
  const { accessToken } = useSelector((state: RootState) => state.sessions);
  const queryClient = useQueryClient();

  // modal state
  const { editModal } = useSelector((state: RootState) => state.table);
  const dispatch = useDispatch() as any;

  // query contact
  const { status, data } = useQuery({
    queryKey: ["contact", { accessToken, id: editModal }],
    queryFn: () => getContact({ accessToken, id: editModal }),
    onError: (err: AxiosError) => ResponseError({ err }),
    enabled: !!editModal,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // query options for coalition
  const coalitionsQuery = useQuery({
    queryKey: ["coalitions", { accessToken }],
    queryFn: () => getCoalitions({ accessToken, perPage: "100" }),
    onError: (err: AxiosError) => ResponseError({ err }),
    enabled: !!editModal,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  // mutate contact
  const contactMutation = useMutation({
    mutationFn: editContact,
    onSuccess: () => {
      queryClient.invalidateQueries(["contacts"]);
      queryClient.invalidateQueries(["contact"]);

      toast.success("Contact atualizado com sucesso.");
      closeModal();
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
      election_year: string;
      coalition: string;
    };

    // validate required fields
    if (!entries.name && entries.name === "") {
      toast.error("Nome é obrigatório");
      return;
    }

    if (!entries.coalition && entries.coalition === "") {
      toast.error("Coligação é obrigatório");
      return;
    }

    // submit form data
    const payload: ContactPayload = {
      name: entries.name,
      election_year: Number(entries.election_year),
      coalition_id: Number(entries.coalition),
    };

    contactMutation.mutate({
      accessToken,
      id: editModal,
      payload,
    });
  };

  // handle coalition select
  const [coalition, setCoalition] = useState<number | string>("");
  useEffect(() => {
    if (status !== "success" || !data.contact?.coalition.id) return;

    setCoalition(data.contact.coalition.id);
  }, [status]);

  function closeModal() {
    dispatch(setEditModal({ state: null, resource: null }));
  }

  return (
    <Modal closeFn={() => closeModal()}>
      {/* <!-- Modal content --> */}
      <div className="relative bg-white rounded-lg shadow p-6">
        {/* <!-- Modal header --> */}
        <div className="flex items-start justify-between pb-5 border-b rounded-t">
          <h3>Contact</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={() => closeModal()}
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
          <div className="grid grid-cols-6 gap-6 pt-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nome
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data?.contact?.name}
                id="name"
                className="form-input"
                placeholder="Contact 1"
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="election_year"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Ano da Eleição
              </label>

              <input
                type="number"
                name="election_year"
                defaultValue={data?.contact.election_year || ""}
                id="election_year"
                className="form-input"
                placeholder="2024"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="coalition"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Coligação
              </label>

              <select
                id="coalition"
                name="coalition"
                className="form-select"
                value={coalition || ""}
                onChange={(e) => setCoalition(e.currentTarget.value)}
              >
                <option value="">Selecione um partido</option>
                {!coalitionsQuery.isLoading &&
                  coalitionsQuery.data?.coalitions?.map((coalition) => (
                    <option key={coalition.id} value={coalition.id}>
                      {coalition.name} ({coalition.acronym})
                    </option>
                  ))}
              </select>
            </div>
          </div>
          {/* <!-- Modal footer --> */}

          <div className="flex justify-end pt-6 border-t border-gray-200 rounded-b mt-6">
            <button
              disabled={status === "loading" || contactMutation.isLoading}
              type="submit"
              className={`flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
                status === "loading" || contactMutation.isLoading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary-700 hover:bg-primary-800"
              }`}
            >
              {contactMutation.isLoading && <LoaderIcon />}
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default EditModal;
