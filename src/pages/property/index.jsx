import React from "react";
import ImageSlider from "./components/ImageSlider";
import { useGetPropertyByIdQuery } from "../../redux/properties/propertiesSlice";
import Loader from "../../components/UI/Loader";
import { useParams } from "react-router-dom";
const PropertyPage = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, isSuccess, isError } =
    useGetPropertyByIdQuery({ id });
  return (
    <div className="pt-24 bg-[#F6F6F6] min-h-screen h-full">
      {isLoading || isFetching ? (
        <div className="relative h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <div className="h-screen flex justify-center items-center">
          <p className="font-bold text-med">
            Somthing Went Wrong, Please Refresh The Page
          </p>
        </div>
      ) : (
        isSuccess && (
          <div className="mx-8">
            <ImageSlider data={data.Images} />
          </div>
        )
      )}
    </div>
  );
};

export default PropertyPage;
