import React from "react";
import PageHeader from "../../components/UI/PageHeader";
import ContactMap from "./components/Map";
import ContactInfo from "./components/ContactInfo";
import RegisterForm from "../../components/Forms/RegisterForm";
import { useTranslation } from "react-i18next";
const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <PageHeader text={t("ContactUsTitle")} />
      <div className="flex flex-col justify-center items-center pb-12">
        <div className="w-[90%] bg-primary/60 backdrop-blur-sm h-full shadow-lg -mt-[15vh] rounded-md grid md:grid-cols-2 gap-8 place-items-center p-4 md:p-6 space-y-12 border-[1px] border-white/80 border-r-white/70 border-b-white/70">
          <div className="w-full">
            <RegisterForm />
          </div>
          <div className="w-full h-full space-y-6">
            <ContactInfo />
            <ContactMap />
          </div>
          {/* <div className="col-span-full w-full">
            <ContactMap />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
