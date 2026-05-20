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
      icon: "/BrandPerception.png"
      //icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACa0lEQVR4nO2ZO2hUQRSGv4hR0kgMIlHQiIKNjYVYCBYiioUWghorRSOCIGJlISiCiJXprYKCAfEB4gPRJmSJ4hsiiIWNlaD4wMQHvq6M/MWw7sY7e+dM7pr94TZ7z/n/8zNzZ+fMQAtTG/eAu4bxyZDpsYovjPnAHmC999uIV0j1wwTvshzxFSJiJnAAeAD8ksBr731maCSLYaAN2AW89Eg/ApeAdTWMxJ5aWQwjHcCgR3Yf2KTRyVOEmxLDAXqVGvGFjcwCHorkPbBVo5P6Q82K8E4DrongObA0QNDqaQhHvY+5J2dO6YwsBD5rZVoTkFe6qXVGiYOpBC14u4CvwHdgUTMb2a+kG6kErXhvKWl7MxtpB8b1kc9JIWjFu1IJT1MJkm+pDebdqYSBwGJKZ+SEEg4HFlMqI+3AMyVsDiymIUErIwcV/KLOzjakqEkz0gW8VfDGwEIaErQyclqBtwOLqFdUbGR5eJcDP7QlWZZC0Ip3SEH9EQWTb+O3eT1HZwQjFUMTwxMJP1LQXpocH2RkCU2OCzIyBpxscKNYCnQCl715OKZtyoxJqKUDeALcLEKyArjqnR5uIT2OSftODLJTIjtCWiz2DjtWxSDcLSNnSYvr0nWHHlGwOubw5sRaab4D5sYinSfSN6TDlYI9UE206ZTdEc/GHguAn8AXi6X/sYy4/t0afdK6aEF+XuQ7sMc5ae2zID8kcvdHaY1RablWIjrcAfY3zd0N2OKVjHRbCRyXwLiOUKMti1VwzZzTmW7E/+eSZ+Af/UGMW1arjvIv9OrK+VNox1Y2I/XQMlKFlpFY+G9GpAUi4jdZyZqG3u7tXwAAAABJRU5ErkJggg==",
    },
    {
      id: 2,
      name: "Brand Infridgement AI",
      key: "/brand_infridgement",
      icon: "/BrandInfridgement.jpg"
      //icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC0ElEQVR4nO2cS2sUQRCAv/iK74sIcT35awysZw8eBQ9eFHzEgweFCIpHycGAoKCIL/QQRBQjYtST4NGbh/gLzArGV0YaamBodkl2q3u2p6c+KNjZnanu+rZ7d2d2aDAMwzCMBJkGvgGFxLI8l2u7wVmuFFEtJtd2g1NIDNrOrd3gFCZQR2EC+3MEWAR+9Pms6RclRc0xTLs9qakbW96VyIUUYxJYjdmYI881sAqcAw5kNIVdLeeltiLWSHwjyZ28jVA0SGDJjOzrpnNwepJ8KmOBU7LvSh0dy/WHdLQ3etjE014xdZ7KadpNRmBTMYFKTKASE6jEBKYusC0RnHEXVOQiMHcKE6jDBCoxgUpMoBITqMQEKjGBSkygEhMIHAbOjHhs6wV2gZ/S17MjHN9qgUeB35W+fgV2DpmjtQKPAX88eYdGyNNKgSeAf5U+fgE6I+ZqncCTwFqlf5+B/Yp8rRI4413D+wTsU+ZMWuAksDtQfy578paAvQHyJitwElgA3geQOOvJewvsIQxJCtwMvK7kcI93jJBnArjhyXsObCccSQp0nPYKfzVk4U7enJdjIbC8pAUip1dVAS9kam9kBN/xjn0AbCU8SQt0XPJEPF1HhHvtsXfMPWALcUheYL9bhZ8MELINeObtOw9sIh6NEOi46ol5KFO1xJ3DvvT2mZPPwpg0RqDjuifotoyuXd63totr1EOjBE4ANz1Rt4CP3nMXqY9GCSwlznvCylhTXBhtjUBk2t7tI+8U9dNIgcgXyH1p4y9wnPHQWIHlb75HcnF0XDRaYAqYQCUmUIkJVGIClZhAJSZQiQlsksAP8m9YLtuD6gxCv8RLwLuMtgfVGQSbwkpWJPF6i000mYNS4/cYyRcluVvdIlcuxFx0oivJV+WelA750BF5v6TGaAvw+LdUFBlGtIV3SroyxHsJFBsqalv6yTAMwzAMwzAMAzX/AQJrHofD9VwtAAAAAElFTkSuQmCC",
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
