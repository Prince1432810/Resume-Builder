// import notification from "../assets/NavbarAssest/notification.svg";
// import account from "../assets/NavbarAssest/account.svg";
// import logo from "../assets/logo.png";
// import { useLocation } from "react-router-dom";
// import { UserButton} from "@clerk/clerk-react";

// const Navbar = () => {
//     const location = useLocation();

//     return (
//         <div
//             className={` h-12 w-[calc(100vw-64px)] flex justify-between items-center z-10 fixed ${location.pathname === "/resume-builder/create" ? "bg-transparent " : " bg-[#f0f5f8]"}`}
//         >
//             <img className="h-8 ml-7 " src={logo} alt="Prolegion" />
//             <div className="flex  justify-between items-center mr-10">
//                 {/* <h4 className="font-sans text-xs text-[#3985b6] font-bold">
//                     My Profile
//                 </h4>
//                 <img src={notification} alt="notification" /> */}
//                 <UserButton />
//             </div>
//         </div>
//     );
// };

// export default Navbar;


// import logo from "../assets/logo.png";
// import { useLocation } from "react-router-dom";
// import { UserButton } from "@clerk/clerk-react";

// const Navbar = () => {
//     const location = useLocation();

//     return (
//         <div
//             className={`
//                 flex
//                 h-12 
//                 w-full lg:w-[calc(100vw-64px)] 
//                 justify-between items-center z-10 fixed
//                 ${location.pathname === "/resume-builder/create" ? "bg-transparent" : "bg-[#f0f5f8]"}
//             `}
//         >
//             <img className="h-8 ml-7" src={logo} alt="Prolegion" />
//             <div className="flex items-center mr-10">
//                 <UserButton />
//             </div>
//         </div>
//     );
// };

// export default Navbar;



import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            {/* Mobile UserButton — fixed top right */}
            <div className="lg:hidden fixed top-3 right-4 z-50">
                <UserButton />
            </div>

            {/* Navbar */}
            <div
                className={`
                    flex
                    h-12 
                    w-full lg:w-[calc(100vw-64px)] 
                    justify-between items-center z-10 fixed
                    ${location.pathname === "/resume-builder/create" ? "bg-transparent" : "bg-[#f0f5f8]"}
                `}
            >
                <img className="h-8 ml-7" src={logo} alt="Prolegion" />
                <div className="flex items-center mr-10">
                    <div className="hidden lg:block">
                        <UserButton />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;