import React, { useState, useEffect, useRef } from "react";
import colors from "../../../../settings";
import Button from "../../../../components/UI/Button";
import Slider from "react-slick";
import { useGetActiveAnnouncementsQuery } from "../../../../redux/announcements/announcementsSlice";
import { API_BASE_URL } from "../../../../constants";
import { useTranslation } from "react-i18next";
import LazyImage from "../../../../components/UI/LazyImage";
import Loader from "../../../../components/UI/Loader";
import { useGetLNGQuery } from "../../../../redux/languages/languagesSlice";
const Announcements = () => {
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetActiveAnnouncementsQuery();
  const { data: lngData, isSuccess: lngIsSuccess } = useGetLNGQuery();
  const [scrollY, setScrollY] = useState(0);
  const [roteteY, setRotateY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef();
  const compRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      if (compRef.current.getBoundingClientRect().top > 600) {
        setScrollY(350);
        setRotateY(25);
      } else {
        setScrollY(43);
        setRotateY(4);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const { i18n, t } = useTranslation();
  return isLoading || isFetching ? (
    <div className="my-24 flex flex-col justify-center items-center relative">
      <Loader />
    </div>
  ) : isError ? (
    <div className="my-24 flex flex-col justify-center items-center relative">
      <p className="text-med font-bold">{t("ErrorPleaseReload")}</p>
    </div>
  ) : (
    isSuccess &&
    data.count !== 0 && (
      <div ref={compRef} className="mt-24 px-[5%] overflow-hidden">
        <div
          style={{
            background: `linear-gradient(279deg, ${colors.secondary} -33.22%, ${colors.primary} 41.05%)`,
          }}
          className="rounded-md relative"
        >
          {data.count > 1 && (
            <div
              dir="ltr"
              className={`absolute h-9 flex justify-center items-center ${
                lngData?.normalData.find(
                  (x) => x.Code.toLowerCase() == i18n.language
                ).Direction == "ltr"
                  ? "left-12"
                  : "right-12"
              } bottom-5  gap-x-8`}
            >
              {data.ids.map((item, index) => {
                if (data.entities[item].Type == "Normal")
                  return (
                    <div
                      key={index}
                      className={`${
                        currentSlide == index
                          ? "border-white/80"
                          : "border-transparent"
                      } transition-all duration-500 z-30 border-[2px] rounded-full p-px`}
                    >
                      <div
                        onClick={() => sliderRef.current.slickGoTo(index)}
                        key={item}
                        className={`w-7 h-7 rounded-full bg-white/50 backdrop-blur-sm cursor-pointer transition-all duration-300`}
                      />
                    </div>
                  );
              })}
              <div className="w-[80%] h-1 bg-white/50 absolute z-0" />
            </div>
          )}
          <Slider
            ref={sliderRef}
            slidesToScroll={1}
            slidesToShow={1}
            infinite={true}
            lazyLoad="ondemand"
            arrows={false}
            touchMove={true}
            pauseOnDotsHover={false}
            pauseOnFocus={false}
            pauseOnHover={false}
            autoplay={true}
            autoplaySpeed={7000}
            className="!w-full !h-[85vh] md:!h-[450px]"
            beforeChange={(prev, next) => {
              setCurrentSlide(next);
            }}
          >
            {data.ids.map((item, index) => {
              if (data.entities[item].Type == "Normal")
                return (
                  <div
                    key={index}
                    dir={
                      lngData?.normalData.find(
                        (x) => x.Code.toLowerCase() == i18n.language
                      ).Direction
                    }
                    className="w-full h-[85vh] md:h-[450px] !grid md:!grid-cols-2"
                  >
                    <div className="p-4 md:p-8 xl:px-12 2xl:px-16 space-y-7 flex flex-col md:justify-start items-center md:items-start h-full w-full">
                      <p className="text-white font-bold text-small md:text-med">
                        {
                          data.entities[item].Announcements_Translation.find(
                            (x) =>
                              x.Language.Code.toLowerCase() ==
                              i18n.language.toLowerCase()
                          ).Title
                        }
                      </p>
                      <p className="text-white font-medium text-tiny max-md:text-center md:text-[18px]">
                        {
                          data.entities[item].Announcements_Translation.find(
                            (x) =>
                              x.Language.Code.toLowerCase() ==
                              i18n.language.toLowerCase()
                          ).Description
                        }
                      </p>
                      <Button
                        bgColor={"bg-buttonGrad"}
                        text={t("MoreDetails")}
                        textColor={"text-primary text-tiny"}
                        customStyle={"p-4"}
                        w={"170px"}
                        h={"35px"}
                        borderRadius={4}
                        onClick={() => {
                          window.open(
                            data.entities[item].Link,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      />
                    </div>
                    <div className="h-full w-full relative">
                      <div
                        className={` h-[270px] w-[300px] sm:h-[300px] sm:w-[450px] md:h-[250px] md:w-[350px] lg:h-[300px] lg:w-[450px] xl:h-[350px] absolute top-0 md:top-1/2 left-1/2 p-1 bg-white origin-bottom-left rounded-md !ease-in-out duration-700 transition-all  ${
                          index == currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          rotate: -roteteY + "deg",
                          transform: "translate(" + -scrollY + "%, -50%)",
                        }}
                      >
                        <LazyImage
                          src={API_BASE_URL + data.entities[item].Image.URL}
                          // src={testIMG}
                          alt="Announcement Image"
                          divStyle={`h-full w-full rounded-md`}
                          imgStyle={
                            "h-full w-full object-center object-cover rounded-md"
                          }
                          skelatonStyle={"h-full w-full rounded-md"}
                          className="h-full w-full object-center object-cover rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                );
            })}
          </Slider>
        </div>
      </div>
    )
  );
};

export default Announcements;
