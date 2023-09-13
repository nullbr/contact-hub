import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/sessions/sessionSlice";
import { RootState } from "../../store";
import Logo from "../../assets/images/logo.svg";
import Copyright from "../Shared/Copyright";
import { LoaderIcon } from "../../assets/icons/loaderIcon";

export default function LogIn() {
  const dispatch = useDispatch() as any;
  const { loading, accessToken } = useSelector(
    (store: RootState) => store.sessions
  );

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Refs
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // Effects
  useEffect(() => {
    // set page title
    document.title = "Log in | Contact Hub";
  }, []);

  useEffect(() => {
    // redirect to home if user is already logged in
    if (accessToken) {
      navigate(from, { replace: true });
    }
  }, [accessToken]);

  // Submit handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    // Perform form validations
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    // sign in user with useLogIn hook
    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-[100svh] lg:py-0">
      <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
        <img className="mr-2 h-8 w-8" src={Logo} alt="logo" />
        Contact Hub
      </div>
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1>Log in</h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                placeholder="nome@exemplo.com"
                required
                autoComplete="email"
                autoFocus
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Senha
              </label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                required
                autoComplete="current-password"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-primary-700 hover:bg-primary-800"
              }`}
            >
              {loading && <LoaderIcon />}
              Entrar
            </button>
          </form>
        </div>
      </div>
      <Copyright />
    </section>
  );
}
