import mongoose from "mongoose";
const BrandMenusSchema = new mongoose.Schema({
  brand: String,
  menu: [
    {
      title: String,
      image: String,
      price: Number,
    }
  ],
},{
  timestamps:true
});

const BrandMenu = mongoose.model("BrandMenu", BrandMenusSchema);

export default BrandMenu;
