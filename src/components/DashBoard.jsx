import { useEffect, useRef, useState } from "react";
import jobs from "../compData/CardData";
import Card from "./Card";
import rightIcon from "../assets/CardAsset/right_arrow.svg";
import Profile from './Profile'
import Generate from './Generate'
import AiInterview from './AiInterview'


const DashBoard = () => {  

  return (
    <div className="w-full h-full">

      <div className="flex flex-col lg:flex-row w-full grow-0 gap-3">

        <div className="bg-white w-full lg:w-[70%] grow-0 min-w-0 h-auto rounded-lg p-4 overflow-hidden">

          <div className="flex justify-between mb-8">
            <div className="text-gray-500">
              <strong className="text-lg">Recommended Jobs</strong>
              <p>as per your profile</p>
            </div>
            <div className="flex items-center">
              <span className="text-[#3985b6] font-medium">View all jobs</span>
              <img className="w-7 ml-2" src={rightIcon} alt="" />
            </div>
          </div>

          
          <div className="flex flex-nowrap overflow-x-scroll no-grow w-full gap-[2%]">
            {
              jobs.map(job => 
              <Card key={job.id} jobs={job} />
              )
            }
          </div>
        
        </div>
        <div className="w-full lg:w-[30%]">
          <Profile/>
        </div>
      
      </div>

      <div className="flex flex-col sm:flex-row  w-full mt-5 gap-3">
        <Generate/>
        <AiInterview/>
      </div>
    </div>
  );
};

export default DashBoard;