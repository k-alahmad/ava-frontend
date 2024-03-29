import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { omit } from "lodash";
import {
  MdMail,
  MdPerson,
  MdDeleteOutline as DeleteIcon,
  MdOutlineDeleteSweep as DeleteAllIcon,
  MdExpandMore,
} from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import {
  Gender,
  Purpose,
  RentFrequency,
  CompletionStatus,
} from "../../../constants";
import { useAddListingMutation } from "../../../redux/listings/listingsSlice";
import { useGetLNGQuery } from "../../../redux/languages/languagesSlice";
import Button from "../../../components/UI/Button";
import Slider from "react-slick";
import CustomInput from "../../../components/Forms/CustomInput";
import useForm from "../../../hooks/useForm";
import { showMessage } from "../../../redux/messageAction.slice";
import { useDispatch } from "react-redux";
const defaultFormState = {
  Purpose: "Rent",
  Type: "",
  Bedrooms: "",
  Bacloney: "",
  Price: "",
  Email: "",
  FullName: "",
  Gender: "Male",
  IPAddress: "192.1.1.1test",
  PhoneNo: "",
};
const ListingForm = () => {
  const { t, i18n } = useTranslation();
  const [listWithUs_Translation, setListWithUs_Translation] = useState([]);
  const {
    disabled,
    setErrors,
    errors,
    setValues,
    values,
    handleChange,
    handleTranslationChange,
    handleSubmit,
  } = useForm(
    submit,
    defaultFormState,
    listWithUs_Translation,
    setListWithUs_Translation
  );
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [typeOptions, setTypeOptions] = useState(RentFrequency);
  const { data: lngs, isSuccess: lngisSuccess } = useGetLNGQuery();

  const [addListing, { isLoading, isSuccess, isError }] =
    useAddListingMutation();

  const newImageUrls = [];
  useEffect(() => {
    if (images.length < 1) return;
    images.forEach((img) => newImageUrls.push(URL.createObjectURL(img)));
    setImageURL(newImageUrls);
  }, [images]);
  function onImageChange(e) {
    setImages([...images, ...e.target.files]);
  }

  useEffect(() => {
    if (values.Purpose == "Rent") {
      setTypeOptions(RentFrequency);
      setValues({ ...values, Type: RentFrequency[0].value });
    } else {
      setTypeOptions(CompletionStatus);
      setValues({ ...values, Type: CompletionStatus[0].value });
    }
  }, [values.Purpose]);
  function submit() {
    const formData = new FormData();
    formData.append("Purpose", values.Purpose);
    formData.append("Type", values.Type);
    formData.append("Bedrooms", values.Bedrooms);
    formData.append("Bacloney", values.Bacloney);
    formData.append("Price", values.Price);
    formData.append("Email", values.Email);
    formData.append("FullName", values.FullName);
    formData.append("Gender", values.Gender);
    formData.append("IPAddress", values.IPAddress);
    formData.append("PhoneNo", values.PhoneNo);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("Images", images[i]);
      }
    }
    for (let i = 0; i < listWithUs_Translation.length; i++) {
      formData.append(
        `ListWithUs_Translation[${i}][Name]`,
        listWithUs_Translation[i].Name
      );
      formData.append(
        `ListWithUs_Translation[${i}][Description]`,
        listWithUs_Translation[i].Description
      );
      formData.append(
        `ListWithUs_Translation[${i}][languagesID]`,
        listWithUs_Translation[i].languagesID
      );
    }

    fetch("https://geolocation-db.com/json/")
      .then((response) => response.json())
      .then((data) => {
        formData.append("IPAddress", data.IPv4);
        addListing({ values: formData });
        setValues(defaultFormState);
        setImageURL([]);
        setImages([]);
        setListWithUs_Translation([]);
      })
      .catch((error) => {
        dispatch(
          showMessage({
            variant: "error",
            message: t("TryAgain"),
          })
        );
      });
  }

  useEffect(() => {
    if (!isLoading && isSuccess)
      dispatch(
        showMessage({
          variant: "success",
          message: t("ListingThanks"),
        })
      );
    if (!isLoading && isError)
      dispatch(
        showMessage({
          variant: "error",
          message: t("TryAgain"),
        })
      );
  }, [isSuccess, isError]);

  useEffect(() => {
    if (lngisSuccess) {
      let translations = [];
      lngs?.normalData.map((item) => {
        translations.push({
          languagesID: item.id,
          Language: {
            Name: item.Name,
            Code: item.Code,
          },
          Name: "",
          Description: "",
        });
      });
      setListWithUs_Translation(translations);
    }
  }, [lngisSuccess]);
  const hiddenFileInput = React.useRef(null);

  return (
    <>
      <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-sm p-4 md:p-6 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-[90%] lg:w-[40%] 2xl:w-[35%] min-h-[850px]">
        <p className="text-smaller"> {t("PropertyInformation")} </p>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-tiny">{t("Purpose")} </p>
            <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
              {Purpose.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div
                      className={`py-3 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        values.Purpose == item.value
                          ? "bg-secondary text-primary"
                          : "bg-transparent text-white"
                      }`}
                      onClick={() =>
                        setValues({ ...values, Purpose: item.value })
                      }
                    >
                      {item.lng[i18n.language] == "Buy"
                        ? "Sell"
                        : item.lng[i18n.language]}
                    </div>
                    {index !== Gender.length - 1 && (
                      <div key={item.value} className="h-10 w-1 bg-white/50" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <CustomInput
              value={
                typeOptions.find((x) => x.value == values.Type)?.lng[
                  i18n.language
                ]
              }
              name={"Type"}
              inputType="text"
              translatedOptions={typeOptions}
              setState={setValues}
              state={values}
              reverseIcon
              icon={<MdExpandMore className="text-smaller" />}
              select
              readOnly
            />
            <CustomInput
              placeholder={t("Price")}
              type="number"
              name="Price"
              id="Price"
              value={values.Price}
              onChange={handleChange}
              error={Boolean(errors?.Price)}
            />
          </div>
          <div className="w-full flex justify-center items-center gap-x-2">
            <CustomInput
              placeholder={t("Bedrooms")}
              type="number"
              name="Bedrooms"
              id="Bedrooms"
              value={values.Bedrooms}
              onChange={handleChange}
              error={Boolean(errors?.Bedrooms)}
            />
            <CustomInput
              placeholder={t("Balconey")}
              type="number"
              name="Bacloney"
              id="Bacloney"
              value={values.Bacloney}
              onChange={handleChange}
              error={Boolean(errors?.Bacloney)}
            />
          </div>
          <div
            className={`space-y-4 ${
              listWithUs_Translation.length !== 0 ? "block" : "hidden"
            }`}
          >
            <CustomInput
              placeholder={t("PropertyTitle")}
              type="text"
              name="Name"
              id="Name"
              value={
                listWithUs_Translation.find(
                  (x) => x.Language.Code.toLowerCase() == i18n.language
                )?.Name
              }
              onChange={(e) =>
                handleTranslationChange(
                  e,
                  listWithUs_Translation.find(
                    (x) => x.Language.Code.toLowerCase() == i18n.language
                  ),
                  "Name"
                )
              }
              error={Boolean(
                Object.keys(errors).find(
                  (x) =>
                    x ==
                    "Name" +
                      i18n.language.charAt(0).toUpperCase() +
                      i18n.language.slice(1)
                )
              )}
            />

            <CustomInput
              textArea
              textAreaRows={15}
              placeholder={t("PropertyDescription")}
              name="Message"
              id="Message"
              value={
                listWithUs_Translation.find(
                  (x) => x.Language.Code.toLowerCase() == i18n.language
                )?.Description
              }
              onChange={(e) =>
                handleTranslationChange(
                  e,
                  listWithUs_Translation.find(
                    (x) => x.Language.Code.toLowerCase() == i18n.language
                  ),
                  "Description"
                )
              }
              error={Boolean(
                Object.keys(errors).find(
                  (x) =>
                    x ==
                    "Description" +
                      i18n.language.charAt(0).toUpperCase() +
                      i18n.language.slice(1)
                )
              )}
            />
          </div>
        </div>
      </div>
      <div className="w-[90%] lg:w-[40%] 2xl:w-[35%] space-y-6 h-[850px]">
        <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-sm p-4 md:p-6 border-[1px] border-t-white/70 border-l-white/70 border-white/40 h-[40%] w-full flex flex-col overflow-x-hidden overflow-y-auto">
          <div className="w-full flex items-center gap-x-6">
            <Button
              textColor={"text-primary"}
              text={t("UploadPhoto")}
              bgColor={"bg-secondary"}
              customStyle={"py-2 px-4"}
              borderRadius={6}
              onClick={(e) => {
                e.preventDefault();
                hiddenFileInput.current.click();
              }}
            />
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              name="images"
              onChange={onImageChange}
              style={{ display: "none" }}
              ref={hiddenFileInput}
            />
            {imageURL.length !== 0 && (
              <div
                onClick={() => {
                  setImages([]);
                  setImageURL([]);
                }}
                className="text-center cursor-pointer flex items-center gap-x-1"
              >
                <DeleteAllIcon className="text-med" />
                <p className="text-smaller">{t("DeleteAll")} </p>
              </div>
            )}
          </div>
          {imageURL.length !== 0 && (
            <Slider
              slidesToScroll={1}
              slidesToShow={imageURL.length <= 1 ? imageURL.length : 2}
              dots={true}
              arrows={true}
              infinite={false}
              className="max-h-[30vh] w-full"
            >
              {imageURL?.map((imageSrc, i) => {
                return (
                  <div
                    className="relative !h-[200px] !max-h-[200px] !w-[95%]"
                    key={i}
                  >
                    <img
                      className="h-full w-full"
                      src={imageSrc}
                      alt={"Guest Property Image" + i}
                    />
                    <div
                      className="text-center cursor-pointer flex items-center gap-x-1 absolute top-0 left-0 bg-primary/40 backdrop-blur-sm shadow-md rounded-br-md p-1"
                      onClick={() => {
                        let tempUrls = imageURL;
                        let newTempUrls = tempUrls.filter(
                          (img) => img !== imageSrc
                        );
                        let idx = tempUrls.indexOf(imageSrc);
                        let tempImages = images;
                        setImageURL(newTempUrls);
                        if (idx > -1) {
                          tempImages.splice(idx, 1);
                          setImages(tempImages);
                        }
                      }}
                    >
                      <DeleteIcon className="text-med" />
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>
        <div className="bg-fourth/40 space-y-6 text-white rounded-md shadow-lg backdrop-blur-sm p-4 md:p-6 border-[1px] border-t-white/70 border-l-white/70 border-white/40 w-full h-[57%] flex flex-col overflow-x-hidden overflow-y-auto">
          <p className="text-smaller"> {t("PersonalInformation")} </p>
          <div className="space-y-4 flex-1">
            <CustomInput
              icon={<MdPerson className="text-white text-med" />}
              placeholder={t("formFullName")}
              type="text"
              name="FullName"
              id="FullName"
              value={values.FullName}
              onChange={handleChange}
              error={Boolean(errors?.FullName)}
            />
            <CustomInput
              icon={<MdMail className="text-white text-med" />}
              placeholder={t("formEmail")}
              type="email"
              name="Email"
              id="Email"
              value={values.Email}
              onChange={handleChange}
              error={Boolean(errors?.Email)}
            />
            <PhoneInput
              country={"ae"}
              placeholder={t("formPhoneNumber")}
              enableSearch={true}
              inputProps={{
                name: "phone",
                id: "phone",
                required: true,
              }}
              onChange={(phone) => {
                if (phone < 10) {
                  setErrors({
                    ...errors,
                    PhoneNo: "Phone Number is atleast 10 digits",
                  });
                } else {
                  let newObj = omit(errors, "PhoneNo");
                  setErrors(newObj);
                }
                setValues({ ...values, PhoneNo: phone });
              }}
              value={values.PhoneNo}
              containerStyle={{
                outline: "none",
                outlineOffset: "0px",
                boxShadow: "none",
              }}
              containerClass={`${
                Boolean(errors.PhoneNo)
                  ? "!border-[1px] border-red-500"
                  : "!border-b-[1px] border-white"
              } px-1 flex bg-white/20 rounded-md !outline-none`}
              inputClass={`!bg-transparent !text-white !w-full !text-lg !h-full !border-none ${
                i18n.language == "en" ? "px-0" : "mx-10"
              } !outline-none`}
              buttonClass={`!border-none !outline-none !text-lg `}
              buttonStyle={{
                direction: "ltr",
                outline: "none",
                outlineOffset: "0px",
                boxShadow: "none",
              }}
              dropdownClass="!bg-primary/70 !backdrop-blur-sm !text-secondary"
              searchClass="!bg-primary/70 !backdrop-blur-sm !text-secondary"
              inputStyle={{
                direction: "ltr",
                outline: "none",
                outlineOffset: "0px",
                boxShadow: "none",
              }}
            />
            <div className="space-y-1">
              <p className="text-tiny">{t("Gender")} </p>
              <div className="flex justify-center items-center border-[1px] rounded-md p-1 gap-x-2">
                {Gender.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div
                        key={index}
                        className={`py-3 rounded-md text-tiny w-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                          values.Gender == item.value
                            ? "bg-secondary text-primary"
                            : "bg-transparent text-white"
                        }`}
                        onClick={() =>
                          setValues({ ...values, Gender: item.value })
                        }
                      >
                        {item.lng[i18n.language]}
                      </div>
                      {index !== Gender.length - 1 && (
                        <div
                          key={item.value}
                          className="h-10 w-1 bg-white/50"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
            <button
              className={`bg-buttonGrad text-primary text-small w-full shadow-2xl py-3 disabled:!bg-gray-500 disabled:bg-none disabled:text-white rounded-md ${
                isLoading && "animate-pulse"
              } `}
              onClick={handleSubmit}
              disabled={disabled}
            >
              {isLoading ? t("sending") : t("send")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingForm;
