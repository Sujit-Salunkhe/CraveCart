"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import PostRequest from "@/utils/PostRequest";
import Image from "next/image";
import Rating from "./Rating";
const RestaurantsBasedOnCityName = () => {
  const city = useAppSelector((state) => state.main.city);
  const [location, setLocation] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const fetchCityName = async (city) => {
    const options = {
      method: "GET",
      url: "https://google-map-places.p.rapidapi.com/maps/api/place/findplacefromtext/json",
      params: {
        input: `${city}`,
        inputtype: "textquery",
        fields: "all",
        language: "en",
      },
      headers: {
        "x-rapidapi-key": "2647de9878msha440c3f6fc552bfp1b2741jsnd6e87afd29e0",
        "x-rapidapi-host": "google-map-places.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const firstIndex = response.data.candidates[0];
      const { lat: latitude, lng: longitude } = firstIndex.geometry.location;
      const location = { coords: { latitude, longitude } };
      setLocation(location);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCityName(city);
  }, [city]);

  return (
    <div>
      <PostRequest
        location={location}
        image={{image:false}}
        setRestaurants={setRestaurants}
      />
      <p className="text-customColor mt-10 text-heading2Mobile md:text-heading2Tab xl:text-heading2laptop">
        Restaurants in {city}
      </p>
      <div className="flex flex-wrap justify-between">
        {restaurants.length > 0  && restaurants.map((restaurant) => (
          <div
            key={restaurant.name}
            className="w-[265.7px] min-h-[340px] rounded-xl flex flex-col mt-5 border-2 cursor-pointer"
          >
            <img
              src={restaurant.image}
              className="w-[265.7px] cursor-pointer rounded-xl"
            />
            <div className="rounded-xl ml-2 mt-2">
              <p className="text-customColor break-words">{restaurant.name}</p>
              {restaurant.user_ratings_total && (
                <p className="text-customColor">
                  TotalRatings: {restaurant.user_ratings_total}
                </p>
              )}
              <div className="text-customColor">
                {<Rating Rating={restaurant.rating} />}
              </div>
              {/* <div className=" text-customColor">{restaurant.vicinity}</div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantsBasedOnCityName;
