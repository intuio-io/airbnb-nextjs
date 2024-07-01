'use client';
import React, { useState, useEffect, useCallback } from 'react'
import Pusher from 'pusher-js';
import { io } from 'socket.io-client';

// components
import TripsClient from './TripsClient';
import EmptyState from '../components/EmptyState';
import ListingLoader from '../components/listings/ListingLoader';

// hooks
import useHomeStore from '../store/homeStore';

// actions
import { getReservations } from '../store/actions/reservationActions';

const page =  () => {
    const { user } = useHomeStore();
    const [reservations, setReservations] = useState<any[]>([]);
    const [resLoading, setResLoading] = useState<boolean>(false);
    const [isLoadingFinished, setIsLoadingFinished] = useState(false);
    const loadingTime = Number(process.env.NEXT_PUBLIC_LOADING_TIME) || 1000; 

    const fetchReservations = useCallback(async () => {
      const params = { userId: user?.id };
      const data = await getReservations({ setResLoading, params });
      setReservations(data);
    }, [user?.id]);

    useEffect(() => {
      if(!user) return;
      fetchReservations();
    }, [user?.email])

    useEffect(() => {
      if(!user) return;
      if (process.env.NEXT_PUBLIC_SOCKET_TYPE === 'ExpressSocket') {
        const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000');
        socket.on("reservationsDeleted", () => fetchReservations());
        return () => {
          socket.off('reservationsDeleted');
          socket.disconnect();
        }
      }
    }, [user?.email])

    useEffect(() => {
      if (!user) return;
  
      if (process.env.NEXT_PUBLIC_SOCKET_TYPE === 'LaravelPusher' && process.env.NEXT_PUBLIC_PUSHER_APP_KEY && process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER) {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
          cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        });
  
        const channel = pusher.subscribe('reservation-channel');
  
        channel.bind('reservationsDeleted', () => fetchReservations());
  
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        };
      }
    }, [user?.email]);

    // just to give the loader a cool effect
    useEffect(() => {
      if (!resLoading) {
        const timeout = setTimeout(() => {
          setIsLoadingFinished(true);
        }, loadingTime); 
  
        return () => clearTimeout(timeout);
      }
    }, [resLoading]);

    if(resLoading || !isLoadingFinished) {
      return <ListingLoader showButton count={6}/>
    }
    
    if(!user) return <EmptyState title="Unauthorized" subtitle="Please login"/>
    
    if (reservations.length === 0 ) {
      return <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trips."/>
    }
    

  return (
    <TripsClient 
        reservations={reservations}
        currentUser={user}
    />
  )
}

export default page
