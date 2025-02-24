"use client"
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import { toast } from 'react-toastify'

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
            <SignIn 
            onSignIn={() => toast.success("Signed in successfully")}
            />
        </div>
        
    </div>
    </>
  
)
}