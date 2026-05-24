import React, { useState } from "react";
import menuIcon from "../assets/sidebarAsset/menu.svg";
import dash from "../assets/sidebarAsset/dash.svg";
import marketplace from "../assets/sidebarAsset/marketplace.svg";
import pdf from "../assets/sidebarAsset/pdf.svg";
import expenses from "../assets/sidebarAsset/expenses.svg";
import support from "../assets/sidebarAsset/support.svg";
import supportIcon from "/Icons/supportHistory.svg";
import supportIconWhite from "/Icons/supportHistoryWhite.svg";
import supportWhite from "../assets/sidebarAsset/supportWhite.svg";
import dashWhite from "../assets/sidebarAsset/dashWhite.svg";
import marketplaceWhite from "../assets/sidebarAsset/marketplaceWhite.svg";
import pdfWhite from "../assets/sidebarAsset/pdfWhite.svg";
import expensesWhite from "../assets/sidebarAsset/expensesWhite.svg";

import { Briefcase } from "lucide-react";

import "../index.css";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { to: "/", label: "DashBoard", icon: dash, activeIcon: dashWhite },
    { to: "/jobs", label: "Browse Jobs", icon: marketplace, activeIcon: marketplaceWhite },
    { to: "/applications", label: "My Applications", icon: expenses, activeIcon: expensesWhite },
    { to: "/resume-builder", label: "Resume Builder", icon: pdf, activeIcon: pdfWhite, matchPaths: ["/resume-builder", "/resume-builder/create"] },
    { to: "/support", label: "Support", icon: support, activeIcon: supportWhite },
    { to: "/support/history", label: "Queries", icon: supportIcon, activeIcon: supportIconWhite },
];

const Sidebar = () => {
    const path = useLocation().pathname;
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (item) => {
        if (item.matchPaths) return item.matchPaths.includes(path);
        return path === item.to;
    };

    const NavLinks = ({ onClickLink }) => (
        <div className="mt-5">
            {navItems.map((item) => (
                <Link to={item.to} key={item.to} onClick={onClickLink}>
                    <div className={isActive(item) ? "iconList text-white bg-[#3985b6]" : "iconList do-hover"}>
                        {item.to !== '/applications' ? (
                            <img
                                src={isActive(item) ? item.activeIcon : item.icon}
                                alt={item.label}
                                className="icons"
                            />
                        ) : (
                            <Briefcase
                                size={20}
                                className={isActive(item) ? "text-white" : "text-[#18343C]"}
                            />
                        )}
                        <span className="iconMsg">{item.label}</span>
                    </div>
                </Link>
            ))}
        </div>
    );

    return (
        <>
            {/* ── MOBILE top bar ── */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center h-14 px-4 gap-3">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="p-1 rounded-md hover:bg-gray-100 transition"
                    aria-label="Open menu"
                >
                    <img src={menuIcon} alt="menu" className="w-6 h-6" />
                </button>
                <img
                    src="https://d2u6422zz9hxmk.cloudfront.net/Assets/Prolegion_Logo_New.png"
                    alt="Prolegion"
                    className="h-7"
                />
            </div>

            {/* ── MOBILE drawer overlay ── */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* ── MOBILE drawer ── */}
            <div
                className={`
                    lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-50
                    border-r border-gray-200 p-4
                    transform transition-transform duration-250 ease-in-out
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex items-center justify-between mb-2">
                    <img
                        src="https://d2u6422zz9hxmk.cloudfront.net/Assets/Prolegion_Logo_New.png"
                        alt="Prolegion"
                        className="h-8"
                    />
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-500 text-xl leading-none"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>
                <NavLinks onClickLink={() => setMobileOpen(false)} />
            </div>

            {/* ── DESKTOP sidebar (unchanged behavior) ── */}
            <div
                className="
                    bg-white w-16 h-screen p-4 pl-2
                    border-r border-gray-200
                    hidden lg:flex flex-col justify-between z-20 fixed
                    transition-all duration-200
                    hover:w-65 group
                "
            >
                <div>
                    <img
                        src={menuIcon}
                        alt="menu"
                        className="w-6 ml-2 mb-2 mt-1.5 transition-all duration-300 group-hover:opacity-0 absolute select-none"
                    />
                    <img
                        className="relative h-8 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
                        src="https://d2u6422zz9hxmk.cloudfront.net/Assets/Prolegion_Logo_New.png"
                        alt="Prolegion"
                    />
                    <NavLinks />
                </div>
            </div>
        </>
    );
};

export default Sidebar;