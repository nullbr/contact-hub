import { AddIcon } from "../../../assets/icons/heroicons";

const AddButton = ({
  actionFn,
  resourceName = "",
}: {
  actionFn: () => void;
  resourceName?: string;
}) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="inline-flex items-center justify-center w-full sm:w-auto px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 shadow-sm"
    >
      <AddIcon tip={resourceName} cls="w-6 h-6" />
      <p className="hidden xl:block">Adicionar {resourceName}</p>
    </button>
  );
};
export default AddButton;
