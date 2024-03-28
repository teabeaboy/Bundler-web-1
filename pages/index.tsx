import React, { useEffect, useState } from "react";
import { getSearchLayout } from "../components/layouts/SearchLayout";
import { ReactNode } from "react";
function increaseNumberAnimation(elementId: string, endNumber: number, speed = 100) {
  const element = document.getElementById(elementId);

  if (!element) return;

  const animationRunning = JSON.parse(element.dataset.animationRunning ?? "false");

  if (animationRunning) return;

  element.dataset.animationRunning = "true";

  incNbrRec(1000, endNumber, element, speed);
}

function incNbrRec(currentNumber: number, endNumber: number, element: HTMLElement, speed: number) {
  if (currentNumber <= endNumber) {
    element.innerHTML = currentNumber.toString();
    setTimeout(function () {
      incNbrRec(currentNumber + 53, endNumber, element, speed);
    }, speed);
  } else {
    delete element.dataset.animationRunning;
  }
}

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Trigger number increase animation for each statistic
      increaseNumberAnimation('stat1', 2535);
      increaseNumberAnimation('stat2', 2123);
      increaseNumberAnimation('stat3', 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col max-w-[90vw] mx-auto">
      <div className="flex flex-col gap-12 justify-start  lg:justify-center lg:items-center  w-full h-full lg:flex-row my-12 max-h-[1000px]">
        <div className="max-w-[350px] lg:max-w-[700px] flex flex-col gap-6 h-full">
          <p className={`text-[42px] lg:text-[126px]  leading-[126px] text-center font-[HeliukBrave]  uppercase transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Mevarik Sniper for
            <span className="text-[#f5ac41] mx-4 relative">Apes & Degens</span>
          </p>
          <p className={`text-[42px] lg:text-[25px] leading-[126px] text-center font-mono font-bold transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            Mevarik
            <br />
            <span className="font-normal text-[18px]">
              Snipe upcoming launches or safely trade tokens that are already live
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-12 justify-around items-center  w-full h-full lg:flex-row my-8  bg-[#0e1117] shadow-lg shadow-gray/5 rounded-xl p-8">
        {/* Counting Statistics */}
        <div className="flex justify-center items-center flex-col">
          <p id="stat1" className="font-semibold text-[25px]">0</p>
          <p className="text-[#7f8083] font-light text-[14px]">Mintinglab Minted Token</p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p id="stat2" className="font-semibold text-[25px]">0</p>
          <p className="text-[#7f8083] font-light text-[14px]">Mintinglab User</p>
        </div>
        <div className="flex justify-center items-center flex-col">
          <p id="stat3" className="font-semibold text-[25px]">0</p>
          <p className="text-[#7f8083] font-light text-[14px]">7 Days New Mint
          </p>
        </div>
      </div>
    </div>
  );
};


Home.getLayout = (page: ReactNode) => getSearchLayout(page, "Home");

export default Home;