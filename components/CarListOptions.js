import React, { useState } from 'react'
import {carListData} from "../utils/carListData"
import CarListItem from "./CarListItem"

function CarListOptions({distance}) {
  const [activeIndex,setActiveIndex] = useState();
  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold '>Recommended <span className='text-[#5277de]'>glides</span></h2>
      {
      carListData.map((item,index) =>(
        <div className={`cursor-pointer p-2 px-4 rounded-md border-[#5277de] 
          ${activeIndex==index? 'border-[2px] bg-[#dee7ff]':null}`}
        onClick={()=>setActiveIndex(index)}
        > 
          <CarListItem 
          car={item} 
          distance={distance}
          />
        </div>
      ))
    }
    </div>
    
  )
}

export default CarListOptions
