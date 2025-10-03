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

export interface Log {
    id: number;
    user_id: number;
    booking_id: number;
    start_date: string;
    end_date: string;
    start_odometer: number;
    end_odometer: number;
    from_location: string;
    to_location: string;
}

export interface Maintenance {
    id: number;
    car_id: number;
    user_id: number | null;
    reason: string;
    status: string;
    log: string;
    schedule: {
        maintenance_planned_at: string;
        maintenance_planned_for: string;
        maintenance_done_at: string;
    };
}

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    personal_details: {
        first_name: string;
        last_name: string;
        birthdate: string;
    };
    created_at: string;
    updated_at: string | null;
}

export type HomeStackParamList = {
    Dashboard: undefined;
    BookingDate: { vehicle: Vehicle };
    BookingConfirmation: { vehicle: Vehicle; startDate: Date; endDate: Date };
    BookingSuccess: { booking: Booking };
};