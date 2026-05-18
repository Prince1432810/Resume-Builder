import eye from "../../assets/OfferLetterAsset/eye.svg";
import results from "../../compData/OfferLetterData";
import { useContext, useEffect } from "react";
import { PaginationContext } from "./PaginationContext";

const Candidates = () => {
    const { start, pageLength } = useContext(PaginationContext);

    function color(str) {
        if (str === "Completed")
            return "text-[#065f46] bg-[#d1fae5] border-[#6ee7b7]";
        else if (str === "Partially Signed")
            return "text-[#723b13] bg-[#fdf6b2] border-[#fcd34d]";
        else if (str === "Sent For Signature")
            return "text-[#1e40af] bg-[#dbeafe] border-[#93c5fd]";
        else return "text-[#991b1b] bg-[#fee2e2] border-[#fcafa5]";
    }

    function pickColor(str) {
        return color(str) + " border rounded-full p-1 pl-2 pr-2";
    }

    return (
        <div className="w-full">
            <table border="1" className="w-full">
                <thead>
                    <tr className="p-4 border-b text-sm border-b-gray-200 bg-[#3985b6] text-white">
                        <th className="items">CANDIDATE NAME</th>
                        <th className="items">JOB TITLE</th>
                        <th className="items">OFFER STATUS</th>
                        <th className="items">LAST UPDATED</th>
                        <th className="items">ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    {results.slice(start, start + pageLength).map((result) => {
                        return (
                            <tr
                                key={result.id}
                                className="p-4 border-b border-b-gray-200"
                            >
                                <td className="items  names">
                                    <b>{result.candidate_name}</b>
                                </td>
                                <td className="items  text-sm ">
                                    {result.job_title}
                                </td>
                                <td className="items text-xs">
                                    <b className={pickColor(result.status)}>
                                        {result.status}
                                    </b>
                                </td>
                                <td className="items text-sm">
                                    {result.updatedAt.split("T")[0]}
                                </td>
                                <td className="items">
                                    <div className="flex cursor-pointer select-none text-[#3985b6] active:scale-99 acitve:text-[#3985b6]  hover:text-[#265c80] hover:scale-102 transition-all duration-100">
                                        <img
                                            className="w-4 mr-2"
                                            src={eye}
                                            alt="view"
                                        />
                                        <span className="">View</span>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Candidates;
