import axiosClient from "../utils/axios-client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import useLoginModal from "./useLoginModal";

interface IUserFavorite {
    listingId: string;
    currentUser?: any;
}

const useFavorite = ({listingId, currentUser}: IUserFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    },[currentUser, listingId])


    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if(!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;

            if (hasFavorited) {
                request = () => axiosClient.delete(`/auth/removeFavorite/${listingId}`)
            } else {
                request = () => axiosClient.post(`/auth/addFavorite/${listingId}`)
            }

            await request();
            location.reload();
            toast.success('Success');
        } catch (error) {
            toast.error("Something went wrong")
        }
    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {hasFavorited, toggleFavorite};
}

export default useFavorite;