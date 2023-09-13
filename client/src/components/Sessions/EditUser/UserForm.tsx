import { useMutation } from "@tanstack/react-query";
import { UserDetails, UserResponse } from "../../../types/sessions";
import { editUserWithToken } from "../../../api/sessions";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../features/sessions/sessionSlice";
import Paper from "../../Shared/Template/Paper";
import { LoaderIcon } from "../../../assets/icons/loaderIcon";

const UserForm = ({
  currentUser,
  accessToken,
}: {
  currentUser: UserDetails | undefined;
  accessToken: string | null;
}) => {
  const dispatch = useDispatch() as any;

  // edit user mutation
  const editUserMutation = useMutation({
    mutationFn: editUserWithToken,
    onSuccess: (response: UserResponse) => {
      if (response.errors) {
        toast.error(response.errors[0]);
        return null;
      }
      // dispatch action to update user in redux store
      dispatch(updateUser(response.user));

      toast.success("Usuário editado com sucesso");
    },
    onError: () => {
      toast.error("Não foi possível editar o usuário");
    },
  });

  // handle form submit
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries()) as {
      firstName: string;
      lastName: string;
      email: string;
    };

    if (!values.firstName || !values.lastName || !values.email) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (!accessToken) {
      toast.error("Não foi possível editar o usuário");
      return;
    }

    editUserMutation.mutate({ ...values, accessToken: accessToken });
  };

  return (
    <Paper>
      <div className="2xl:col-span-2">
        <h3 className="mb-4 text-xl font-semibold">Informações Gerais</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nome
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="form-input"
                defaultValue={currentUser?.firstName}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Sobrenome
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-input"
                defaultValue={currentUser?.lastName}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                defaultValue={currentUser?.email}
                required
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-400 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                defaultValue={currentUser?.role}
                disabled
                required
              />
            </div>
            <div className="col-span-6 sm:col-full">
              <button
                disabled={editUserMutation.isLoading}
                type="submit"
                className={`rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
                  editUserMutation.isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-700 hover:bg-primary-800"
                }`}
              >
                {editUserMutation.isLoading && <LoaderIcon />}
                Salvar alterações
              </button>
            </div>
          </div>
        </form>
      </div>
    </Paper>
  );
};
export default UserForm;
