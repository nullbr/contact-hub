import NotFoundImg from "../../assets/images/page-not-found.png";
import NavigateBackButton from "../Shared/Buttons/NavigateBackButton";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[80svh] px-6 xl:px-0">
      <div className="block md:max-w-lg">
        <img src={NotFoundImg} alt="404" />
      </div>
      <div className="text-center xl:max-w-4xl">
        <h1 className="mb-3 text-2xl sm:text-4xl lg:text-5xl">
          404 - Página não encontrada
        </h1>
        <p className="mb-5 text-base font-normal text-gray-500 md:text-lg">
          A página que você está procurando não existe ou foi movida.
        </p>
        <NavigateBackButton />
      </div>
    </div>
  );
};
export default NotFound;
