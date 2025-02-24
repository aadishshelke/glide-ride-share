"use client";
import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function AuthWrapper({ children }) {
  const pathname = usePathname();
  // Define public paths where you want your custom auth components (SignIn/SignUp) to render.
  const publicPaths = ['/sign-in', '/sign-up'];

  return (
    <>
      <SignedIn>
        <Header />
        {children}
      </SignedIn>
      <SignedOut>
        {publicPaths.includes(pathname) ? children : <RedirectToSignIn />}
      </SignedOut>
    </>
  );
}
