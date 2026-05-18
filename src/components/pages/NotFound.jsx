import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { useContext } from "react";

const NotFound = () => {
    const { setTab } = useContext(UserContext);
    return (
        <div className="fixed flex items-center justify-center h-screen w-screen">
            <div className=" flex flex-col justify-center items-center w-fit">
                <span className="text-8xl text-[#0b85ba] font-light">404</span>
                <span className="mt-5">Something's Missing.</span>
                <span className="mt-5">
                    Sorry we can't find that page. You'll find more to explore
                    on the dashboard
                </span>
                <Link to="/">
                    <button
                        onClick={() => setTab("dash")}
                        className="bg-[#3985b6] p-2 h-10 rounded-md mt-5 text-white w-fit pl-10 pr-10 text-sm font-semibold active:bg-[#4898ce]"
                    >
                        Back to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
