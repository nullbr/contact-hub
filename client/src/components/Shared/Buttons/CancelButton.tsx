const CancelButton = ({ actionFn }: { actionFn: () => void }) => {
  return (
    <button
      type="button"
      onClick={actionFn}
      className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center shadow-sm"
    >
      Cancelar
    </button>
  );
};
export default CancelButton;
