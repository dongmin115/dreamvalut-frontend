/* eslint-disable @next/next/no-img-element */
import React from 'react';

const GridComponent: React.FC = () => (
  <div className="flex justify-center h-screen">
    <div className="grid grid-cols-3 grid-rows-4 w-[30%] h-screen gap-[3%] p-[2%]">
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">POP</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/pKWSB7k/RNB.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">RnB</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/yyFmN1f/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Jazz</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/Fwj5D5s/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Ballade</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/nwnkLDJ/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Classical</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/3cjmtvN/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Rock</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/ZHJLj11/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Hip-Hap</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/Bq4w6f9/Folk.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Folk</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/HYCZ8KS/OST.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">OST</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/cgVFWw1/JPOP.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">J-POP</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/cgP2r1p/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Musical</p>
      </button>
      <button className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-zinc-900 rounded-xl">
        <img
          src="https://i.ibb.co/CvC2VdF/EDM.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">EDM</p>
      </button>
    </div>
  </div>
);

export default GridComponent;
