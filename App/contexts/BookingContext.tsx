import React, { createContext, useState } from 'react';
import type { Vehicle, Booking } from '@/types/openapi';
import {useAuth} from "@/hooks/UseAuth";
import {client} from "@/backend/Server";

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

            const conflictingBookings = bookings.filter((booking) => {
                // We only check bookings for this vehicle
                if (booking.vehicle?.id !== vehicleId) return false;

                // We simply ignore cancelled bookings
                if (booking.booking_status === 'Cancelled') return false;

                const bookingStart = new Date(booking.start_date);
                const bookingEnd = new Date(booking.end_date);

                // Make sure we do not overlap the dates
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
     */
    const createBooking = async (): Promise<Booking> => {
        if (!isValidBooking()) {
            throw new Error('Invalid booking: missing required fields');
        }

        try {
            const apiClient = await client;

            const bookingData: Booking = {
                purpose: purpose,
                booking_status: 'Booked',
                destination: destination,
                start_date: startDate!.toISOString(), // ISO is correct here?
                end_date: endDate!.toISOString(), // ISO is correct here?
                employee: {
                    id: auth.user!.id,
                    username: auth.user!.username,
                    password: auth.user!.password,
                    email: auth.user!.email,
                    //department: '', // No department? :(
                    personal_details: auth.user!.personal_details,
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