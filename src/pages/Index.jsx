import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../assets/Deloitte Logo.png";
import {
    Box
} from "@mui/material";
import Navbar from "../components/Navbar";


export default function Index() {
    const navigate = useNavigate(); // Use lowercase "navigate"

    const apps = [
    {
      id: 1,
      name: "Brand Perception AI",
      key: "/brand_perception",
      // icon: "/BrandPerception.png"
      icon:`${import.meta.env.BASE_URL}BrandPerception.png`
    },
    {
      id: 2,
      name: "Brand Infridgement AI",
      key: "/brand_infridgement",
      icon:`${import.meta.env.BASE_URL}BrandInfridgement.jpg`
      // icon: "/BrandInfridgement.jpg"
    },
   
  ];


    const handleOnclick = (project) => {
        if (project) {
            navigate(project);
        } 
    };

    return (
        <div className="font-sans bg-[#ddefe84d] min-h-screen">
            <Navbar name=" Social Media Goveranance" />

      <div className="m-10 p-10 ">
      {/* <h1 className="text-2xl text-center font-bold text-slate-800 mb-10">
      Social Media Goveranance Platform
      </h1> */}

      <div className="grid  h-[260px] grid-cols-1 sm:grid-cols-2 gap-5">
        {apps.map((app) => (
          <div
            key={app.id}
            onClick={() => handleOnclick(app.key)}
            className="flex bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
          >
            {/* 30% Icon Section */}
            <div className="w-[40%]  flex items-center justify-start">
              <img src={app.icon} className='w-65 h-60'/>            
             </div>

            {/* 70% Content Section */}
            <div className="w-[60%] p-4 flex items-center justify-center">
              <h2 className="text-xl font-semibold text-[#007cb0]">
                {app.name}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
    );
}
