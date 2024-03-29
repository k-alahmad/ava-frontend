import React from "react";
import aboutIcon from "../../assets/icons/about.svg";
import Logo from "../../assets/logos/black-logo.svg";
import aboutUsPattern from "../../assets/images/aboutUsPattern.svg";
import { data } from "../../data/aboutUsData";
import Head from "../../components/Layout/PageContainer/Head";
import PageHeader from "../../components/UI/PageHeader";
import Location from "./components/Location";
import MemberCard from "./components/MemberCard";
import MissionCard from "./components/MissionCard";
import Teams from "./components/Teams";
import { useTranslation } from "react-i18next";
const AboutUsPage = () => {
  const { i18n } = useTranslation();
  return (
    <div>
      <Head
        title={"About us"}
        desc={
          "Best Offers for homes in Dubai. Secondary Market and off plan projects."
        }
        keywords={
          "About Ava Real Esatate, Best Real Estate Agency, Dubai Real Esate, Dubai Properties"
        }
        canonicalLink={"/about-us"}
      />
      <PageHeader text={data.headerTitle[i18n.language]} />
      <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center md:grid md:grid-cols-12 gap-7 mt-20 max-md:px-[5%] ">
        <div className="col-span-5 w-[85%] md:w-[90%] 2xl:w-[80%] relative place-self-center">
          <div
            style={{
              background: "rgba(111, 111, 111, 0.24)",
            }}
            className="h-[140px] w-[140px] rounded-md rounded-tr-full backdrop-blur-sm absolute -right-[10%] -top-[10%]"
          />
          <img
            src={data.mission.image}
            alt="Mission"
            className="h-[400px] md:h-[600px] rounded-md"
          />
          <div
            style={{
              background:
                "linear-gradient(225deg, rgba(98, 98, 98, 0.24) 0%, rgba(98, 98, 98, 0.03) 100%)",
            }}
            className=" h-[200px] w-[80%] backdrop-blur-sm absolute z-20 -bottom-[5%] md:-bottom-[10%] left-[10%] flex justify-center items-center rounded-md"
          >
            <div className="text-small text-white font-semibold px-2 max-md:text-justify">
              <p> {data.Goals[i18n.language]}</p>
              <p>{data.GoalsSub[i18n.language]}</p>
            </div>
            <div className="w-[60px] h-[60px] bg-primary rounded-md -mt-52 flex justify-center items-center absolute right-2 ">
              <img src={aboutIcon} alt="About Us" />
            </div>
          </div>
        </div>
        <div className="col-span-7 space-y-4 max-md:mt-7">
          <p className="text-big md:text-bigger font-bold">
            {data.mission.title[i18n.language]}
          </p>
          <p>{data.mission.description[i18n.language]}</p>
          <div className="md:grid md:grid-cols-2 md:gap-7 max-md:space-y-7">
            {data.mission.items.map((item, index) => {
              return (
                <MissionCard
                  key={index}
                  title={item.title[i18n.language]}
                  icon={item.icon}
                  text={item.description[i18n.language]}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center md:grid md:grid-cols-12 gap-7 mt-20 max-md:px-[5%] ">
        <div className="col-span-6 md:w-[80%] relative place-self-center space-y-4">
          <p className="text-big md:text-bigger font-bold">
            {data.vision.title[i18n.language]}
          </p>
          <p className="text-smaller md:text-small">
            {data.vision.description[i18n.language]}
          </p>
          <ul className="list-disc ml-7 space-y-14 marker:text-primary list-outside pt-12">
            {data.vision.items.map((item, index) => {
              return <li key={index}>{item.text[i18n.language]}</li>;
            })}
          </ul>
        </div>
        <div className="col-span-6 md:w-[80%] place-items-center space-y-7 relative">
          <div
            className="h-[550px] lg:h-[630px] max-xl:w-[240px] xl:w-[300px] 2xl:w-[390px] flex-shrink-0 rounded-lg backdrop-blur-sm absolute max-xl:right-0 xl:right-2 2xl:right-8 top-[4%] lg:top-[7%] flex flex-col justify-between items-center px-10 py-16"
            style={{
              background:
                "linear-gradient(225deg, rgba(98, 98, 98, 0.24) 0%, rgba(98, 98, 98, 0.03) 100%)",
            }}
          >
            <p className="text-white text-small font-semibold text-center">
              {data.searchSlogan[i18n.language]}
            </p>

            <img src={Logo} alt="Logo" className="h-[135px] w-[185px]" />
          </div>
          <img
            src={data.vision.imageOne}
            className="h-[250px] lg:h-[320px] w-full rounded-md"
            alt="Vision 1"
          />
          <img
            src={data.vision.imageTwo}
            className="h-[250px] lg:h-[320px] w-[40%] rounded-md"
            alt="Vision 2"
          />
          <img
            src={data.vision.imageThree}
            className="h-[250px] lg:h-[320px] w-full rounded-md"
            alt="Vision 3"
          />
        </div>
      </div>
      <div
        className="w-full h-[400px] bg-no-repeat bg-top bg-cover"
        style={{
          backgroundImage: `url(${aboutUsPattern})`,
        }}
      />
      <div className="px-[5%] pb-16 space-y-28">
        {data.founnders.map((item, index) => {
          return (
            <MemberCard
              key={index}
              image={item.image}
              name={item.name[i18n.language]}
              title={item.title[i18n.language]}
              description={item.description[i18n.language]}
              flip={index % 2 !== 0}
            />
          );
        })}
      </div>
      <div dir="ltr">
        <Teams />
      </div>
      <Location />
    </div>
  );
};

export default AboutUsPage;
