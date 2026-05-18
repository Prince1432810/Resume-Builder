import notification from "../assets/NavbarAssest/notification.svg";
import account from "../assets/NavbarAssest/account.svg";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    return (
        <div
            className={`h-12 w-[calc(100%-3rem)] flex justify-between items-center z-10 fixed ${location.pathname === "/resume-builder/create" ? "bg-transparent " : " bg-[#f0f5f8]"}`}
        >
            <img className="h-8 ml-7 " src={logo} alt="Prolegion" />
            <div className="flex w-35 justify-between items-center mr-10">
                <h4 className="font-sans text-xs text-[#3985b6] font-bold">
                    My Profile
                </h4>
                <img src={notification} alt="notification" />
                <img src={account} alt="notification" />
            </div>
        </div>
    );
};

export default Navbar;
