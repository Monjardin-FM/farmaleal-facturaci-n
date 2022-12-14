import React from "react";
import { AppFormCFDI } from "../app-form-cfdi/app-form-cfdi";
import { Header } from "../presentation/components/AppHeader";
import FarmalealLogo from "../assets/img/farmaleal-logo.png";

export const Home = () => {
  const handleClick = () => {
    console.log("Facturama");
  };
  return (
    <>
      <div className="h-screen text-xl font-semibold w-full flex flex-col">
        <Header />
        <div className="flex flex-col justify-center mt-5">
          <div className=" flex justify-center max-sm:mx-3">
            <AppFormCFDI />
          </div>
        </div>
        <div className="mt-5 flex items-center space-x-4 justify-center mb-5 ">
          <div className="text-center text-sm font-medium text-gray-600 mb-5">
            Desarrollado por
          </div>

          <div className="mb-5">
            <a href="https://www.farmaleal.com.mx/" target="__blank">
              <img
                title="Farmaleal "
                className="mx-auto w-16"
                src={FarmalealLogo}
                alt="Farmaleal Logotype"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
