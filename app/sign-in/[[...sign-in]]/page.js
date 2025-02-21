import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
    <div>
        <Image 
        src='/bg3.jpg' 
        width={1000}
        height={1000}
        className='object-contain h-full w-full'
        alt="Background Image"
        />
        <div className='absolute top-20 left-10'>
            <SignIn />
        </div>
        
    </div>
    </>
  
)
}