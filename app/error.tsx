'use client';

import React from 'react'
import { useEffect } from "react";

// components
import EmptyState from './components/EmptyState';

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
    useEffect(() => {
        console.error(error);
    }, [error])
  return (
    <EmptyState 
        title="Oops!"
        subtitle='Something went wrong'
    />
  )
}

export default ErrorState;
