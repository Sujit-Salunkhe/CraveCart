import { StepperInput } from "@/components/ui/stepper-input";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
// import {Button} from "@/components/ui/button";
import { Button } from "@mui/material";
import { useState } from "react";
import {handleOrderDisplay,addOrder,handlePrice} from '@/lib/features/orderreducer';
import PayoutComponent from "./PayoutComponent";
const MenuCard = ({ dishMenu, brand,otherMenu }) => {
  // const isOrder = useAppSelector((state) => state.order.isOrder);
  const [clickButton, setClickButton] = useState([]);
  const dispatch = useAppDispatch()
  const isOrder = useAppSelector((state) => state.order.isOrder);
  const handleClick = (menuid,menu) => {
    const menuWithQuantity = {
      ...menu,
      quantity:"1"
    }
    dispatch(handleOrderDisplay(true));
    dispatch(addOrder(menuWithQuantity));
    setClickButton(prev => [...prev,menuid])
  }
  const handleChangeValue = (e,menu_id,menu) => {
    if(e.value === "0"){
       const buttonClicks = clickButton.filter(id => id !== menu_id)
       setClickButton([...buttonClicks])
       dispatch(handlePrice(menu))
       
      }
    else{
      const menuWithQuantity = {
        ...menu,
        quantity:e.value
      }
      dispatch(addOrder(menuWithQuantity))
    }
  }
  return (
    <div className="flex flex-wrap justify-evenly ml-[64px] mr-[64px] text-customColor rounded">
      {!otherMenu && dishMenu.map((menu) => (
        <div
          className="w-[265.7px] min-h-[340px] rounded-xl overflow-hidden border border-gray-200 shadow-md mt-5 bg-white cursor-pointer transition-transform transform hover:scale-105"
          key={menu._id} 
        >
          <div className="relative w-full h-[200px] border-b border-gray-200">
            <img
              src={menu.image} 
              alt={menu.title}
              className="w-full h-full object-cover rounded-t-xl"
            />
          </div>
          <div className="p-3">
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {menu.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 font-semibold">
              {brand &&`${brand} •`} {menu.price} • Rs for one
            </p>
            
            {clickButton.includes(menu._id) ? (
              <>
              <p className="text-sm text-gray-600 mb-2">Add • Quantity</p>
              <StepperInput
                className="text-customColor self-baseline text-sm border-black"
                min={0}
                max={10}
                defaultValue={1}
                onValueChange = {(e) => handleChangeValue(e,menu._id,menu)}
              />
              </>
            ) : (
              <><p className="text-sm  text-gray-600 mb-2">Add • Your • Order</p>
              <Button
                className="text-sm text-gray-600"
                variant="outlined"
                color="error"
                onClick={() => handleClick(menu._id,menu)}
              >
                Add <sup className="text-mobile">+</sup>
              </Button>
              </>
            )}
          </div>
        </div>
      ))}
      {
        otherMenu &&  dishMenu.map(types => (
          <div id={types.type} key={types._id}>
            <h2 className="text-xl font-bold mb-4 mt-4">{types.type}</h2>
            <div className="flex flex-wrap gap-4">
            {types.menu.map(dish => (
                <div
                className="w-[265.7px] h-min-[340px] rounded-xl overflow-hidden border border-gray-200 shadow-md mt-5 bg-white cursor-pointer transition-transform transform hover:scale-105"
                key={dish._id} 
              >
                <div className="relative w-full h-[200px] border-b border-gray-200">
                  <img
                    src={dish.image}  
                    alt={dish.title}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {dish.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">
                    {brand &&`${brand} •`} {dish.price} • Rs for one
                  </p>
                  
                  {clickButton.includes(dish._id) ? (
                    <>
                    <p className="text-sm text-gray-600 mb-2">Add • Quantity</p>
                    <StepperInput
                      className="text-customColor self-baseline text-sm border-black"
                      min={0}
                      max={10}
                      defaultValue={1}
                      onValueChange = {(e) => handleChangeValue(e,dish._id,dish)}
                    />
                    </>
                  ) : (
                    <><p className="text-sm  text-gray-600 mb-2">Add • Your • Order</p>
                    <Button
                      className="text-sm text-gray-600"
                      variant="outlined"
                      color="error"
                      onClick={() => handleClick(dish._id,dish)}
                    >
                      Add <sup className="text-mobile">+</sup>
                    </Button>
                    </>
                  )}
                </div>
              </div>
            ))}  
            </div> 
          </div>
        ))
      }
    {isOrder && <PayoutComponent />}
    </div>
  );
};

export default MenuCard;
