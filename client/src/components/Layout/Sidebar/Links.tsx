import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenNav } from "../../../features/app/appSlice";
import {
  DashIcon,
  ContactsIcon,
  DocsIcon,
  ChatIcon,
} from "../../../assets/icons/sidebar";

const Links = () => {
  // Keep the icon classes in a variable to avoid repetition
  const iconClasses =
    "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900";

  return (
    <div className="h-full bg-white px-3 pb-4">
      <ul className="space-y-2 font-medium overflow-y-auto mt-2">
        <LinkItem
          to="/"
          title="Dashboard"
          icon={<DashIcon cls={iconClasses} />}
        />
      </ul>

      <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
        <LinkItem
          to={"/contatos"}
          title="Contatos"
          icon={<ContactsIcon cls={iconClasses} />}
        />
      </ul>

      <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200">
        <LinkItem
          to={"/assistente"}
          title="Assistente"
          icon={<ChatIcon cls={iconClasses} />}
        />
        <LinkItem
          to={"/documentos"}
          title="Documentos"
          icon={<DocsIcon cls={iconClasses} />}
        />
      </ul>
    </div>
  );
};

const LinkItem = ({
  to,
  title,
  icon,
}: {
  to: string;
  title: string;
  icon: JSX.Element;
}) => {
  const dispatch = useDispatch() as any;
  // check pathname to set the active link
  const path = useLocation().pathname;

  return (
    <li>
      <Link
        to={to}
        onClick={() => dispatch(setOpenNav(false))}
        className={`flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 ${
          path === to && "bg-gray-100 cursor-default"
        }`}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
};
export default Links;
