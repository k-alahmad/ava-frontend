import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdSettings } from "react-icons/md";
import { showSettingsModal } from "../../../redux/modal.slice";
import { useDispatch } from "react-redux";
import CurrencySettings from "./CurrencySettings";
import UnitSettings from "./UnitSettings";
import { useGetLNGQuery } from "../../../redux/languages/languagesSlice";

export default function WebsiteSettings() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const { data, isSuccess } = useGetLNGQuery();
  return (
    <div className="rounded-md">
      <div className="relative">
        <div
          style={{ WebkitTapHighlightColor: "transparent" }}
          className="text-purple p-0 m-0 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <MdSettings size={30} className="text-white" />
        </div>

        <div
          ref={ref}
          onClick={() => setOpen(false)}
          className={`${open ? "scale-100" : "scale-0"} absolute z-10 top-10  ${
            data?.normalData.find((x) => x.Code.toLowerCase() == i18n.language)
              .Direction == "rtl"
              ? "-right-32 origin-top-left"
              : "-left-32 origin-top-right"
          }   bg-primary/80 rounded-lg shadow-2xl drop-shadow-2xl transition-all duration-300 p-4 space-y-2 text-white text-smaller w-40`}
        >
          <div
            className="flex justify-start items-center cursor-pointer"
            onClick={() => {
              dispatch(
                showSettingsModal({
                  data: <CurrencySettings />,
                })
              );
            }}
          >
            <p className="font-semibold">{t("Currency")}</p>
          </div>

          <div
            className="flex justify-start items-center cursor-pointer"
            onClick={() => {
              dispatch(
                showSettingsModal({
                  data: <UnitSettings />,
                })
              );
            }}
          >
            <p className="font-semibold">{t("AriaUnit")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
