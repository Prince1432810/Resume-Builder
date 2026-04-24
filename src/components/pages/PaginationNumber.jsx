import { useContext } from "react"
import { OfferLetterContext } from "./OfferLetterContext"


const PaginationNumber = ({num}) => {
  const styling = " text-black text-sm pl-3 ml-2 pr-3 p-1.5 rounded-lg cursor-pointer"
  const {curPage, setCurPage} = useContext(OfferLetterContext);
  return (
    <div
      onClick={() => (setCurPage(num-1))}
      className={(curPage+1 === num) ?`text-white bg-[#3985b6] ${styling}`:`${styling} hover:bg-gray-200  transition-all duration-200`}>
      {num}
    </div>
  )
}

export default PaginationNumber
