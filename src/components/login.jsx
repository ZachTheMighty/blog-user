import { useState } from "react";
import Input from "./input.jsx";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("https://blog-api-ljzu.onrender.com/tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        isAuthor: false,
      }),
    });

    const data = await response.json();
    if (!response.ok)
      return setErrors({
        errors: data.error,
        path: data.path,
        status: response.status,
      });
    setErrors(null);
    navigate("/dashboard", { replace: true });
    localStorage.setItem("token", data.token);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-600">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col gap-4 px-8 py-16 rounded-md bg-white sm:p-16 w-full md:w-150 lg:w-200"
      >
        <h1 className="text-3xl text-center mb-8 text-gray-600">Login</h1>
        <Input type="email" value={email} setValue={setEmail} errors={errors} />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          errors={errors}
        />

        <button className="bg-pink-700 min-w-full px-4 py-2 text-white font-medium hover:bg-pink-600 active:bg-pink-700">
          SIGN IN
        </button>
        <div className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-pink-700 hover:text-pink-600 active:text-pink-700"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
