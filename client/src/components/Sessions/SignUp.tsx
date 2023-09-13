import { toast } from "react-hot-toast";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../features/sessions/sessionSlice";
import { RootState } from "../../store";
import Logo from "../../assets/images/logo.png";
import Copyright from "../Shared/Copyright";
import { LoaderIcon } from "../../assets/icons/loaderIcon";
import { CreateUserPayload } from "../../types/sessions";

export default function SignUp() {
  const dispatch = useDispatch() as any;
  const { loading, accessToken } = useSelector(
    (store: RootState) => store.sessions
  );

  const navigate = useNavigate();
  const from = "/";

  // Refs
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

  // Effects
  useEffect(() => {
    // set page title
    document.title = "Cadastrar-se | Contact Hub";
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
    const passwordConfirmation = passwordConfirmationRef?.current?.value;
    const firstName = firstNameRef?.current?.value;
    const lastName = lastNameRef?.current?.value;

    // Perform form validations
    if (!email || !password || !passwordConfirmation || !firstName || !lastName)
      return toast.error("Por favor, preencha todos os campos");

    if (password !== passwordConfirmation)
      return toast.error("As senhas não coincidem");

    // payload
    const details: CreateUserPayload = {
      email,
      password,
      password_confirmation: passwordConfirmation,
      first_name: firstName,
      last_name: lastName,
    };

    // sign in user with useLogIn hook
    dispatch(signUpUser(details));
  };

  return (
    <section className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-[100svh] lg:py-0">
      <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900">
        <img className="mr-2 h-10 w-10" src={Logo} alt="logo" />
        Contact Hub
      </div>
      <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1>Cadastrar-se</h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* first name */}
            <div>
              <label
                htmlFor="first_name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Nome
              </label>
              <input
                ref={firstNameRef}
                type="text"
                name="first_name"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                placeholder="João"
                required
                autoFocus
              />
            </div>
            {/* last name */}
            <div>
              <label
                htmlFor="last_name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Sobrenome
              </label>
              <input
                ref={lastNameRef}
                type="text"
                name="last_name"
                id="last_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                placeholder="Silva"
                required
              />
            </div>
            {/* email */}
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
              />
            </div>
            {/* password */}
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
            {/* password confirmation */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Confirmar senha
              </label>
              <input
                ref={passwordConfirmationRef}
                type="password"
                name="password_confirmation"
                id="password_confirmation"
                placeholder="••••••••"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                required
                autoComplete="current-password"
              />
            </div>
            {/* submit button */}
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

          {/* sign in link */}
          <p className="text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <Copyright />
    </section>
  );
}
