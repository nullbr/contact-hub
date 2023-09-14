import { DeleteIcon } from "../../../assets/icons/heroicons";

const DeleteButton = ({ actionFn }: { actionFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="group inline-flex justify-center items-center h-8 w-8 text-sm font-medium text-center border border-red-600 rounded-lg hover:border-red-800 focus:ring-4 focus:ring-red-300 shadow-sm transition duration-200"
    >
      <DeleteIcon cls="h-full w-auto py-1.5 group-hover:py-1 text-red-600 group-hover:text-red-800 transition duration-200" />
    </button>
  );
};
export default DeleteButton;
