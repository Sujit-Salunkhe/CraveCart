"use client";
import { useRouter, usePathname, use } from "next/navigation";
import NewNavBar from "./NewNavBar.js";
import HomeTitle from "./homeTitle.js";
const SelectNavBar = () => {
  const path = usePathname();

  return path === "/" ? <HomeTitle /> : path === '/login' || path === '/register' ?  <noscript/> : <NewNavBar />;
};

export default SelectNavBar;
