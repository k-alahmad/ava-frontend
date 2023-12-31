import React, { useState, useEffect } from "react";
import locationIcon from "../../../assets/icons/pro-location-icon.svg";
import { useTranslation } from "react-i18next";

const Location = ({ data }) => {
  const { t } = useTranslation();
  const [cordination, setCordination] = useState({ lat: "", lng: "" });
  useEffect(() => {
    const lat = data?.Latitude;
    const lon = data?.Longitude;
    setCordination({ lat: lat, lng: lon });
  }, [data]);
  useEffect(() => {
    const iframeData = document.getElementById("iframeId");
    iframeData.src = `https://maps.google.com/maps?q=${cordination.lat},${cordination.lng}&hl=es;&output=embed`;
  });
  return (
    <div className="mt-12">
      <div className="flex items-center self-start flex-1">
        <img src={locationIcon} alt="property Icon" />
        <p className="text-small sm:text-med font-bold">{t("Location")}</p>
      </div>
      <iframe
        title="Property Map Location"
        id="iframeId"
        height="600px"
        width="100%"
        className="rounded-xl shadow-md"
        sandbox="allow-scripts allow-same-origin allow-presentation"
        loading="lazy"
        // src={mapUrl}
      ></iframe>
    </div>
  );
};

export default Location;
