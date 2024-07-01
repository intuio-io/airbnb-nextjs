'use client';
import React, { useState, useEffect, useCallback } from 'react'
import Pusher from 'pusher-js'
import { io } from 'socket.io-client';

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

    const fetchDetails = useCallback(async () => {
      const params = {userId: user.id}
      const data = await getListings({setLoading, params});
      setListings(data);
    }, [user?.id]);

    useEffect(() => {
        if(!user) return;
        fetchDetails();
    }, [user?.email]);

    useEffect(() => {
      if(!user) return;
  
      if (process.env.NEXT_PUBLIC_SOCKET_TYPE === 'ExpressSocket') {
        const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000');
        socket.on("listingsDeleted", () => fetchDetails());
        return () => {
          socket.off('listingsDeleted');
          socket.disconnect();
        }
      }
    }, [user?.email]);


    useEffect(() => {
      if (!user) return;
  
      if (process.env.NEXT_PUBLIC_SOCKET_TYPE === 'LaravelPusher' && process.env.NEXT_PUBLIC_PUSHER_APP_KEY && process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER) {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        });
  
        const channel = pusher.subscribe('listing-channel');
        channel.bind('listingsDeleted', () => fetchDetails());
  
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }
    }, [user?.email]);

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
