"use client";
import React, { useState } from "react";
import Image from "next/image";
import HouseModal from "./houseModal";
import { houseCrests } from "../helpers/houseCrests";

interface HouseListProps {
  swornMembersByHouse: { houseName: string; swornMembersWithResults: [] }[];
}

const HouseList = ({ swornMembersByHouse }: HouseListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState("");
  console.log(selectedHouse);
  const handleClickedHouse = (name: string) => {
    setSelectedHouse(name);
    setIsModalOpen(true);
  };
  return (
    <>
      <ul className="flex grid grid-cols-5 gap-x-12 gap-y-32">
        {swornMembersByHouse.map(
          (house: { houseName: string; swornMembersWithResults: [] }) => (
            <button
              onClick={() => handleClickedHouse(house.houseName)}
              key={house.houseName}
            >
              <li
                className="static grid grid-row-2 gap-y-12 transition hover:ease-in hover:opacity-50 hover:duration-300"
                key={house.houseName}
              >
                <div className="flex relative justify-center">
                  <Image
                    className="relative fill dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src={
                      houseCrests.find(
                        (crest: { name: string }) =>
                          crest.name === house.houseName
                      )?.imagePath || '/placeholderCrest.png'
                    }
                    alt={house.houseName}
                    width={200}
                    height={200}
                  />
                </div>
                <p className="font-serif font-medium text-2xl static text-center">
                  <span>{house.houseName}</span>
                </p>
              </li>
            </button>
          )
        )}
      </ul>
      <div className="flex justify-center">
        <HouseModal
          houseName={selectedHouse}
          swornMembers={
            swornMembersByHouse.find(
              (house: { houseName: string }) =>
                house.houseName === selectedHouse
            )?.swornMembersWithResults
          }
          isModalOpen={isModalOpen}
          handleCloseModal={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
};
export default HouseList;
