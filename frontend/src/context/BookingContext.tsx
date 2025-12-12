import React, { createContext, useContext, ReactNode } from 'react';

const BookingContext = createContext<any>(null);

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
    return <BookingContext.Provider value={{}}>{children}</BookingContext.Provider>;
};
