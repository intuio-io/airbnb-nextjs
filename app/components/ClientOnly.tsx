// this is not so useful but due to hideration error maybe it will become useful
'use client';
import React, {useEffect, useState} from 'react'

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if(!hasMounted) {
        return null;
    }

  return (
    <>
      {children}
    </>
  )
}

export default ClientOnly
