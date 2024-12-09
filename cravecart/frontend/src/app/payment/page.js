"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { MdDelete } from "react-icons/md";
import HandleCredentials from "@/utils/HandleCredentials";
import { handlePrice } from "@/lib/features/orderreducer";
const page = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const orders = useAppSelector((state) => state.order.order);
  const totalPrice = useAppSelector((state) => state.order.totalPrice);
  const TotalPayble = Number(totalPrice) + 10 + 30;
  const dispatch = useAppDispatch();
  useEffect(() => {
    const { payload } = HandleCredentials(false, {});
    setName(payload.name);
  }, []);
  return (
    <>
      <div className="mr-[64px] ml-[64px]  ">
        <div className="mt-5 flex justify-between">
          <table className="mx-auto   bg-white  rounded-lg overflow-hidden text-customColor text-center   shadow-lg w-[60%] ml-3 border-black border-2 cursor-pointer p-3">
            <caption className="text-gray-500 lg:text-heading2laptop md:text-heading2Tab sm:text-heading2Mobile  mb-3 text-center">
              Order Summary
            </caption>
            <thead>
              <tr className=" text-customColor font-bold border-2 border-black">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Quantity</th>
                <th className="py-2 px-3">Delete</th>
                <th className="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition-colors duration-300 border-2 border-black`}
                >
                  {/* <td className="py-2 px-4 flex justify-center items-center">
                    <img
                      src={order.image}
                      alt={order.title}
                      className="w-16 h-16 object-cover rounded-md border-2 border-gray-300"
                    />
                  </td> */}
                  <td className="py-2 px-4 font-semibold text-gray-700">
                    {order.title}
                  </td>
                  <td className="py-2 px-4 text-gray-700">{order.price} Rs</td>
                  <td className="py-2 px-4 text-gray-700">{order.quantity}</td>
                  <td
                    className="py-2 px-4 flex justify-center items-center"
                    onClick={() =>  dispatch(handlePrice(order))}
                  >
                    <MdDelete style={{ width: "25px", height: "25px" }} />
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {order.quantity * order.price} Rs
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 px-4 text-gray-700">Total</td>
                <td></td>
                <td></td>
                <td></td>
                <td className="py-2 px-4 text-customColor">{totalPrice} Rs</td>
              </tr>
            </tfoot>
          </table>
          <div className="w-[30%] shadow-xl ml-2 p-3 text-customColor lg:text-heading2laptop md:text-heading2Tab sm:text-heading2Mobile border-customColor border-2">
            <p className="text-gray-500 lg:text-heading2laptop md:text-heading2Tab sm:text-heading2Mobile mb-2">
              Total Payable
            </p>
            <ul className="text-customColor ml-4 text-laptop">
              <li>
                <p className="text-customColor inline">Order Total:</p>{" "}
                {totalPrice}Rs
              </li>
              <li>
                <p className="text-customColor inline">Platform Charges:</p>{" "}
                10Rs
              </li>
              <li>
                <p className="text-customColor inline">Delivery Charges:</p>{" "}
                30Rs
              </li>
              <li>
                <p className="text-customColor inline">TotalPayble:</p>{" "}
                {TotalPayble} Rs
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-3">
          <div className="w-[40%]  shadow-xl p-3">
            <p className="text-gray-500 lg:text-heading2laptop md:text-heading2Tab sm:text-heading2Mobile mb-2 ">
              Your Details
            </p>
            <Label
              htmlFor="nameInput"
              className="text-mobile md:text-tab lg:text-laptop text-customColor mb-2 mt-5 block"
            >
              Name
            </Label>
            <Input
              id="nameInput"
              type="text"
              className="text-customColor focus:border-red-500"
              value={name}
              placeholder="What's Your Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Label
              htmlFor="Address"
              className="text-mobile md:text-tab lg:text-laptop text-customColor mt-5 mb-2 block"
            >
              Address
            </Label>

            <textarea
              id="Address"
              className="text-customColor flex  w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus:border-red-500"
              value={address}
              placeholder="What's Your Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <Label
              htmlFor="city"
              className="text-mobile md:text-tab lg:text-laptop text-customColor mb-2 mt-5 block"
            >
              City
            </Label>
            <Input
              id="city"
              type="text"
              className="text-customColor focus:border-red-500"
              value={city}
              placeholder="What's Your City Name"
              onChange={(e) => setCity(e.target.value)}
            />
            <Label
              htmlFor="city"
              className="text-mobile md:text-tab lg:text-laptop text-customColor mb-2 mt-5 block"
            >
              PinCode
            </Label>
            <Input
              id="PinCode"
              type="text"
              className="text-customColor focus:border-red-500"
              value={pinCode}
              placeholder="What's Your PinCode"
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
