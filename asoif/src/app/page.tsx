import Image from "next/image";
import HouseList from "./components/houseList";
import { fetchHouses, fetchHouseData } from './helpers/getFunctions';
import CircularProgress from '@mui/material/CircularProgress';

export default async function Home() {
  const housesData = await fetchHouses();
  const swornMembersByHouse = await fetchHouseData(housesData);
  return (

      
    <main className="flex min-h-screen flex-col bg-[url('/AdobeStockGradient.jpeg')]  ">
      <header className="" role="banner">
        <div className="absolute sticky top-0 left-0 z-40 w-full backdrop-blur border-b border-slate-800 ">
          <Image
            alt="A Song of Ice and Fire"
            className="left-0 pl-16 p-4"
            src="/logo.png"
            width={300}
            height={100}
          />
        </div>
      </header>
      <section>
      {swornMembersByHouse.length > 0 ? 
       <div  className="flex flex-col gap-20 items-center text-center p-24">
       <div className="bg-zinc-900 border-dotted border-2 border-yellow-500 outline outline-yellow-300 outline-offset-2 outline-2 rounded-[50%] z-10 shadow-lg max-w-5xl w-96 h-20 flex justify-center items-center  ">
          <h1 className="font-got text-center text-4xl tracking-widest ">
            HOUSES
          </h1>
        </div>
        <div className="justify-self-center">
          <HouseList swornMembersByHouse={swornMembersByHouse} />
        </div>  
        </div> : <div className="flex justify-center items-center h-screen">
       <CircularProgress size={70} color="warning" />
       </div> }
       
      </section>
    </main>

  );
}
