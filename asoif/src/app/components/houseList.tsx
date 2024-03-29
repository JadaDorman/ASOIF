"use client";
import React, { useState } from "react";
import Image from "next/image";
import HouseModal from "./houseModal";
import { houseCrests } from "../helpers/houseCrests";
import { House } from "../types/houseTypes";

interface HouseListProps {
  swornMembersByHouse: House[];
}

const HouseList = ({ swornMembersByHouse }: HouseListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState("");

  const handleClickedHouse = (name: string) => {
    setSelectedHouse(name);
    setIsModalOpen(true);
  };

  const selectedSwornMembers = swornMembersByHouse.find(
    (house: { houseName: string }) => house.houseName === selectedHouse
  )?.swornMembers;

  return (
    <>
      <ul className="flex grid grid-cols-5 gap-x-6 gap-y-32" id="house-list">
        {swornMembersByHouse.map((house: House) => (
          <li
            className="static transition hover:ease-in hover:opacity-50 hover:duration-300  hover:scale-110 "
            id="house-list-item"
            key={house.houseName}
          >
            <button
              onClick={() => handleClickedHouse(house.houseName)}
              key={house.houseName}
            >
              <div className=" grid grid-row-2 gap-y-14">
                <div className="flex relative justify-center h-56">
                  <Image
                    className="relative fill drop-shadow-xl shadow-indigo-500/40"
                    src={
                      houseCrests.find(
                        (crest: { name: string }) =>
                          crest.name === house.houseName
                      )?.imagePath || "/placeholderCrest.png"
                    }
                    alt={house.houseName}
                    width={200}
                    height={200}
                  />
                </div>
                <p className="font-serif font-medium text-3xl static text-center">
                  <span>{house.houseName}</span>
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <HouseModal
          houseName={selectedHouse}
          swornMembers={selectedSwornMembers}
          isModalOpen={isModalOpen}
          handleCloseModal={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};
export default HouseList;
