import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
    const headerMenu = [
        {
            id:1,
            name:'Ride',
            icon:'/taxi.png'
        },
        {
            id:2,
            name:'Package',
            icon:'/box.png'
        },
    ]
  return (
    <div className='pt-4 pl-3 pb-1 border-b-[4px] border-gray-200 flex items-center justify-between'>
      <div className='flex gap-24 items-center'>
        <Image src='/glide-logo.jpeg' 
        width={110}
        height={110}
        alt='logo'
        />
        <div className="flex gap-6 items-center">
  {headerMenu.map((item) => (
    <div key={item.id} className="flex gap-2 items-center">
      <Image src={item.icon} width={17} height={17} alt={item.name} />
      <h2 className="text-[14px] font-bold">{item.name}</h2>
    </div>
  ))}
</div>

      </div>
      <UserButton />
    </div>
  )
}

export default Header
