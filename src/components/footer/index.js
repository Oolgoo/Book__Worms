import React from "react";

import { Link } from "react-router-dom";

const footer = () => {
  return (
    <div className=" bg-[#175b7a]">
      <div className="mt-20 max-w-7xl flex text-white/90   mx-auto  flex-col py-5 ">
        <div className="flex flex-col text-sm space-y-1 justify-center items-center">
          <div className="inline justify-center items-center">
            <img
              className="items-center h-12 rounded-3xl"
              src={require(`../../assets/images/logoBook.jpg`)}
            />
          </div>
          <h1 className="py-1 shadow-xl font-bold text-xl">Contact us</h1>
          <div className="flex">
            <img
              className="h-4 mr-2"
              alt="loca"
              src={require(`../../assets/images/place.png`)}
            />
            <p>CS department, Building 60, Mirae hall of SeoulTech</p>
          </div>
          <div className="flex">
            <img
              className="h-4 mr-2"
              alt="phone"
              src={require(`../../assets/images/phone_in_talk.png`)}
            />
            <p>010-1234-5678</p>
          </div>
        </div>

        <ul className="flex justify-center space-x-10">
          <li>
            <Link>
              <img
                alt="iglogo"
                className="h-5"
                src={require(`../../assets/images/Instagram.png`)}
              />
            </Link>
          </li>
          <li>
            <img
              className="h-5"
              alt="fbLogo"
              src={require(`../../assets/images/Facebook.png`)}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default footer;
