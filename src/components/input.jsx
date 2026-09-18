import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({
  type,
  text = type,
  name = type,
  value,
  setValue,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col justify-center relative">
      <label htmlFor={name}>{text[0].toUpperCase() + text.slice(1)}:</label>
      {type === "password" && !showPassword ? (
        <Eye
          onClick={() =>
            setShowPassword((prevShowPassword) => !prevShowPassword)
          }
          className="absolute right-5 top-11 text-black/30 hover:text-black active:text-black/30"
        />
      ) : type === "password" ? (
        <EyeOff
          onClick={() =>
            setShowPassword((prevShowPassword) => !prevShowPassword)
          }
          className="absolute right-5 top-11 text-black/30 hover:text-black active:text-black/30"
        />
      ) : (
        ""
      )}
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={`Enter ${text}`}
          className="outline-1 outline-black/10 p-5 over:outline-1 hover:outline-pink-600 focus:outline-2 focus:outline-pink-600"
        ></textarea>
      ) : (
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          name={name}
          id={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="outline-1 outline-black/10 p-5 over:outline-1 hover:outline-pink-600 focus:outline-2 focus:outline-pink-600"
          placeholder={`Enter ${text}`}
        />
      )}
      {errors !== "s" && (
        <ul className="list-disc mt-3">
          {errors?.status === 422 &&
            errors.errors.map((error, index) => {
              if (error.path === name)
                return (
                  <li key={index} className="text-red-500 font-bold text-xs">
                    {error.msg}
                  </li>
                );
            })}
          {errors?.status === 401 && errors.path === name && (
            <li className="text-red-500 font-bold text-xs">{errors.errors}</li>
          )}
        </ul>
      )}
    </div>
  );
}
