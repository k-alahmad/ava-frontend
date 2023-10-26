import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useGetActiveTeamsQuery } from "../../../redux/teams/teamsSlice";
import {
  SampleNextArrow,
  SamplePrevArrow,
} from "../../../components/UI/SliderArrows";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useLazyGetUsersByTeamIdQuery } from "../../../redux/users/usersSlice";
import { API_BASE_URL } from "../../../constants";
const Teams = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userIndex, setUserIndex] = useState(0);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const sliderRef = useRef();
  const {
    data: teams,
    isLoading: teamsIsLoading,
    isFetching: teamsIsFetching,
    isSuccess: teamsIsSuccess,
    isError: teamsIsError,
    error: teamsError,
  } = useGetActiveTeamsQuery();
  //   const [,{}]=

  const [
    getUsersByTeamId,
    {
      data: teamUsers,
      isLoading: usersIsLoading,
      isFetching: usersIsFetching,
      isSuccess: usersIsSuccess,
      isError: usersIsError,
      error: usersError,
    },
  ] = useLazyGetUsersByTeamIdQuery();

  useEffect(() => {
    if (teamsIsSuccess && selectedTeamId == "") {
      getUsersByTeamId({ id: teams.ids[0] });
    }
  }, [teams]);

  return (
    teamsIsSuccess && (
      <div className="overflow-x-hidden grid grid-cols-3 px-[5%]">
        <div className="col-span-1 flex flex-col justify-center items-start">
          <p className="text-big lg:text-[60px] font-bold md:w-[85%]">
            Find out who is behind AVA realestate
          </p>
          <p className="text-smaller text-gray-600 md:w-[90%]">
            Lorem ipsum dolor sit amet . The graphic and typographic operators
            know this well, in reality all the professions dealing with the
            universe of communication have a stable relationship Lorem ipsum
            dolor sit amet .
          </p>
        </div>
        <div className="col-span-2 space-y-4">
          <div>
            <Slider
              ref={sliderRef}
              dots={false}
              arrows={true}
              infinite={false}
              touchMove={false}
              slidesToShow={teams.count < 4 ? teams.count : 4}
              slidesToScroll={1}
              className="overflow-hidden h-full w-full"
              initialSlide={currentSlide}
              nextArrow={<SampleNextArrow />}
              prevArrow={<SamplePrevArrow />}
            >
              {teams.ids.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full !flex justify-center items-center"
                  >
                    <div
                      className={`w-full max-w-[90%] py-3 px-2 text-center font-semibold ${
                        currentSlide == index
                          ? "bg-buttonGrad !text-primary"
                          : "bg-primary/50 text-white"
                      } cursor-pointer transition-all bg-primary/50 text-white duration-500 rounded-md`}
                      onClick={() => {
                        sliderRef.current.slickGoTo(index);
                        setCurrentSlide(index);
                        setSelectedTeamId(item);
                        getUsersByTeamId({ id: item });
                      }}
                    >
                      {teams.entities[item]?.Title}
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className="overflow-x-hidden px-5 relative h-[500px] flex justify-start items-center">
            {usersIsSuccess && teamUsers?.count > 0 && (
              <>
                <div
                  className="absolute cursor-pointer z-40 left-[405px] top-1/2 -translate-y-1/2 rounded-md bg-gray-300 backdrop-blur-[21px] shadow-lg"
                  onClick={() =>
                    setUserIndex(
                      userIndex + 1 < teamUsers.count
                        ? userIndex + 1
                        : teamUsers.count - 1
                    )
                  }
                >
                  <FaAngleRight className="text-primary" size={30} />
                </div>
                <div
                  className="absolute cursor-pointer z-40 left-1 top-1/2 -translate-y-1/2 rounded-md bg-gray-300 backdrop-blur-[21px] shadow-lg"
                  onClick={() =>
                    setUserIndex(userIndex - 1 > 0 ? userIndex - 1 : 0)
                  }
                >
                  <FaAngleLeft className="text-primary" size={30} />
                </div>
              </>
            )}
            {usersIsLoading || usersIsFetching ? (
              <div className="flex justify-center items-center my-24 text-smaller md:text-small font-bold text-center w-full">
                Loading Members
              </div>
            ) : usersIsSuccess && teamUsers.count == 0 ? (
              <div className="flex justify-center items-center my-24 text-smaller md:text-small font-bold text-center w-full">
                No Members To View
              </div>
            ) : (
              usersIsSuccess && (
                <div className="flex flex-col justify-start items-center relative !w-[400px] min-w-[350px] h-[500px]">
                  {teamUsers.ids.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`absolute !w-[400px] min-w-[400px] rounded-md transition-all duration-500 top-1/2 -translate-y-1/2 left-0 ${
                          index == userIndex
                            ? "opacity-100 !h-[450px] z-30 left-0 "
                            : index == userIndex + 1
                            ? "opacity-100 !h-[425px] left-[75%] z-20"
                            : index == userIndex + 2
                            ? "opacity-100 !h-[400px] left-[125%] z-10"
                            : index == userIndex + 3
                            ? "opacity-75 !h-[375px] left-[175%] z-0"
                            : index > userIndex + 3
                            ? "opacity-0 !h-[375px] -z-20"
                            : index < userIndex && "opacity-0 !h-[375px] -z-10"
                        }`}
                      >
                        <img
                          src={
                            API_BASE_URL + teamUsers.entities[item].Image.URL
                          }
                          alt={"Member" + index}
                          className="rounded-md w-full h-full object-cover object-center"
                        />
                        <div className="absolute bg-fifth/20 backdrop-blur-[21px] w-full h-1/4 bottom-0 left-0 rounded-b-md p-4">
                          <p className="text-white font-bold text-smaller">
                            {teamUsers.entities[item].Name}
                          </p>
                          <p className="text-white text-tiny">
                            {teamUsers.entities[item].Title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Teams;
