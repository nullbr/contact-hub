import { AxiosError } from "axios";
import { ErrorMessages } from "../../types/axios";
import { toast } from "react-hot-toast";

export default function ResponseError({
  err,
  message = "Ocorreu um erro ao carregar os dados",
}: {
  err: AxiosError;
  message?: string;
}) {
  const data = err.response?.data as ErrorMessages;

  if (data?.errors && data.errors.length > 0) {
    toast.error(data.errors[0]);
    return;
  }

  toast.error(message);
}
