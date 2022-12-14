import FarmalealLogo from "../../../assets/img/farmaleal-logo.png";
import { Player } from "@lottiefiles/react-lottie-player";
import Invoice from "../../../assets/json/animations/invoice.json";
import "../../../assets/css/form-background.css";
export const Header = () => {
  return (
    <div className="flex items-center justify-between h-24 max-sm:h-20 max-sm:mt-2 background-form mx-5 max-sm:mx-3 mt-3">
      <div className="flex flex-row items-center text-lg max-sm:text-sm font-semibold text-primary-600">
        <div className="w-20 m-6 max-sm:w-16">
          <img src={FarmalealLogo} alt="FarmaLeal" />
        </div>
        <div>
          <p>Farma Leal Facturación</p>
        </div>
      </div>
      <div className=" w-40 max-sm:w-24">
        <Player
          autoplay
          loop
          src={Invoice}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};
