import React from "react";
import rightArrow from "../../assets/ResumeAsset/rightArrow.svg";
import down from "../../assets/ResumeAsset/down.svg";
import swap from "../../assets/ResumeAsset/swap.svg";
import { Link } from "react-router-dom";

const Resumebuilder = () => {
    return (
        <div className="w-full -m-1">
            <div className="flex justify-between">
                <div className="text-xs items-end flex">
                    <span className="mr-2">Resume builder</span>
                    <img className="mr-3 w-4 " src={rightArrow} alt="arrow" />
                    <span>Resume</span>
                </div>
                <Link to="/resume-builder/create">
                    <button className="bg-[#3985b6] p-2 h-10 rounded-md text-white w-38 outline-none text-sm font-semibold active:bg-[#4898ce]">
                        Generate Resume
                    </button>
                </Link>
            </div>

            <div className="w-full bg-white mt-5 rounded-lg border border-gray-200">
                <div className="flex rounded-t-lg bg-[#3985b6] justify-between p-4 text-white">
                    <div className="flex">
                        <strong className="mr-2">Name</strong>
                        <img className="w-4" src={down} alt="" />
                    </div>
                    <div className="flex">
                        <strong className="mr-2">Downloaded</strong>
                        <img className="w-4 rotate-90" src={swap} alt="" />
                    </div>
                    <div className="flex">
                        <strong className="mr-2">View</strong>
                        <img className="w-4 rotate-90" src={swap} alt="" />
                    </div>
                    <div> </div>
                </div>

                <div className="bg-white h-58 w-full flex justify-center items-center">
                    <span className=" text-gray-500 h-fit">
                        No Data Available
                    </span>
                </div>

                <div className="flex justify-end p-4 border-t border-t-gray-200">
                    <span className="text-gray-500">0-0 of 0</span>
                    <div className="flex">
                        <img
                            className="rotate-180 ml-5"
                            src={rightArrow}
                            alt=""
                        />
                        <img className="ml-2" src={rightArrow} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resumebuilder;
