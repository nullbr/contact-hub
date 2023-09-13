import { useMutation } from "@tanstack/react-query";
import { editAvatar } from "../../../api/sessions";
import { toast } from "react-hot-toast";
import { UserDetails, UserResponse } from "../../../types/sessions";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../features/sessions/sessionSlice";
import Paper from "../../Shared/Template/Paper";
import { LoaderIcon } from "../../../assets/icons/loaderIcon";
import ImageInput from "../../Shared/Inputs/ImageInput";

const ImageUploader = ({
  accessToken,
  currentUser,
}: {
  accessToken: string | null;
  currentUser: UserDetails | undefined;
}) => {
  const dispatch = useDispatch() as any;

  // update image mutation
  const updateImageMutation = useMutation({
    mutationFn: editAvatar,
    onSuccess: (response: UserResponse) => {
      if (response.errors) {
        toast.error(response.errors[0]);
        return null;
      }
      // dispatch action to update user in redux store
      dispatch(updateUser(response.user));

      toast.success("Avatar editado com sucesso");
    },
    onError: () => {
      toast.error("Não foi possível atualizar a imagem");
    },
  });

  // handle form submit
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // validate image size is less than 1MB
    const image = formData.get("image") as File;
    if (image && image.size > 1000000) {
      toast.error("Imagem muito grande. Tamanho máximo 1MB");
      return;
    }

    if (!accessToken) {
      toast.error("Não foi possível editar a imagem");
      return;
    }

    updateImageMutation.mutate({ formData, accessToken });

    // reset form
    event.currentTarget.reset();
  };

  return (
    <Paper>
      <form className="sm:flex sm:gap-4 xl:gap-6" onSubmit={handleFormSubmit}>
        <ImageInput imgSrc={currentUser?.avatarUrl} />

        <div className="mt-auto flex sm:py-2 pt-2">
          <button
            disabled={updateImageMutation.isLoading}
            type="submit"
            className={`flex rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
              updateImageMutation.isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary-700 hover:bg-primary-800"
            }`}
          >
            {updateImageMutation.isLoading && <LoaderIcon />}
            Enviar
          </button>
        </div>
      </form>
    </Paper>
  );
};
export default ImageUploader;
