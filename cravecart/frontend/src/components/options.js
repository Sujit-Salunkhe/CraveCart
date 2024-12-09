import { IoMdSearch } from "react-icons/io";
import SelectCities from "./selectcities";

const options = () => {
  return (
    <div className="w-[530px] h-[38px] bg-white flex items-center  justify-evenly  rounded-lg mt-3">
      <SelectCities />
      <div className="flex items-center justify-start child w-[70%] ">
        <IoMdSearch
          style={{ color: "black", height: "20px", width: "20px" }}
          className="mr-3"
        />
        <input
          type="text"
          placeholder="Search for restaurant, cuisine or a dish"
          className="child w-full text-customColor border-none focus:outline-none border-b-2 border-black-400"
        />
      </div>
    </div>
  );
};

export default options;
