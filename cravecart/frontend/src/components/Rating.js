import React from "react";
import { IoStarOutline, IoStarHalf, IoStar } from "react-icons/io5";
const Rating = ({ Rating }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <p className="mr-2">Rating:</p>
        {Rating > 1 ? (
          <IoStar />
        ) : Rating <= 0.9 ? (
          <IoStarHalf />
        ) : (
          <IoStarOutline />
        )}
        {Rating > 2 ? (
          <IoStar />
        ) :Rating > 0.9 && Rating <= 1.9 && Rating > 2 ? (
          <IoStarHalf />
        ) : (
          <IoStarOutline />
        )}
        {Rating > 3 ? (
          <IoStar />
        ) :Rating > 1.9 && Rating <= 2.9 ? (
          <IoStarHalf />
        ) : (
          <IoStarOutline />
        )}
        {Rating > 4 ? (
          <IoStar />
        ) : Rating > 2.9 &&  Rating <= 3.9 ? (
          <IoStarHalf />
        ) : (
          <IoStarOutline />
        )}
        {Rating > 5 ? (
          <IoStar />
        ) :Rating > 3.9 &&  Rating <= 4.9 ? (
          <IoStarHalf />
        ) : (
          <IoStarOutline />
        )}
      </div>
    </div>
  );
};

export default Rating;
