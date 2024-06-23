'use client';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

// components
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories';

// actions
import { getCurrentUser } from '@/app/store/actions/authActions';

// hooks
import useHomeStore from '@/app/store/homeStore';

const Navbar = () => {
  const { user, addUser } = useHomeStore();
  const router = useRouter();

  useEffect(() => {
   const fetch = async () => {
    const userDetails  = await getCurrentUser();
    if(!userDetails) {
      router.push("/");
      return;
    }
    addUser(userDetails);
   }

   fetch();
  }, [addUser])

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
     <div className='py-4 border-b-[1px]'>
        <Container>
            <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                <Logo/>
                <Search/>
                <UserMenu currentUser={user}/>
            </div>
        </Container>
     </div>
     <Categories/>
    </div>
  )
}

export default Navbar
