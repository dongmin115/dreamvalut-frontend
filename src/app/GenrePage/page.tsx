/* eslint-disable @next/next/no-img-element */
import React from 'react';

const GenrePage: React.FC = () => {
  // 3x4 그리드에 들어갈 요소 배열
  const items = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-3 gap-[5%] p-[2%] w-[30%] h-[100%]">
        {items.map((item) => (
          <div
            key={item}
            className="flex bg-neutral-800 w-[100%] items-end justify-center rounded-lg"
          >
            <div className="mb-[10%] text-base text-white">Item {item}</div>
            <img src="https://i.ibb.co/QYvMHz3/image.png" alt="image" />
            <div className="mb-[10%] text-base text-white">Item {item}</div>
            <img src="https://i.ibb.co/ZHJLj11/image.png" alt="image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
