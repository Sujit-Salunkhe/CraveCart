"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import HandleCredentials from "@/utils/HandleCredentials";
const page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const router = useRouter();
  useEffect(() => {
    if (name && email && password && confirmPassword && !error) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password, confirmPassword]);

  

  const handleFocus = (e, inputRef) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };
  const handleInputs = (e) => {
    if (e.target.name === "name") {
      if (e.target.value.trim().length < 3) {
        setName(e.target.value);
        setError("Name must be at least 3 characters long.");
      } else {
        setName(e.target.value);
        setError("");
      }
    } else if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(e.target.value)) {
        setEmail(e.target.value);
        setError("");
      } else {
        setEmail(e.target.value);
        setError("Email is Not Valid");
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length >= 6) {
        setPassword(e.target.value);
        setError("");
      } else {
        setPassword(e.target.value);
        setError("password must be 6 characters long.");
      }
    }
    if (e.target.name === "confirmPassword") {
      if (e.target.value === password) {
        setConfirmPassword(e.target.value);
        setError("");
      } else {
        setConfirmPassword(e.target.value);
        setError(
          "Passwords do not match. Please Enter  same Passwored as password filed"
        );
      }
    }
  };

  const handleForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", {
        name,
        email,
        password,
      })
      .then((data) => {
        console.log(data);
        HandleCredentials(true,data.data)
        router.push("/");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-neumorphic text-black w-[400px]">
        <h3 className="text-black text-[24px] font-bold">Sign In</h3>
        <p className="text-gray-400 text-mobile">
          Provide your name, email, and password to register, then click Submit.
        </p>
        <form className="mt-2 text-black" onSubmit={handleForm}>
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-2">Name</span>
            <input
              className="bg-gray-100 w-full p-3 rounded-lg  shadow-inner-neumorphic focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={name}
              name="name"
              onChange={handleInputs}
              autoFocus
              onKeyDown={(e) => handleFocus(e, emailRef)}
            />
          </label>

          <label className="block mb-4">
            <span className="block text-sm font-medium mb-2">Email</span>
            <input
              className="bg-gray-100 w-full p-3 rounded-lg  shadow-inner-neumorphic focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              ref={emailRef}
              name="email"
              onChange={handleInputs}
              onKeyDown={(e) => handleFocus(e, passwordRef)}
            />
          </label>

          <label className="block mb-4 relative">
            <span className="block text-sm font-medium mb-2">Password</span>
            <input
              type="password"
              value={password}
              ref={passwordRef}
              name="password"
              className="bg-gray-100 w-full p-3 rounded-lg  shadow-inner-neumorphic focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleInputs}
              onKeyDown={(e) => handleFocus(e, confirmPasswordRef)}
            />
          </label>

          <label className="block mb-4">
            <span className="block text-sm font-medium mb-2">
              Confirm Password
            </span>
            <input
              className="bg-gray-100 w-full p-3 rounded-lg text-black shadow-inner-neumorphic focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={confirmPassword}
              ref={confirmPasswordRef}
              name="confirmPassword"
              onChange={handleInputs}
              onKeyDown={(e) => handleFocus(e, confirmPasswordRef)}
            />
          </label>
          {error && (
            <p className="text-red-500 text-mobile font-bold">{error}</p>
          )}
          <p>
            Already Have An Account?{" "}
            <Link href="/login" className="text-blue-600">
              Log in
            </Link>
          </p>
          <button
            type="submit"
            className={`p-3 bg-customColor text-white rounded-lg shadow-neumorphic  transition align mt-2  ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:bg-blue-400 cursor-pointer"
            }`}
            disabled={disabled}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default page;
