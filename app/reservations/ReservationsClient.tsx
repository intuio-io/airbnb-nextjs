"use client";
import React, { useCallback, useState} from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// components
import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listings/ListingCard';

// utils
import axiosClient from '../utils/axios-client';

interface ReservationsClientProps {
  reservations: any[];
  currentUser?: any;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({reservations, currentUser}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axiosClient.delete(`/reservation/delete/${id}`).then(({ data }) => {
      toast.success(data.message);
      router.refresh();
    })
    .catch((error) => {
      toast.error(error.message);
    }).finally(() => {
      setDeletingId("");
    })
  }, [])

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
      <div className='mt-10 grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => {
            return (<ListingCard
                      key={reservation.id}
                      data={reservation.listing}
                      reservation={reservation}
                      actionId={reservation.id}
                      onAction={onCancel}
                      disabled={deletingId === reservation.id}
                      actionLabel='Cancel guest reservation'
                      currentUser={currentUser}
          />)
          })
        }
      </div>
    </Container>
  )
}

export default ReservationsClient
