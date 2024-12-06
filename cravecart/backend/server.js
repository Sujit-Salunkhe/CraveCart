import express from "express";
import cors from "cors";
import BasedOnLocation from "./RouteHandleres/BasedOnlocation.js";
import RestaurantMenu from "./RouteHandleres/RestaurantMenu.js";
import { RestaurantRegularMenu } from "./RouteHandleres/RestaurantMenu.js";
import ConnectDB from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import userRoutes from './routes/userRoutes.js'

import bodyParser from "body-parser";

// Absolute path to .env file
const envPath = path.resolve(
  "C:\\Users\\Sujit\\OneDrive\\Desktop\\Practice\\foodDelivery\\cravecart\\.env"
);

dotenv.config({ path: envPath });
const app = express();
ConnectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({ 
//     extended: false,
//   })
// );
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;
app.post("/location", BasedOnLocation);
app.get("/Restaurant/:brand", RestaurantMenu);
app.post("/Regular/menu", RestaurantRegularMenu);
app.use("/",userRoutes);
app.use("/login")

app.get("/", (req, res) => {
  res.send("This is server page");
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
