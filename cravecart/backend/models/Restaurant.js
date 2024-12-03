import mongoose from "mongoose";
import { type } from "os";
const ResturantMenusSchema = new mongoose.Schema({
  type: String,
  menu: [
    {

      title: {
        type:String,
        require:true
      },
      image: {type:String,
        require:true
      },
      price: {
        type:Number,
        require:true
      },
      description:String
    }
  ],
},{
  timestamps:true
});

const RegularResturantMenu = mongoose.model("RegularResturantMenu", ResturantMenusSchema);

export default RegularResturantMenu;