import { EditIcon } from "../../../assets/icons/heroicons";

const EditButton = ({ actionFn }: { actionFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 shadow-sm"
    >
      <EditIcon cls="w-4 h-4 my-1" />
      <p className="hidden xl:block sm:ml-2">Editar</p>
    </button>
  );
};
export default EditButton;
