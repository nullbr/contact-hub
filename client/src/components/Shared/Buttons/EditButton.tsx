import { EditIcon } from "../../../assets/icons/heroicons";

const EditButton = ({ actionFn }: { actionFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="group inline-flex justify-center items-center h-8 w-8 text-sm font-medium text-center border border-primary-600 rounded-lg hover:border-primary-800 focus:ring-4 focus:ring-red-300 shadow-sm transition duration-200"
    >
      <EditIcon cls="h-full w-auto py-1.5 group-hover:py-1 text-primary-600 group-hover:text-primary-800 transition duration-200" />
    </button>
  );
};
export default EditButton;
