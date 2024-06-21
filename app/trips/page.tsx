'use client';
import React, { useMemo } from 'react'

// components
import TripsClient from './TripsClient';
import EmptyState from '../components/EmptyState';

// hooks
import useCurrentUser from '../hooks/useCurrentUser';
import useGetReservations from '../hooks/useGetReservations';

const page =  () => {
    const currentUser = useCurrentUser();

    const { reservations, loading, error } = useGetReservations(currentUser? { userId: currentUser.id } : {});
    
    if(!currentUser) return <EmptyState title="Unauthorized" subtitle="Please login"/>
    
    if (reservations.length === 0 ) {
        return <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trips."/>
    }

  return (
    <TripsClient 
        reservations={reservations}
        currentUser={currentUser}
    />
  )
}

export default page
