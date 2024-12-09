"use client";
// import brandImages from "@/data/dishes";
import brandImages from "@/data/dishes";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppDispatch } from "@/lib/hooks";
import { addBrand } from "@/lib/features/LocationReducer/locationreducer";
import Image from "next/image";
import Link from "next/link";

const DishesSlider = () => {
  const [back, setBack] = useState(0);
  const [forward, setForward] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useAppDispatch() 

  const handleForward = () => {
    if (forward < brandImages.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => {
        setForward((prev) => prev + 1);
        setBack((prev) => prev + 1);
      }, 300); 
    }
  };

  const handleBack = () => {
    if (back > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => {
        setForward((prev) => prev - 1);
        setBack((prev) => prev - 1);
      }, 300);
    }
  };

  return (
    <div className="relative flex justify-between items-center mt-14 overflow-hidden w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out" 
        style={{
        //   transform: `translateX(${-currentIndex * (100 / 6)}%)`, // Smooth translate based on current index
        }}
      >
        {brandImages.slice(back, forward).map((dish, i) => (
          <div
            key={i}
            className="text-customColor flex flex-col items-center w-1/6 px-4"
            onClick={() => dispatch(addBrand(dish.name))}
          >
            <div className="relative inline-block">
              <Link href={`/:${dish.name}`}>
              <Image
                src={dish.img}
                alt={dish.name}
                className="h-44 w-44 rounded-md no-scrollbar cursor-pointer transition-transform duration-500 ease-in-out"
                
              />
              </Link>
              {i === 0 && back >= 1 && (
                <button
                  className="text-customColor border-2 absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10 h-6 w-6 md:h-8 md:w-8 rounded-full flex justify-center items-center transition duration-300 ease-in-out hover:bg-gray-200 active:scale-90"
                  onClick={handleBack}
                >
                  <IoIosArrowBack />
                </button>
              )}
              {i === 5 && forward <= brandImages.length - 1 && (
                <button
                  className="text-customColor border-2 border-black rounded-full absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 z-10 h-6 w-6 md:h-8 md:w-8 flex justify-center items-center transition duration-300 ease-in-out hover:bg-gray-200 active:scale-90"
                  onClick={handleForward}
                >
                  <IoIosArrowForward />
                </button>
              )}
            </div>
            <p className="text-customColor mt-3 text-laptop font-semibold md:text-tab sm:text-mobile">{dish.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishesSlider;



