'use client';

import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();
  return (
  <Image 
    onClick={() => router.push("/")}
    alt="Logo" 
    className="hidden md:block coursor-pointer" 
    height="100" width="125" src="/images/logo.png"/>
  )
}

export default Logo