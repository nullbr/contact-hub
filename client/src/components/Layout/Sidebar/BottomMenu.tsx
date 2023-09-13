import { NavLink } from "react-router-dom";
import { AdjustmentsIcon } from "../../../assets/icons/sidebar";

const BottomMenu = () => {
  return (
    <div className="absolute bottom-0 left-0 justify-center hidden w-full p-4 space-x-4 lg:flex">
      <NavLink
        to="/session"
        className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
        data-tooltip-id="session"
        data-tooltip-content="Configurações"
      >
        <AdjustmentsIcon cls="w-6 h-6" />
      </NavLink>
    </div>
  );
};
export default BottomMenu;
