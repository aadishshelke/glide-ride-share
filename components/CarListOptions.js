import React, { useState } from 'react'
import {carListData} from "../utils/carListData"
import CarListItem from "./CarListItem"
import { useRouter } from 'next/navigation';

function CarListOptions({distance}) {
  const [activeIndex,setActiveIndex] = useState();
  const [selectedCar,setSelectedCar] = useState([]);
  const router=useRouter();
  return (
    <div className=' p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold mb-5'>Recommended <span className='text-[#5277de]'>glides</span></h2>
      {
      carListData.map((item,index) =>(
        <div className={`cursor-pointer p-2 px-4 rounded-md border-[#5277de] 
          ${activeIndex==index? 'border-[2px] bg-[#dee7ff]':null}`}
        onClick={()=>{setActiveIndex(index);
          setSelectedCar(item);
        }}
        > 
          <CarListItem 
          car={item} 
          distance={distance}
          />
        </div>
      ))
    }
    {selectedCar?.name? 
    <div className='flex justify-between fixed bottom-5 rounded-lg bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center'
    onClick={()=>router.push('/payment?amount='+(selectedCar.amount*distance).toFixed(2))}
    >
      <h2>Make Payment For</h2>
      <button className='p-3 bg-[#5277de] text-white rounded-lg text-center '>Request {selectedCar.name}</button>
    </div>
    :null}
    </div>
    
  )
}

export default CarListOptions
