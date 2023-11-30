import React, { useRef } from "react";
import bath from "../../../assets/icons/bath.svg";
import bedroom from "../../../assets/icons/bedroom.svg";
import squareft from "../../../assets/icons/squareft.svg";
import Slider from "react-slick";
const UnitSlider = ({ data, currentSlide, setCurrentSlide }) => {
  const sliderRef = useRef();
  return (
    <div className="mt-6 p-8 bg-white rounded-xl shadow-xl w-[80%]">
      <Slider
        dots={false}
        arrows={true}
        infinite={false}
        slidesToShow={data.length ?? 4}
        slidesToScroll={1}
        className={`overflow-hidden h-full w-full ${
          data.length < 2 && "hidden"
        }`}
        initialSlide={currentSlide}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={`max-w-[95%] py-1 px-2 text-center font-semibold backdrop-blur-[21px] ${
                currentSlide == index
                  ? "bg-secondary text-primary"
                  : "bg-primary/50 text-white shadow-2xl"
              } cursor-pointer transition-all duration-500 text-black rounded-md`}
              onClick={() => {
                sliderRef.current.slickGoTo(index);
                setCurrentSlide(index);
              }}
            >
              {item.Bedrooms + " Bedrooms"}
            </div>
          );
        })}
      </Slider>
      <Slider
        ref={sliderRef}
        dots={false}
        touchMove={false}
        swipe={false}
        arrows={false}
        initialSlide={currentSlide}
        infinite={false}
        className="h-full w-full mt-6"
        beforeChange={(prev, next) => setCurrentSlide(next)}
      >
        {data.map((item, index) => {
          return (
            <div className="p-6 !grid !grid-cols-3" key={index}>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="font-bold">{item.Bathrooms}</p>
                  <img src={bath} className="w-6 h-6" alt="bath-icon" />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">Baths</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="font-bold">{item.Bedrooms}</p>
                  <img src={bedroom} className="w-6 h-6" alt="bedroom-icon" />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">Bedrooms</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="flex gap-x-2 items-center">
                  <p className="font-bold">{item.Size}</p>
                  <img src={squareft} className="w-6 h-6" alt="area-icon" />
                </div>
                <p className="font-normal text-[12px] md:text-tiny">
                  Square (Ft)
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default UnitSlider;