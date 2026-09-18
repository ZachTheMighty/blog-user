import { UserRound } from "lucide-react";
import { Link } from "react-router";

export default function Navbar({ userName }) {
  return (
    <div className="sm:flex sm:justify-between sm:items-center">
      <Link
        to="/dashboard"
        className="text-xl sm:text-2xl font-bold lg:text-3xl hover:text-pink-500 active:text-pink-600"
      >
        Welcome back, {userName}
      </Link>
      <div className="p-2 hover:bg-gray-200 active:bg-gray-300 rounded-full">
        <UserRound />
      </div>
    </div>
  );
}
