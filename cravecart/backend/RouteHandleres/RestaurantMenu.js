import BrandMenu from "../models/BrandMenu.js";
import RegularResturantMenu from "../models/Restaurant.js";
const RestaurantMenu = async (req, res) => {
  const brand = req.params.brand;
  const RestaurantBrand = await BrandMenu.find({ brand: `${brand}` });
  res.status(201).send(RestaurantBrand);
};

export const RestaurantRegularMenu = async (req, res) => {
  try {
    const type = req.body.type;
    if (type.includes("bakery")) {
      const RestaurantMenu = await RegularResturantMenu.find({
        type: `cake`,
      });
      res.status(201).send(RestaurantMenu)
    }else{
      const Number = Math.floor(Math.random() * 5) + 1;
      const RestaurantMenu = await RegularResturantMenu.find({
        $and: [
          { type: { $ne: "cake" } },
          { type: { $ne: "ice_creme" } }
        ]
      });
      const Sending_Menu = RestaurantMenu.map(resturants => {
        return {id:resturants._id,type:resturants.type,menu:resturants.menu.slice(0,5),}
      })
      res.status(201).send(Sending_Menu)
      // res.status(201).send(RestaurantMenu)
    }
  } catch (error) {
    console.log(error);
  }

  // const RestaurantMenu = await RegularResturantMenu.find({type:`${type}`})
  // res.status(201).send(RestaurantMenu)
};

export default RestaurantMenu;
