import React, { createContext, useState } from 'react';
import type { Vehicle, Booking } from '@/types/openapi';
import { client } from '@/backend/Server';
import { useAuth } from '@/hooks/UseAuth';

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

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth();

    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [purpose, setPurpose] = useState<string>('');
    const [destination, setDestination] = useState<string>('');

    /**
     * Set the date range for the booking
     */
    const setDateRange = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };

    /**
     * Clear all booking state
     */
    const clearBooking = () => {
        setSelectedVehicle(null);
        setStartDate(null);
        setEndDate(null);
        setPurpose('');
        setDestination('');
    };

    /**
     * Check if the current booking has all the required input
     */
    const isValidBooking = (): boolean => {
        return !!(
            selectedVehicle &&
            startDate &&
            endDate &&
            purpose.trim().length > 0 &&
            auth.user
        );
    };

    /**
     * Calculate booking duration in days
     * If same day, returns 1
     */
    const getBookingDuration = (): number => {
        if (!startDate || !endDate) return 0;

        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays === 0 ? 1 : diffDays;
    };

    /**
     * Check if a vehicle is available for the given date range
     */
    const checkAvailability = async (
        vehicleId: number,
        start: Date,
        end: Date
    ): Promise<boolean> => {
        try {
            const apiClient = await client;
            const response = await apiClient.getAllBookings();
            const bookings = response.data;

            // Filter for conflicting bookings
            const conflictingBookings = bookings.filter((booking) => {
                // Only check bookings for this vehicle
                if (booking.vehicle?.id !== vehicleId) return false;

                // Ignore cancelled bookings
                if (booking.booking_status === 'Cancelled') return false;

                const bookingStart = new Date(booking.start_date);
                const bookingEnd = new Date(booking.end_date);

                // Check for date overlap
                return (start <= bookingEnd && end >= bookingStart);
            });

            return conflictingBookings.length === 0;
        } catch (error) {
            console.error('Error checking availability:', error);
            return false;
        }
    };

    /**
     * Get all vehicles available for the given dates
     */
    const getAvailableVehicles = async (
        start: Date,
        end: Date
    ): Promise<Vehicle[]> => {
        try {
            const apiClient = await client;
            const response = await apiClient.getVehicles();
            const vehicles = response.data;

            // Check availability for each vehicle
            const availableVehicles: Vehicle[] = [];

            for (const vehicle of vehicles) {
                const isAvailable = await checkAvailability(vehicle.id!, start, end);
                if (isAvailable) {
                    availableVehicles.push(vehicle);
                }
            }

            return availableVehicles;
        } catch (error) {
            console.error('Error getting available vehicles:', error);
            return [];
        }
    };

    /**
     * Create a new booking
     * Requires user to be authenticated
     */
    const createBooking = async (): Promise<Booking> => {
        if (!isValidBooking()) {
            throw new Error('Invalid booking: missing required input');
        }

        if (!auth.user) {
            throw new Error('User must be authenticated to create a booking');
        }

        try {
            const apiClient = await client;

            const bookingData: Booking = {
                purpose: purpose,
                booking_status: 'Booked',
                destination: destination,
                start_date: startDate!.toISOString().split('T')[0], // Date only
                end_date: endDate!.toISOString().split('T')[0],
                employee: {
                    id: auth.user.id,
                    username: auth.user.username,
                    password: auth.user.password,
                    email: auth.user.email,
                    department: auth.user.department,
                    personal_details: auth.user.personal_details,
                },
                vehicle: selectedVehicle!,
            };

            const response = await apiClient.createBooking(null, bookingData);

            return response.data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    };

    const contextValue: BookingContextType = {
        selectedVehicle,
        startDate,
        endDate,
        purpose,
        destination,
        setSelectedVehicle,
        setDateRange,
        setPurpose,
        setDestination,
        clearBooking,
        isValidBooking,
        getBookingDuration,
        checkAvailability,
        getAvailableVehicles,
        createBooking,
    };

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
}