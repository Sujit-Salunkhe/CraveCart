import DishesSlider from "@/components/DishesSlider";
import NearByRestaurants from "@/components/nearbyresturants";
import RestaurantsBasedOnCityName from "@/components/RestaurantsBasedOnCityName";

export default function Home() {
  return (
    <>
      {/* <header>
      <SelectNavBar/>
      </header> */}
      <main className="ml-[128px] mr-[128px] mt-[20px]">
        <div>
          <p className="text-heading2Mobile md:text-heading2Tab xl:text-heading2laptop ">
            Satisfy Your Cravings, One Click Away
          </p>
        </div>
        <DishesSlider />
        <NearByRestaurants/>
        {/* <RestaurantsBasedOnCityName/> */}
      </main>
    </>
  );
}
