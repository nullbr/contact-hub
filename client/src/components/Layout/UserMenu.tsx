import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { logoutUser } from "../../features/sessions/sessionSlice";
import { NavLink } from "react-router-dom";

const UserMenu: React.FC = () => {
  // Effects
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutsideUser = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideUser);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideUser);
    };
  }, []);

  // session
  const dispatch = useDispatch() as any;
  const { currentUser, refreshToken } = useSelector(
    (store: RootState) => store.sessions
  );

  const handleSignOut = async () => {
    if (currentUser) {
      dispatch(logoutUser({ refreshToken }));
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex items-center">
      <div className="ml-3 flex items-center">
        <button
          type="button"
          className="flex rounded-full text-sm focus:ring-1 shadow-md focus:ring-gray-300"
          onClick={() => setIsOpen((prev) => !prev)}
          ref={userButtonRef}
          data-tooltip-id="user-menu"
          data-tooltip-content="Usuário"
          data-tooltip-place="left"
        >
          <span className="sr-only">Open user menu</span>
          {currentUser.avatarUrl ? (
            <img
              id="user-avatar"
              className="w-8 h-8 rounded-full"
              src={currentUser.avatarUrl}
              alt="user photo"
            />
          ) : (
            <svg
              id="svg-menu-button"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="m-1 h-6 w-6"
            >
              <path
                id="path-menu-button"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          )}
        </button>

        {isOpen && (
          <div
            className="absolute right-4 top-10 z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow"
            id="dropdown-user"
            ref={dropdownRef}
          >
            <div className="px-4 py-3" role="none">
              <p className="text-sm text-gray-900" role="none">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p
                className="truncate text-sm font-medium text-gray-900"
                role="none"
              >
                {currentUser.email}
              </p>
            </div>
            <ul className="py-1" role="none">
              <li>
                <NavLink
                  to="/session"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Configurações
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="block w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
