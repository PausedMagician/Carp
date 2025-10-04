import { BookingContext } from "@/contexts/BookingContext";
import { useContext } from "react";

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}