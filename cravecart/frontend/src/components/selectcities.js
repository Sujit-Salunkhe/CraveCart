"use client";
import { BsChevronDoubleDown } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addCity } from "@/lib/features/LocationReducer/locationreducer";
import cities from "@/data/cities";
const SelectCities = () => {
  const [showCities, setShowCities] = useState(false);
  const city = useAppSelector((state) => state.main.city);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleClick = () => {
      setShowCities(false);
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleCityName = (event, cityName, number) => {
    dispatch(addCity(cityName));
    if (number === 1) {
      setShowCities(false);
    }
    event.stopPropagation();
  };
  const showHideCities = (event) => {
    setShowCities(!showCities);
    event.stopPropagation();
  };
  return (
    <div className="flex justify-around items-center text-customColor child w-[25%]  text-customColor  cursor-pointer border-r-2 border-black">
      <BsChevronDoubleDown
        style={{ color: "h4C1414", height: "20px", width: "20px" }}
        className="text-customColor"
        onClick={showHideCities}
      />
      <div
        className="text-customColor relative w-[90%]  ml-1"
        onClick={showHideCities}
      >
        <div className="relative">
          <div className="">{city}</div>
          <div className="absolute  left-0 z-10 bg-white border-black border-1 max-h-56 overflow-auto no-scrollbar mt-2 border-collapse">
            {showCities &&
              cities.map(
                (town) =>
                  city !== town.city && (
                    <p
                      key={town.city}
                      className="border-2 border-black border-collapse"
                      onClick={(event) => handleCityName(event, town.city, 0)}
                    >
                      {town.city}
                    </p>
                  )
              )}
            <hr />
            <hr />
            <hr />
            {showCities &&
              cities.map(
                (town) =>
                  town.city === city &&
                  town.areas.map((area) => (
                    <p
                      key={area}
                      className="border-2 border-black border-collapse"
                      onClick={(e) => handleCityName(e, area, 1)}
                    >
                      {area}
                    </p>
                  ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectCities;
