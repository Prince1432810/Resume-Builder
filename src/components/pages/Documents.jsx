import React from "react";
import rightArrow from "../../assets/ResumeAsset/rightArrow.svg";
import down from "../../assets/ResumeAsset/down.svg";
import swap from "../../assets/ResumeAsset/swap.svg";
import search from "../../assets/DocumentAsset/search.svg";
import columns from "../../assets/DocumentAsset/columns.svg";
import density from "../../assets/DocumentAsset/density.svg";
import filter from "../../assets/DocumentAsset/filter.svg";

const Documents = () => {
    return (
        <div className="w-full -m-1">
            <div className="flex ">
                <div className="text-xs items-end flex">
                    <span className="mr-2">Documents</span>
                    <img className="mr-3 w-4 " src={rightArrow} alt="arrow" />
                    <span>Drive</span>
                </div>
            </div>

            <div className="mt-5 p-6 pb-13 bg-white rounded-lg">
                <div className="flex justify-between">
                    <strong className="text-xl font-extrabold">
                        Documents
                    </strong>
                    <button className="bg-[#3985b6] p-2 h-10 rounded-md text-white w-30 outline-none text-sm font-semibold active:bg-[#4898ce]">
                        Save in Drive
                    </button>
                </div>
                <div className="bg-white border border-gray-200 rounded-t-lg mt-15">
                    <div className="p-4 flex justify-end">
                        <img className="ml-4" src={search} alt="" />
                        <img className="ml-4" src={filter} alt="" />
                        <img className="ml-4" src={columns} alt="" />
                        <img className="ml-4" src={density} alt="" />
                    </div>
                    <div className="w-full rounded-lg ">
                        <div className="flex rounded-t-lg bg-[#3985b6] justify-between p-4 text-white">
                            <div className="flex">
                                <strong className="mr-2">Document Title</strong>
                                <img className="w-4" src={down} alt="" />
                            </div>
                            <div className="flex">
                                <strong className="mr-2">Description</strong>
                                <img
                                    className="w-4 rotate-90"
                                    src={swap}
                                    alt=""
                                />
                            </div>
                            <div className="flex">
                                <strong className="mr-2">View Document</strong>
                                <img
                                    className="w-4 rotate-90"
                                    src={swap}
                                    alt=""
                                />
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
            </div>
        </div>
    );
};

export default Documents;
