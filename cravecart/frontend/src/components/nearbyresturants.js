"use client";
export const fetchCache = "default-cache";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import PostRequest from "@/utils/PostRequest";
import { useAppDispatch } from "@/lib/hooks";
import { addLocation,addResturantDetails } from "@/lib/features/LocationReducer/locationreducer";
import Link from 'next/link'


const NearByRestaurants = () => {
  const [location, setLocation] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const dispatch = useAppDispatch();
  const setResturnatDetails = (restaurant) => {
          dispatch(addResturantDetails(restaurant))
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch(addLocation({ latitude, longitude }));
        setLocation(position);
      });
    }
  }, []);
  return (
    <>
      <PostRequest
        location={location}
        setRestaurants={setRestaurants}
        image={{ image: true }}
      />
      <p className="text-customColor mt-10 text-heading2Mobile md:text-heading2Tab xl:text-heading2laptop">
        Near By Restaurants ...
      </p>
      <div className="flex flex-wrap justify-between">
        {restaurants.length > 0 &&
          restaurants.map((restaurant) => (
            <Link href={`/restaurants/:${restaurant.name}`}>
            <div
              onClick={ () => setResturnatDetails(restaurant)}
              key={restaurant.name}
              className="w-[265.7px] min-h-[340px] rounded-xl overflow-hidden border border-gray-200 shadow-md mt-5 bg-white cursor-pointer transition-transform transform hover:scale-105 "
            >
              <div className="relative w-full h-[200px] border-b border-gray-200">
                <img
                  src={restaurant.image}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
              <div className="rounded-xl ml-2 mt-2">
                <p className="text-lg font-bold  mb-1 text-customColor ">
                  {restaurant.name}
                </p>
                {restaurant.user_ratings_total && (
                  <p className="text-sm text-customColor mb-2 font-semibold">
                    TotalRatings: {restaurant.user_ratings_total}
                  </p>
                )}
                <div className="text-customColor">
                  {" "}
                  {<Rating Rating={restaurant.rating} />}
                </div>
                {/* <div className=" text-customColor">{restaurant.vicinity}</div> */}
              </div>
            </div>
            </Link>
          ))}
      </div>
    </>
  );
};

      

export default NearByRestaurants;
