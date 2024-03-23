/* eslint-disable @next/next/no-img-element */
import React from 'react';

const GridComponent: React.FC = () => (
  <div className="flex justify-center h-screen">
    <div className="grid grid-cols-3 grid-rows-4 w-[30%] h-screen gap-[3%] p-[2%]">
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="w-[90%] h-[70%] rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">POP</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/pKWSB7k/RNB.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">RnB</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Jazz</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">K-POP</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Classical</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Rock</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Hip-Hap</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Folk</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">OST</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">J-POP</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">Musical</p>
      </div>
      <div className="flex flex-col items-center text-center justify-center border-2 border-purple-950 bg-gray-900 rounded-xl">
        <img
          src="https://i.ibb.co/QYvMHz3/image.png"
          alt="image"
          className="rounded-full"
        />
        <p className="text-zinc-50 mt-[8%] text-xl">EDM</p>
      </div>
    </div>
  </div>
);

export default GridComponent;
