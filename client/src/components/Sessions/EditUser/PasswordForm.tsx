import { useMutation } from "@tanstack/react-query";
import { editUserPassword } from "../../../api/sessions";
import { toast } from "react-hot-toast";
import { UserResponse } from "../../../types/sessions";
import Paper from "../../Shared/Template/Paper";
import { LoaderIcon } from "../../../assets/icons/loaderIcon";

const PasswordForm = ({ accessToken }: { accessToken: string | null }) => {
  // change password mutation
  const updatePassMutation = useMutation({
    mutationFn: editUserPassword,
    onSuccess: (response: UserResponse) => {
      if (response.errors) {
        toast.error(response.errors[0]);
        return null;
      }

      toast.success("Senha editado com sucesso");
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
      currentPassword: string;
      password: string;
      confirmPassword: string;
    };

    if (!accessToken) {
      toast.error("Não foi possível editar o usuário");
      return;
    }

    if (
      !values?.currentPassword ||
      values?.currentPassword === "" ||
      !values?.password ||
      values?.password === "" ||
      !values?.confirmPassword ||
      values?.confirmPassword === ""
    ) {
      toast.error("Preencha todos os campos");
      return;
    }

    if (values?.password !== values?.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    updatePassMutation.mutate({ ...values, accessToken });

    // reset form
    event.currentTarget.reset();
  };

  return (
    <Paper>
      <div className="2xl:col-span-2">
        <h3 className="mb-4 text-xl font-semibold">Atualizar Senha</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="currentPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Senha Atual
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                className="form-input"
                placeholder="••••••••"
                autoComplete="new-password"
                defaultValue={""}
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Nova Senha
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                autoComplete="off"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirmar Senha
              </label>
              <input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                className="form-input"
                placeholder="••••••••"
                autoComplete="off"
                required
              />
            </div>
            <div className="col-span-6 sm:col-full">
              <button
                disabled={updatePassMutation.isLoading}
                type="submit"
                className={`rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
                  updatePassMutation.isLoading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-700 hover:bg-primary-800"
                }`}
              >
                {updatePassMutation.isLoading && <LoaderIcon />}
                Salvar senha
              </button>
            </div>
          </div>
        </form>
      </div>
    </Paper>
  );
};
export default PasswordForm;
