import React from "react";
import menuIcon from "../assets/sidebarAsset/menu.svg";
import dash from "../assets/sidebarAsset/dash.svg";
import marketplace from "../assets/sidebarAsset/marketplace.svg";
import interview from "../assets/sidebarAsset/interview.svg";
import pdf from "../assets/sidebarAsset/pdf.svg";
import expenses from "../assets/sidebarAsset/expenses.svg";
import documents from "../assets/sidebarAsset/documents.svg";
import chat from "../assets/sidebarAsset/chat.svg";
import support from "../assets/sidebarAsset/support.svg";
import offer_letter from "../assets/sidebarAsset/offerLetter.svg";

import offerWhite from "../assets/sidebarAsset/offerWhite.svg";
import dashWhite from "../assets/sidebarAsset/dashWhite.svg";
import marketplaceWhite from "../assets/sidebarAsset/marketplaceWhite.svg";
import pdfWhite from "../assets/sidebarAsset/pdfWhite.svg";
import expensesWhite from "../assets/sidebarAsset/expensesWhite.svg";
import documentswhite from "../assets/sidebarAsset/documentsWhite.svg";
import chatwhite from "../assets/sidebarAsset/chatWhite.svg";
import supportwhite from "../assets/sidebarAsset/supportWhite.svg";
import "../index.css";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const path = useLocation().pathname;

    return (
        <div
            className="
        bg-[#ffffff]
        w-16 h-screen
        p-4 pl-2
        border-r border-gray-200
        hidden lg:flex flex-col justify-between z-20 fixed
        transition-all duration-200 
        hover:w-65
        group
    "
        >
            <div>
                <img
                    src={menuIcon}
                    alt="menu"
                    className="w-6 ml-3 mb-2 mt-1.5 transition-all duration-300 group-hover:opacity-0 absolute select-none"
                />
                <img
                    className="relative h-8 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 "
                    src="https://d2u6422zz9hxmk.cloudfront.net/Assets/Prolegion_Logo_New.png"
                    alt=""
                />

                <div className="">
                    <Link to="/">
                        <div
                            className={
                                path === "/"
                                    ? "iconList text-white bg-[#3985b6]"
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={path === "/" ? dashWhite : dash}
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">DashBoard</span>
                        </div>
                    </Link>

                    <Link to="/market-place">
                        <div
                            className={
                                path === "/market-place"
                                    ? "iconList text-white bg-[#3985b6]"
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={
                                    path === "/market-place"
                                        ? marketplaceWhite
                                        : marketplace
                                }
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">Marketplace</span>
                        </div>
                    </Link>

                    <Link to="/offer-letter">
                        <div
                            className={
                                path === "/offer-letter"
                                    ? "iconList text-white bg-[#3985b6] "
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={
                                    path === "/offer-letter"
                                        ? offerWhite
                                        : offer_letter
                                }
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">Offer Letter</span>
                        </div>
                    </Link>

                    <Link to="/resume-builder">
                        <div
                            className={
                                path === "/resume-builder" ||
                                path === "/resume-builder/create"
                                    ? "iconList text-white bg-[#3985b6] "
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={
                                    path === "/resume-builder" ||
                                    path === "/resume-builder/create"
                                        ? pdfWhite
                                        : pdf
                                }
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">Resume Builder</span>
                        </div>
                    </Link>

                    <Link to="/expenses">
                        <div
                            className={
                                path === "/expenses"
                                    ? "iconList text-white bg-[#3985b6] "
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={
                                    path === "/expenses"
                                        ? expensesWhite
                                        : expenses
                                }
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">Expenses</span>
                        </div>
                    </Link>

                    <Link to="/documents">
                        <div
                            className={
                                path === "/documents"
                                    ? "iconList text-white bg-[#3985b6] "
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={
                                    path === "/documents"
                                        ? documentswhite
                                        : documents
                                }
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">Documents</span>
                        </div>
                    </Link>

                    <Link to="/chat">
                        <div
                            className={
                                path === "/chat"
                                    ? "iconList text-white bg-[#3985b6] "
                                    : "iconList do-hover"
                            }
                        >
                            <img
                                src={path === "/chat" ? chatwhite : chat}
                                alt="dash"
                                className="icons "
                            />
                            <span className="iconMsg">Chat</span>
                        </div>
                    </Link>
                </div>
            </div>

            <img
                src={support}
                alt="support"
                className="w-5 mb-5 ml-2 select-none"
            />
        </div>
    );
};

export default Sidebar;
