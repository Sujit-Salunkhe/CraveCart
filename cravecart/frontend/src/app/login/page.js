"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import HandleCredentials from "@/utils/HandleCredentials";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const router = useRouter()

  useEffect(() => {
    if (email && password && !error) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);



  const handleInputs = (e) => {
    if (e.target.name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(e.target.value)) {
        setEmail(e.target.value);
        setError("");
      } else {
        setEmail(e.target.value);
        setError("Email is Not Valid");
      }
    } else if (e.target.name === "password") {
      if (e.target.value.length >= 6) {
        setPassword(e.target.value);
        setError("");
        setDisabled(true);
      } else {
        setDisabled(true);
        setPassword(e.target.value);
        setError("password must be 6 characters long.");
      }
    }
  };
  const handleFocus = (e, inputRef) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    try {
      axios
      .post("http://localhost:5000/login", {
        email,
        password,
      })
      .then((data) => {
        router.push('/');
        HandleCredentials(true,data.data)
        console.log(data.data);
      })
      .catch((e) => console.log(e));
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-neumorphic text-black w-[400px]">
        <h3 className="text-black text-[24px] font-bold">Sign In</h3>
        <p className="text-gray-400 text-mobile">
          Enter your email and password to log in, then click 'Login'.
        </p>
        <form onSubmit={handleSumbit} className="mt-2">
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
              autoFocus
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
            />
          </label>
          {error && (
            <p className="text-red-500 text-mobile font-bold">{error}</p>
          )}
          <p>
            If you are not register click here ?
            <Link href="/register" className="text-blue-600 pr-2">
              register
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
