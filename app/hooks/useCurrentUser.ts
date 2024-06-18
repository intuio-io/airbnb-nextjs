import { useEffect, useState } from 'react';
import axiosClient from '../utils/axios-client';

function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!localStorage.getItem("ACCESS_TOKEN")) return null;

      try {
        const { data } = await axiosClient.get('/auth/user');
        if (!data) return null;
        setCurrentUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentUser();
  }, []);

  return currentUser;
}

export default useCurrentUser;