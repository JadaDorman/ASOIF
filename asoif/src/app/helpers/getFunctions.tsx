import { HouseData, SwornHouseMember } from "../types/houseTypes";

//fetch houses
export async function fetchHouses() {
  const res = await fetch("https://anapioficeandfire.com/api/houses");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

//fetch all sworn members info and create a new array with all the data
export async function fetchSwornMembers(swornMembers: string[]) {
  const characterArray: SwornHouseMember[] = [];

  for (const member of swornMembers) {
    const res = await fetch(member);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const character: SwornHouseMember = await res.json();
    characterArray.push(character);
  }

  return characterArray;
}

//Using houseData and the fetchSwornMembers function, create a new object with the house names and the sworn members data.
export async function fetchHouseData(housesData: HouseData[]) {
  const houseDataWithSwornMembers = housesData.map(async (house) => {
    const swornMembers = await fetchSwornMembers(house.swornMembers);
    return {
      houseName: house.name,
      swornMembers: swornMembers,
    };
  });

  //Wait for all the promises to resolve
  const houseDataWithSwornMembersResults = await Promise.all(
    houseDataWithSwornMembers
  );

  //Creates object with sworn members data separated by house.
  const houseDataWithSwornMembersAndResults =
    houseDataWithSwornMembersResults.map((houseData) => {
      const swornMembersWithResults = houseData.swornMembers.map(
        (swornMember) => {
          return {
            ...swornMember,
            houseName: houseData.houseName,
          };
        }
      );

      return {
        houseName: houseData.houseName,
        swornMembers: swornMembersWithResults,
      };
    });

  return houseDataWithSwornMembersAndResults;
}
