import Options from "./options";
export default function Home() {

  return (
    <div
      style={{
        backgroundImage: `url('/main.png')`,
        height: "40vh",
        display: "flex",
        direction: "column",
      
      }}
      className="w-full h-[50vh] flex flex-col justify-center items-center text-customColor"
    >
      <p className="font-semibold text-[70px] font-fraunces text-white">CraveCart</p>
      <p className="font-semibold text-[35px] font-fraunces text-white">
        Satisfy Your Hunger in a Snap!
      </p>
      <Options />
      
    </div>
  );
}
