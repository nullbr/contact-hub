import { ViewIconOutline } from "../../../assets/icons/outlineIcons";

const ViewButton = ({ actionFn }: { actionFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 shadow-sm"
    >
      <ViewIconOutline cls="w-4 h-4 my-1" />
      <p className="hidden xl:block sm:ml-2">Abrir</p>
    </button>
  );
};
export default ViewButton;
