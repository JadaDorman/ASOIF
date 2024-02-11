import Image from "next/image";
import HouseList from "./components/houseList";

async function fetchHouses() {
  const res = await fetch("https://anapioficeandfire.com/api/houses");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function fetchSwornMembers(swornMembers: string[]) {
  const characterArray: string[] = [];

  for (const member of swornMembers) {
    const res = await fetch(member);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const character = await res.json();
    characterArray.push(character);
  }

  return characterArray;
}

async function fetchHouseData(housesData) {
  const houseDataWithSwornMembers = housesData.map(async (house) => {
    const swornMembers = await fetchSwornMembers(house.swornMembers);
    return {
      houseName: house.name,
      swornMembers: swornMembers,
    };
  });

  const houseDataWithSwornMembersResults = await Promise.all(
    houseDataWithSwornMembers
  );

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
        swornMembersWithResults: swornMembersWithResults,
      };
    });

  return houseDataWithSwornMembersAndResults;
}

export default async function Home() {
  const housesData = await fetchHouses();
  const swornMembersByHouse = await fetchHouseData(housesData);

  return (
    <main className="flex min-h-screen flex-col ">
      <header className="" role="banner">
        <div className="absolute sticky top-0 left-0 z-40 w-full backdrop-blur border-b border-white ">
          <Image
            alt="A Song of Ice and Fire"
            className="left-0 pl-16 p-4"
            src="/logo.png"
            width={300}
            height={200}
          />
        </div>
      </header>
      <section className="flex flex-col gap-20 items-center text-center p-24">
        <div className="z-10 max-w-5xl w-full font-mono ">
          <h1 className="font-got text-center text-5xl tracking-widest">
            HOUSES
          </h1>
        </div>
        <div className="justify-self-center">
          <HouseList swornMembersByHouse={swornMembersByHouse} />
        </div>
      </section>
    </main>
  );
}
