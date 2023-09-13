import MaintenanceImg from "../../assets/images/page-maintenance.png";
import NavigateBackButton from "../Shared/Buttons/NavigateBackButton";

const Maintenance = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80svh] px-6 xl:px-0">
      <div className="block mb-5 md:max-w-md">
        <img src={MaintenanceImg} alt="maintenance image" />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl sm:text-4xl lg:text-5xl">
          Página em manutenção
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 md:text-lg">
          Desculpe o inconveniente, mas estamos realizando algumas manutenções
        </p>
        <NavigateBackButton />
      </div>
    </div>
  );
};
export default Maintenance;
