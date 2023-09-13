import { SendIcon } from "../../../assets/icons/heroicons";

const SendButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      id="send-button"
      type="submit"
      disabled={disabled}
      className="inline-flex items-center px-4 py-2 h-full gap-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-300 disabled:bg-gray-300 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
    >
      <p className="hidden xl:block sm:ml-2 text-lg">Enviar</p>
      <SendIcon cls="w-6 h-6 transform rotate-90" />
    </button>
  );
};
export default SendButton;
