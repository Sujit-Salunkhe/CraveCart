"use client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { Suspense, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MenuCard from "@/components/MenuCard";
import PayoutComponent from "@/components/PayoutComponent";
const page = () => {
  const [brandMenu, setBrandMenu] = useState([]);
  const brand = useAppSelector((state) => state.main.brand);
  const price = useAppSelector((state) => state.order.totalPrice);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/Restaurant/${brand}`
      );
      setBrandMenu(data);
    };

    fetchData();  
  }, [brand]);

  return (
    <div className="mr-[64px] ml-[64px] flex justify-center items-center flex-col">
      <p
        className="text-customColor text-center mt-3 lg:
      text-heading2laptop md:text-heading2Tab sm:text-heading2Mobile"
      >
        {brand}
      </p>
      <Suspense fallback="...Loading">
        <main>
          {brandMenu.length > 0 &&
            brandMenu.map((dish) => (
              <div key={dish._id} className="border-pink-500 border-3">
                <MenuCard dishMenu={dish.menu} brand={brand} />
              </div>
            ))}
        </main>
      </Suspense>

      <div className="flex justify-center items-center child  overflow-hidden">
      
      </div>
    </div>
  );
};

export default page;
