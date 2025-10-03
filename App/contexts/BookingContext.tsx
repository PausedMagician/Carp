import React, { createContext, useContext, useState } from 'react';
import type { Vehicle, Booking } from '@/types/openapi';
//import { useAuth } from '@/hooks/UseAuth';
//import { client } from '@/backend/Server';

interface BookingContextType {
    // Booking state
    selectedVehicle: Vehicle | null;
    startDate: Date | null;
    endDate: Date | null;
    purpose: string;
    destination: string;

    // Actions
    setSelectedVehicle: (vehicle: Vehicle | null) => void;
    setDateRange: (start: Date, end: Date) => void;
    setPurpose: (purpose: string) => void;
    setDestination: (destination: string) => void;
    clearBooking: () => void;

    // Derived
    isValidBooking: () => boolean;
    getBookingDuration: () => number;

    // API
    checkAvailability: (vehicleId: number, start: Date, end: Date) => Promise<boolean>;
    getAvailableVehicles: (start: Date, end: Date) => Promise<Vehicle[]>;
    createBooking: () => Promise<Booking>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// ToDo: Create a BookingProvider