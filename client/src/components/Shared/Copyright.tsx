const Copyright = () => {
  return (
    <p className="my-10 text-sm text-center text-gray-500">
      &copy; {new Date().getFullYear()} —{" "}
      <a
        href="https://contact-hub.vercel.app/"
        className="hover:underline"
        target="_blank"
      >
        Contact Hub
      </a>
      . Todos os direitos reservados.
    </p>
  );
};
export default Copyright;
