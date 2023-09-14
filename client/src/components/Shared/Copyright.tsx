import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <p className="my-5 text-sm text-center text-gray-500">
      Contact Hub —{" "}
      <Link
        to="https://bruno.buzz/"
        className="hover:underline text-blue-400 hover:text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        Bruno Leite
      </Link>
    </p>
  );
};
export default Copyright;
