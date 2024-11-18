import React, { useState } from "react";
import DragonIcon from "../../Icons/DragonIcon";
import CardBlankIcon from "../../Icons/CardBlankIcon";
import PeopleGroupIcon from "../../Icons/PeopleGroupIcon";
import PiggyBankIcon from "../../Icons/PiggyBankIcon";
import AxeBattleIcon from "../../Icons/AxeBattleIcon";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changePage } from "../../store/appSlice";

const Footer: React.FC = () => {
  const activePage = useAppSelector((state) => state.app.activePage);
  const dispatch = useAppDispatch();

  return (
    <div className="px-[4.26vw] fixed w-screen bottom-[5.33vw] z-20">
      <div className="flex p-[1.06vw] rounded-[2.66vw] border-[0.26vw] border-[#FB6648] justify-between bg-[#221E33]">
        <div
          className={`w-[12.8vw] h-[12.8vw] px-[1.33vw] pt-[1.33vw] pb-[0.8vw] flex flex-col items-center rounded-[1.6vw] cursor-pointer ${
            activePage === "mine" ? "bg-[#FA6648]" : ""
          }`}
          onClick={() => dispatch(changePage("mine"))}
        >
          <DragonIcon
            fill={activePage === "mine" ? "#221E33" : "#AAAAAA"}
            className="w-[7.2vw] h-[7.2vw] mb-[0,74vw] flex-none"
          />
          <span
            className={`text-[2.66vw] font-medium ${
              activePage === "mine" ? "text-[#221E33]" : "text-[#AAAAAA]"
            }`}
          >
            Mine
          </span>
        </div>
        <div
          className={`w-[12.8vw] h-[12.8vw] px-[1.33vw] pt-[1.33vw] pb-[0.8vw] flex flex-col items-center rounded-[1.6vw] cursor-pointer ${
            activePage === "cards" ? "bg-[#FA6648]" : ""
          }`}
          onClick={() => dispatch(changePage("cards"))}
        >
          <CardBlankIcon
            fill={activePage === "cards" ? "#221E33" : "#AAAAAA"}
            className="w-[7.2vw] h-[7.2vw] mb-[0,74vw] flex-none"
          />
          <span
            className={`text-[2.66vw] font-medium ${
              activePage === "cards" ? "text-[#221E33]" : "text-[#AAAAAA]"
            }`}
          >
            Cards
          </span>
        </div>
        <div
          className={`w-[12.8vw] h-[12.8vw] px-[1.33vw] pt-[1.33vw] pb-[0.8vw] flex flex-col items-center rounded-[1.6vw] cursor-pointer relative ${
            activePage === "friends" ? "bg-[#FA6648]" : ""
          }`}
          onClick={() => dispatch(changePage("friends"))}
        >
          <PeopleGroupIcon
            fill={activePage === "friends" ? "#221E33" : "#AAAAAA"}
            className="w-[7.2vw] h-[7.2vw] mb-[0,74vw] flex-none"
          />
          <span
            className={`text-[2.66vw] font-medium ${
              activePage === "friends" ? "text-[#221E33]" : "text-[#AAAAAA]"
            }`}
          >
            Friends
          </span>
        </div>
        <div
          className={`w-[12.8vw] h-[12.8vw] px-[1.33vw] pt-[1.33vw] pb-[0.8vw] flex flex-col items-center rounded-[1.6vw] cursor-pointer ${
            activePage === "earn" || activePage === "daily-checkin"
              ? "bg-[#FA6648]"
              : ""
          }`}
          onClick={() => dispatch(changePage("earn"))}
        >
          <PiggyBankIcon
            fill={
              activePage === "earn" || activePage === "daily-checkin"
                ? "#221E33"
                : "#AAAAAA"
            }
            className="w-[7.2vw] h-[7.2vw] mb-[0,74vw] flex-none"
          />
          <span
            className={`text-[2.66vw] font-medium ${
              activePage === "earn" || activePage === "daily-checkin"
                ? "text-[#221E33]"
                : "text-[#AAAAAA]"
            }`}
          >
            Earn
          </span>
        </div>
        <div
          className={`w-[12.8vw] h-[12.8vw] px-[1.33vw] pt-[1.33vw] pb-[0.8vw] flex flex-col items-center rounded-[1.6vw] cursor-pointer ${
            activePage === "battle" ? "bg-[#FA6648]" : ""
          }`}
          onClick={() => dispatch(changePage("battle"))}
        >
          <AxeBattleIcon
            fill={activePage === "battle" ? "#221E33" : "#AAAAAA"}
            className="w-[7.2vw] h-[7.2vw] mb-[0,74vw] flex-none"
          />
          <span
            className={`text-[2.66vw] font-medium ${
              activePage === "battle" ? "text-[#221E33]" : "text-[#AAAAAA]"
            }`}
          >
            Battle
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
