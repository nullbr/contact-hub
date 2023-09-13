import Copyright from "../Shared/Copyright";
import Paper from "../Shared/Template/Paper";

const Footer = () => {
  return (
    <footer className="">
      <Paper>
        <ul className="flex flex-wrap items-center justify-center space-y-1">
          <li>
            <a
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              Termos e Condições
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              Política de Privacidade
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              Licenciamento
            </a>
          </li>
          <li>
            <a
              href="#"
              className="mr-4 text-sm font-normal text-gray-500 hover:underline md:mr-6"
            >
              Politica de Cookies
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-sm font-normal text-gray-500 hover:underline"
            >
              Contato
            </a>
          </li>
        </ul>
      </Paper>
      <Copyright />
    </footer>
  );
};
export default Footer;
