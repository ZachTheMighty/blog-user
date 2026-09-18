import { Link } from "react-router";
export default function ({ to, text }) {
  return (
    <Link
      to={to}
      className="text-pink-700 hover:text-pink-600 active:text-pink-700"
    >
      {text}
    </Link>
  );
}
