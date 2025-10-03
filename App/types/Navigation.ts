import type { Vehicle, Booking } from './openapi';

export type HomeStackParamList = {
    Dashboard: undefined;
    BookingDate: { vehicle: Vehicle };
    BookingConfirmation: {
        vehicle: Vehicle;
        startDate: string;
        endDate: string;
    };
    BookingSuccess: { booking: Booking };
};

export type QuickBookStackParamList = {
    DateSelection: undefined;
    AvailableVehicles: {
        startDate: string;
        endDate: string;
    };
    BookingConfirmation: {
        vehicle: Vehicle;
        startDate: string;
        endDate: string;
    };
    BookingSuccess: { booking: Booking };
};

export type SearchStackParamList = {
    SearchList: undefined;
    BookingDate: { vehicle: Vehicle };
};

export type SettingsStackParamList = {
    SettingsMain: undefined;
    Profile: undefined;
    RentingHistory: undefined;
    FAQ: undefined;
};

export type RootTabParamList = {
    Home: undefined;
    Search: undefined;
    QuickBook: undefined;
    Settings: undefined;
    Admin: undefined;
};