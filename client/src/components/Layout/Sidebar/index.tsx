import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Logo from "../../../assets/images/logo.svg";
import BottomMenu from "./BottomMenu";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenNav } from "../../../features/app/appSlice";
import Links from "./Links";
import { ChevronDoubleRight } from "../../../assets/icons/heroicons";

export default function Sidebar() {
  // nav bar state
  const dispatch = useDispatch() as any;
  const { openNav } = useSelector((state: RootState) => state.app);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // return if the sidebar is closed
    if (!openNav) return;

    const handleClickOutsideSidebar = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        dispatch(setOpenNav(false));
      }
    };

    const handleScroll = () => {
      dispatch(setOpenNav(false));
    };

    document.addEventListener("mousedown", handleClickOutsideSidebar);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSidebar);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [openNav, dispatch]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40 w-full border-b border-gray-200  bg-white/50 backdrop-blur">
        <div className="px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          {/* left side */}
          <div className="flex items-center justify-start">
            {/* home button */}
            <button
              ref={buttonRef}
              type="button"
              onClick={() => dispatch(setOpenNav(!openNav))}
              className="-my-2 p-2 inline-flex items-center rounded-lg text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <ChevronDoubleRight
                cls={`h-6 w-6 transition duration-300 ${
                  openNav ? "transform -rotate-180" : ""
                }`}
              />
            </button>
            <Link to="/" className="ml-2 flex">
              <img src={Logo} className="mr-3 h-8" alt="FlowBite Logo" />
              <span className="self-center whitespace-nowrap text-xl font-semibold md:text-2xl">
                Contact Hub
              </span>
            </Link>
          </div>

          {/* right side */}
          <UserMenu />
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed left-0 top-0 z-30 h-[100svh] w-64 border-r border-gray-200  bg-white pt-16 transition-transform lg:translate-x-0 ${
          openNav ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
        ref={sidebarRef}
      >
        {/* navigation */}
        <Links />
        <BottomMenu />
      </aside>
    </>
  );
}
