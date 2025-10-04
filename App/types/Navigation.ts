import type { Vehicle, Booking } from './openapi';

/**
 * Home - Vehicle Dashboard
 * Entry: Vehicle Dashboard -> Click car from the lovely carousel
 * Flow: Dashboard -> BookingDate -> BookingConfirmation -> BookingSuccess
 */
export type HomeStackParamList = {
    /** Vehicle Dashboard - the carousel with available vehicles */
    Dashboard: undefined;

    /** Date selection for pre-selected vehicle */
    BookingDate: { vehicle: Vehicle };

    /** Confirm booking details before booking */
    BookingConfirmation: {
        vehicle: Vehicle;
        startDate: string;
        endDate: string;
    };

    /** Success confirmation after booking created */
    BookingSuccess: { booking: Booking };
};

/**
 * Quick Book
 * Entry: Quick Book button in bottom nav
 * Flow: DateSelection -> AvailableVehicles -> BookingConfirmation -> BookingSuccess
 */
export type QuickBookStackParamList = {
    /** Select dates before choosing vehicle */
    DateSelection: undefined;

    /** Shows only vehicles available for selected dates */
    AvailableVehicles: {
        startDate: string;
        endDate: string;
    };

    /** Confirm booking details before booking */
    BookingConfirmation: {
        vehicle: Vehicle;
        startDate: string;
        endDate: string;
    };

    /** Success confirmation after booking created */
    BookingSuccess: { booking: Booking };
};

/**
 * Search
 * Entry: Search from bottom nav
 * Flow 1: SearchList -> VehicleDetails -> BookingDate -> BookingConfirmation -> BookingSuccess
 * Flow 2: SearchList -> BookingDate -> BookingConfirmation -> BookingSuccess
 */
export type SearchStackParamList = {
    /** List/search vehicles (with filters?) */
    SearchList: undefined;

    /**
     * Vehicle details is two different pages:
     * - Specification
     * - Service Information
     */
    VehicleDetails: { vehicle: Vehicle };

    /** Date selection for chosen vehicle */
    BookingDate: { vehicle: Vehicle };

    /** Confirm booking details before booking */
    BookingConfirmation: {
        vehicle: Vehicle;
        startDate: string;
        endDate: string;
    };

    /** Success confirmation after booking created */
    BookingSuccess: { booking: Booking };
};

/**
 * Settings Stack - User Settings and Profile
 * Entry: Settings from bottom nav
 * Flow 1: SettingsMain → Profile → RentingHistory
 * Flow 2: SettingsMain → FAQ
 */
export type SettingsStackParamList = {
    SettingsMain: undefined;

    /** User profile details */
    Profile: undefined;

    /** History of past bookings */
    RentingHistory: undefined;

    /** Pretty self-explanatory, bozo */
    FAQ: undefined;
};

/**
 * Root Tab Navigator (better name than the generic "Navigator" I suppose)
 *
 * Tabs (in order):
 * 1. Home - Vehicle Dashboard
 * 2. Search - Browse and search vehicles
 * 3. QuickBook - Date-first booking
 * 4. Settings
 * 5. Admin - Admin Dashboard (only visible to admins)
 */
export type RootTabParamList = {
    Home: undefined;
    Search: undefined;
    QuickBook: undefined;
    Settings: undefined;
    Admin: undefined;
};