import Input from "./input.jsx";
import { useState } from "react";
import Link from "./link.jsx";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("s");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/users", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        isAuthor: false,
      }),
    });

    const data = await response.json();
    if (!response.ok)
      return setErrors({ errors: data.error, status: response.status });
    setErrors(null);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-pink-600">
      <form
        onSubmit={(event) => handleSubmit(event)}
        className="flex flex-col gap-4 px-8 py-16 rounded-md bg-white sm:p-16 w-full md:w-200"
      >
        <h1 className="text-3xl text-center mb-8 text-gray-600">Sign Up</h1>
        <Input
          type="text"
          text="First Name"
          name="firstName"
          value={firstName}
          setValue={setFirstName}
          errors={errors}
        />
        <Input
          type="text"
          text="Last Name"
          name="lastName"
          value={lastName}
          setValue={setLastName}
          errors={errors}
        />
        <Input type="email" value={email} setValue={setEmail} errors={errors} />
        <Input
          type="password"
          value={password}
          setValue={setPassword}
          errors={errors}
        />
        <Input
          type="password"
          text="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          setValue={setConfirmPassword}
          errors={errors}
        />
        <button className="bg-pink-700 min-w-full px-4 py-2 text-white font-medium hover:bg-pink-600 active:bg-pink-700">
          SIGN UP
        </button>
        {errors?.status === 409 ? (
          <div>
            {errors.errors} Would you like to <Link to="/" text="Sign in" />{" "}
            instead?
          </div>
        ) : !errors ? (
          <div>
            Successfully created account. <Link to="/" text="Sign in" />
          </div>
        ) : (
          <div className="text-center">
            Already have an account? <Link to="/" text="Sign in" />
          </div>
        )}
      </form>
    </div>
  );
}
