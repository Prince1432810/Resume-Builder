import rightArrow from '../../assets/ResumeAsset/rightArrow.svg'
import Candidates from './Candidates'
import search from '../../assets/OfferLetterAsset/search.png'
import { PaginationContext } from './PaginationContext'
import { useState } from 'react'
import results from '../../compData/OfferLetterData'
import PaginationNumber from '../pages/PaginationNumber'
import { OfferLetterContext } from './OfferLetterContext'

const Offer_Letter = () => {
    const [curPage, setCurPage] = useState(0);

    const arr = [];
    
    const pageLength = 10;
    const [totalPage] = useState(Math.ceil(results.length / pageLength) || 1);
    
    const start = curPage * pageLength;

    function tempArray(){
        for(let i=0; i<totalPage; i++)
            arr.push(i+1);
    }
    tempArray();
    
    function nextPage(){
        if(curPage === totalPage-1)
            return;

        setCurPage(curPage + 1);
        // setStart(curPage * pageLength);

        function print(){
            console.log(curPage);
        }
        print();
    }



    function prevPage(){
        if(curPage === 0)
            return;
        setCurPage(prev => prev-1);
        // setStart(prev => curPage * pageLength)
    }

  return (
    <div className='w-full -m-1'>
      <div className='flex '>
        <div className='text-xs items-end flex'>
            <span className='mr-2'>Offer Letters</span>
            <img className='mr-3 w-4 ' src={rightArrow} alt="arrow" />
            <span>Letter</span>
        </div>
      </div>

        <div className='mt-5 p-6 pb-13 bg-white rounded-lg'>
            <div className='flex justify-between'>
                <div>
                    <strong className='text-2xl '>Offer Letters</strong>
                    <p className='text-gray-500'>Manage and track all offer letters</p>
                </div>
                <button className="bg-[#3985b6] p-2 pl-5 pr-5 h-11 rounded-md text-white w-auto outline-none  active:bg-[#4898ce]"> + Create Offer Letter</button>
            </div>
            <div className=' rounded-t-lg mt-5'>
                
                <div className='w-full rounded-lg '>
                    
                    <img src={search} className='mb-5' alt="search" />

                    <div className='bg-white h-fit w-full '>
                        <PaginationContext.Provider value={{ start, pageLength}}>
                            <Candidates/>
                        </PaginationContext.Provider>
                        
                    </div>

                    <div className='flex justify-center p-4 border-t border-t-gray-200'>
                        <div className='flex select-none '>
                            <button onClick={prevPage}><img className='rotate-180 ml-5 mr-2 w-8 p-1.5  hover:bg-gray-200 rounded-lg transition-all duration-200 cursor-pointer' src={rightArrow} alt="prev page" /></button>
                            <span className='text-gray-500 flex'>
                                {
                                    arr.map((num) => {
                                        return (
                                            <OfferLetterContext.Provider key={num} value={{curPage, setCurPage}}>
                                                <PaginationNumber key={num} num={num}/>
                                            </OfferLetterContext.Provider>
                                        )
                                    })
                                }
                            </span>
                            <button onClick={nextPage} ><img className='ml-2 w-8 p-1.5 hover:bg-gray-200 rounded-lg transition-all duration-200 cursor-pointer' src={rightArrow} alt="next page" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Offer_Letter