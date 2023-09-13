import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Logo from "../../assets/images/logo.png";

export default function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 w-full border-b border-gray-200  bg-white/50 backdrop-blur x-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
      {/* left side */}
      <div className="flex items-center justify-start">
        {/* home button */}

        <Link to="/" className="ml-2 flex">
          <img src={Logo} className="mr-3 h-8" alt="FlowBite Logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold md:text-2xl">
            Contact Hub
          </span>
        </Link>
      </div>

      {/* right side */}
      <UserMenu />
    </nav>
  );
}
