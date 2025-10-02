// The type definitions should probably be moved into their own .ts file
// This is following the ER-diagram

export interface Vehicle {
    id: number;
    make: string;
    model: string;
    variant: string;
    year: string;
    color: string;
    type: string;
    registration: {
        license: string;
        serial: string;
    };
    specs: {
        horsepower: number;
        top_speed: number;
        mileage: number;
        fuel_type: string;
        tyres: string;
        trailer_hitch: boolean;
        transmission: {
            type: string;
            drive: string;
        };
    };
}

export interface Booking {
    id: number;
    user_id: number;
    car_id: number;
    purpose: string;
    start_date: string;
    end_date: string;
    status: 'Booked' | 'Completed' | 'Cancelled';
    destination: string | null;
    created_at: string;
    updated_at: string | null;
}

export type HomeStackParamList = {
    Dashboard: undefined;
    BookingDate: { vehicle: Vehicle };
    BookingConfirmation: { vehicle: Vehicle; startDate: Date; endDate: Date };
    BookingSuccess: { booking: Booking };
};