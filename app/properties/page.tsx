'use client';
import React, { useState, useEffect} from 'react'

// components
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';
import ListingLoader from '../components/listings/ListingLoader';

// hooks
import useHomeStore from '../store/homeStore';

// actions
import { getListings } from '../store/actions/listingActions';

const page = () => {
    const {user} = useHomeStore();
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [isLoadingFinished, setIsLoadingFinished] = useState(false);
    const loadingTime = Number(process.env.NEXT_PUBLIC_LOADING_TIME) || 1000; 

    useEffect(() => {
        if(!user) return;

        const fetchDetails = async () => {
            const params = {userId: user.id}
            const data = await getListings({setLoading, params});
            setListings(data);
          }
      
          fetchDetails();
    }, [user]);

        // just to give the loader a cool effect
        useEffect(() => {
          if (!loading) {
            const timeout = setTimeout(() => {
              setIsLoadingFinished(true);
            }, loadingTime); 
      
            return () => clearTimeout(timeout);
          }
        }, [loading]);


    if(loading || !isLoadingFinished) {
      return <ListingLoader showButton count={3}/>
    }

    if(!user) return <EmptyState title="Unauthorized" subtitle="Please login"/>

    if(listings.length === 0) {
        return <EmptyState title="No properties found" subtitle='Looks like you have no properties'/>
    }

  return (
    <PropertiesClient listings={listings} currentUser={user} />
  )
}

export default page
