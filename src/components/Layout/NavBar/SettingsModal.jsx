import React, { useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSettingsModal,
  selectSettingsModalData,
  selectSettingsModalState,
} from "../../../redux/modal.slice";
import { useTranslation } from "react-i18next";
export default function SettingsModal() {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const open = useSelector(selectSettingsModalState);
  const data = useSelector(selectSettingsModalData);
  const { i18n } = useTranslation();
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      dispatch(hideSettingsModal());
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <>
      <div
        className={`${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } transition-all duration-300 justify-center items-center flex fixed inset-0 z-40 outline-none focus:outline-none w-full`}
      >
        <div
          ref={ref}
          className="rounded-xl shadow-xl relative flex flex-col z-50 outline-none focus:outline-none overflow-hidden bg-fifth/50 backdrop-blur-sm border-[1px] border-white/40 h-full max-h-[50vh] max-w-[90vw] md:max-h-[30vh] w-full md:max-w-[30vw]"
        >
          <div
            onClick={() => {
              dispatch(hideSettingsModal());
            }}
            className={`cursor-pointer font-bold self-center text-primary hover:scale-125 hover:rotate-180 absolute ${
              i18n.language == "en" ? "right-5" : "left-5"
            }  top-2 sm:max-md:top-8 md:top-3 transition-all duration-300 z-30`}
          >
            <MdClose size={30} className="text-white" />
          </div>
          {data?.data}
        </div>
      </div>
      <div
        className={`${
          open ? "scale-100" : "scale-0"
        } opacity-20 fixed h-screen inset-0 z-0 bg-black`}
      ></div>
    </>
  );
}
