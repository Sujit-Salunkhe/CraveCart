"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import MenuCard from "@/components/MenuCard";
import { removeOrder } from "@/lib/features/orderreducer";
const page = () => {
  const [menu, setMenu] = useState([]);
  const resturant = useAppSelector((state) => state.main.resturantDetails);
  // console.log(resturant)
  const resturants = [resturant];
  useEffect(() => {
    axios
      .post("http://localhost:5000/Regular/menu", {
        type: resturant.types,
      })
      .then((data) => {
        if(resturant.types.includes("bakery")){
          
          setMenu(data.data[0].menu)
        }else{
          setMenu(data.data)
        }
        ;
      });
  }, []);
  return (
    <div className="ml-[64px] mr-[64px]">
      <div className="text-black my-4">
        {resturants.map((resturant) => (
          <div key={resturant.name}>
            <p>Name: {resturant.name}</p>
            <p>Address: {resturant.vicinity}.</p>
            <p>Rating: {resturant.rating}</p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <p className="text-gray-500 mt-4 lg:text-heading2laptop md:text-heading2Tab sm:text-heading2Mobile text-center">
          Menu
        </p>
        {menu && <MenuCard dishMenu={menu} brand={resturants.name} otherMenu={true} />}
      </div>
    </div>
  );
};

export default page;
