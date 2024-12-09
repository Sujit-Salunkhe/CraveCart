import { useAppSelector } from "@/lib/hooks";
import { Button } from "@mui/material";
import Link  from "next/link";
const PayoutComponent = () => {
  const order = useAppSelector((state) => state.order.order);
  const price = useAppSelector((state) => state.order.totalPrice);
  return order.map(
    (menu, i) =>
      i === 0 && (
        <div
          className={`flex rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white cursor-pointer transition-all duration-500 transform z-10 fixed bottom-0 mb-8 w-[40%] p-2 items-center justify-around ${
            order ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
          key={menu._id}
        >
          <img
            src={menu.image}
            alt={menu.title}
            className="object-cover rounded-xl w-[17%]"
          />
          <div className="ml-4">
            <p className="text-gray-600 text-mobile">{menu.title}</p>
            <p className="text-gray-600 text-mobile">Price: {menu.price}Rs</p>
            <p className="text-gray-600 text-mobile">TotalPrice: {price}Rs</p>
          </div>
          <Link href="/payment">
            <Button
            className="text-sm text-gray-600"
            variant="outlined"
            color="error"
            >
            Pay Order
          </Button>
          </Link>
        </div>
      )
  )}
  
  


export default PayoutComponent;
