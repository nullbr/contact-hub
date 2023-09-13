import { DeleteIcon } from "../../../assets/icons/heroicons";

const DeleteButton = ({ actionFn }: { actionFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 shadow-sm"
    >
      <DeleteIcon cls="w-4 h-4 my-1" />
      <p className="hidden xl:block sm:ml-2">Excluir</p>
    </button>
  );
};
export default DeleteButton;
