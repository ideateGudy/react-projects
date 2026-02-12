import { useState } from "react";
import { descriptions, images } from "../data";
import { ArrowLeft, ArrowRight } from "lucide-react";

const getRandomNumber = () => Math.floor(Math.random() * 41) - 20;

const Slider = () => {
  const [index, setIndex] = useState<number>(3);
  return (
    // Container for the slider component
    <div className="relative">
      {/* { Slider } */}
      <div className="flex gap-x-5 sm:gap-x-20 lg:items-start items-center lg:flex-row flex-col">
        {/* { Images } */}
        <div className="w-60 h-60 sm:w-75 sm:h-75 lg:w-100 lg:h-100 relative">
          {images.map((image, i) => (
            <img
              key={i}
              src={image}
              alt={`Slide ${i + 1}`}
              className={`w-full h-full absolute object-cover rounded-3xl transition-all duration-300 ${i === index ? "activeImage" : "inactiveImage"}`}
              style={{
                transform: `rotate(${index === i ? 0 : getRandomNumber()}deg)`,
              }}
            />
          ))}
        </div>
        {/* { Descriptions } */}
        <div className="relative w-64 sm:w-80 lg:w-100 mt-12 lg:mt-5">
          {descriptions.map((description, i) => (
            <p
              className={`text-center text-sm sm:text-base lg:text-xl text-gray-600 absolute transition-all duration-300 ${i === index ? "activeDesc delay-200" : "inactiveDesc"}`}
              key={i}
            >
              {description}
            </p>
          ))}
        </div>
      </div>
      {/* Controls */}
      <div className="absolute -bottom-40 sm:-bottom-24 lg:-bottom-20 left-1/2 -translate-x-1/2 flex gap-x-5">
        <button
          className="bg-gray-100 p-1.5 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
          onClick={() =>
            setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
        >
          <ArrowLeft size={18} />
        </button>
        <button
          className="bg-gray-100 p-1.5 cursor-pointer rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
          onClick={() =>
            setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Slider;
