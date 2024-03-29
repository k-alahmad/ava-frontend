import React, { useEffect, useRef, useState } from "react";
import locationIcon from "../../../assets/icons/pro-location-icon.svg";
import { useTranslation } from "react-i18next";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import Directions from "./Directions";
import LocationInfoNav from "./LocationInfoNav";
import colors from "../../../settings";
const Location = ({ data }) => {
  const { t } = useTranslation();
  const [endDirection, setEndDirection] = useState({ lat: "", lng: "" });
  const [routeData, setRouteData] = useState({});
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [nearbyType, setNearbyType] = useState("");

  return (
    data?.Latitude &&
    data?.Longitude && (
      <div className="mt-12">
        <div className="flex items-center self-start flex-1">
          <img
            src={locationIcon}
            alt="property Icon"
            className="max-h-20 max-w-20"
          />
          <p className="text-smaller sm:text-small font-bold">
            {t("LocationAndNearby")}
          </p>
        </div>
        <div className="p-2 bg-white rounded-md space-y-3">
          <LocationInfoNav
            setEndDirection={setEndDirection}
            routeData={routeData}
            setRouteData={setRouteData}
            setNearbyType={setNearbyType}
            nearbyType={nearbyType}
            setNearbyLocations={setNearbyLocations}
            data={data}
          />
          <div className="h-[550px] rounded-md overflow-hidden relative">
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY ?? ""}>
              <Map
                id="map"
                zoom={14}
                center={{ lat: data?.Latitude, lng: data?.Longitude }}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                scrollwheel={false}
                zoomControl
                mapId={import.meta.env.VITE_GOOGLE_MAP_ID ?? ""}
              >
                <MapControl position={ControlPosition.TOP_LEFT}>\</MapControl>
                {nearbyLocations.length !== 0 ? (
                  <>
                    <AdvancedMarker
                      position={{ lat: data?.Latitude, lng: data?.Longitude }}
                    >
                      <Pin
                        background={colors.secondary}
                        glyphColor={colors.primary}
                        borderColor={colors.primary}
                      />
                    </AdvancedMarker>
                    {nearbyLocations.map((location) => (
                      <Marker
                        key={location.place_id}
                        position={{
                          lat: location.geometry.location.lat(),
                          lng: location.geometry.location.lng(),
                        }}
                      />
                    ))}
                  </>
                ) : endDirection.lat !== "" && endDirection.lng !== "" ? (
                  <Directions
                    startLng={data.Longitude}
                    startLat={data.Latitude}
                    endLng={endDirection.lng}
                    endLat={endDirection.lat}
                    setRouteData={setRouteData}
                  />
                ) : (
                  <AdvancedMarker
                    position={{ lat: data?.Latitude, lng: data?.Longitude }}
                  >
                    <Pin
                      background={colors.secondary}
                      glyphColor={colors.primary}
                      borderColor={colors.primary}
                    />
                  </AdvancedMarker>
                )}
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    )
  );
};

export default Location;
