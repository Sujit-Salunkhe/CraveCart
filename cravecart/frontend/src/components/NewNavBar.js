// 'use client'
import { IoMdSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import HandleRedirect from "../utils/HandleRedirect.js";
import Link from "next/link.js";

const NewNavBar = () => {
  return (
    <nav className="flex w-screen pl-[64px] pr-[64px] justify-between">
      <Link href='/'>
      <p className="font-semibold lg:text-heading1laptop md:text-heading1Tab sm:text-heading1Mobile font-fraunces text-customColor">
        CraveCart
      </p>
      </Link>
      <div className="flex items-center justify-start child w-[30%]">
        {/* <IoMdSearch
          style={{ color: "red", height: "20px", width: "20px" }}
          className="mr-3"
        /> */}
        <input
          type="text"
          placeholder=" Search for restaurant, cuisine or a dish"
          className="child text-customColor w-full  focus:outline-red-400 bg-white"
        />
      </div>
      <div className="flex  items-center  text-laptop cursor-pointer text-customColor">
        <ul className="flex w-full justify-between ">
          <Link href={"/login"}>
            <li>
              <button>Log In</button>
            </li>
          </Link>
          <Link href={"/register"}>
            <li className="ml-4">Sign In</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NewNavBar;
