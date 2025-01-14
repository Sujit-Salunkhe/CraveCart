import BrandMenus from "./models/BrandMenu.js";
import RegularResturantMenu from "./models/Restaurant.js";
import Restaurantmenu from "./data/OtherMenus.js";
import RestaurantBrandMenu from "./data/BrandMenus.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import path from 'path'
const envPath = path.resolve('C:\\Users\\Sujit\\OneDrive\\Desktop\\Practice\\foodDelivery\\cravecart\\.env');
dotenv.config({path:envPath})
connectDB()
const importData = async() => {
    try {
        await BrandMenus.deleteMany()
        await RegularResturantMenu.deleteMany()
        await RegularResturantMenu.insertMany(Restaurantmenu)
        await BrandMenus.insertMany(RestaurantBrandMenu)
    } catch (error) {
        console.log(error)
    }
}

importData ()


const deleteData = async () => {
    try {
        await BrandMenus.deleteMany()
        await RegularResturantMenu.deleteMany()
        
    } catch (error) {
        console.log(error)
        
    }
}

// deleteData()