import { useState, useEffect } from 'react';
import axiosClient from '../utils/axios-client';
import toast from 'react-hot-toast';

interface UseGetReservationsReturn {
  reservations: any[]; 
  loading: boolean;
  error: string | null;
}

interface FetchParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

function useGetReservations(params: FetchParams): UseGetReservationsReturn {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/reservation/getReservations', {
          params,
        });
        setReservations(response.data);
      } catch (error: any) {
        setError(error.message || "An error occurred while fetching reservations.");
        toast.error("Error fetching details");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return { reservations, loading, error };
}

export default useGetReservations;
