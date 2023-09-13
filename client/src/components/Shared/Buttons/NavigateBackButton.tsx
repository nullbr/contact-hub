import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "../../../assets/icons/heroicons";

const NavigateBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-3"
    >
      <ChevronLeft cls="mr-2 -ml-1 w-3 h-3" />
      Voltar
    </button>
  );
};
export default NavigateBackButton;
