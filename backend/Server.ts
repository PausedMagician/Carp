enum VehicleTypes {
    Car,
    Van
}
enum FuelTypes {
    Petrol,
    Diesel,
    Electric,
    Hybrid
}
enum TyreTypes {
    Summer,
    Winter,
    AllSeason
}

export interface Vehicle {
    id: number
    make: string
    model: string
    variant: string
    year: string
    color: string
    type: VehicleTypes
    registration: {
        license: string
        serial: string
    }
    specs: {
        horsepower: number
        top_speed: number
        mileage: number
        fuel_type: FuelTypes
        tyres: TyreTypes
        trailer_hitch: boolean
        transmission: {
            type: string;
            drive: string;
        }
    }
}

export interface User {
    id: number
    username: string
    password: string
    email: string
    personal_details: {
        first_name: string
        last_name: string
        birthdate: Date
    }
    created_at: Date
    updated_at: Date
}

export interface Booking {
    id: number
    user_id: number
    car_id: number
    purpose: string
    start_date: Date
    end_date: Date
    status: string
    destination: string | null
    created_at: Date
    updated_at: Date
}

export interface Log {
    id: number
    user_id: number
    booking_id: number
    start_date: Date
    end_date: Date | null
    start_odometer: number
    end_odometer: number | null
    from_location: string
    to_location: string | null
}

export interface Maintenance {
    id: number
    car_id: number
    user_id: number
    reason: string
    status: string
    log: string
    schedule: {
        maintenance_planned_at: Date
        maintenance_planned_for: Date
        maintenance_done_at: Date
    }
}

var cars: Vehicle[];
var users: User[];
var bookings: Booking[];
var maintenances: Maintenance[];
var isLoaded = false;

export function loadFiles() {
    if (isLoaded) return;
    // Load json into cars
    cars = require('./Data/Vehicles.json');
    users = require('./Data/Users.json');
    bookings = require('./Data/Bookings.json');
    maintenances = require('./Data/Maintenances.json');
    isLoaded = true;
}

export function getVehicles(): Vehicle[] {
    loadFiles();
    return cars;
}

export function getVehicle(id: number): Vehicle | undefined {
    loadFiles();
    return cars.find(vehicle => vehicle.id === id);
}

export function getUsers(): User[] {
    loadFiles();
    return users;
}

export function getUser(id: number): User | undefined {
    loadFiles();
    return users.find(user => user.id === id);
}

export function getBookings(): Booking[] {
    loadFiles();
    return bookings;
}

export function getBooking(id: number): Booking | undefined {
    loadFiles();
    return bookings.find(booking => booking.id === id);
}

export function getMaintenances(): Maintenance[] {
    loadFiles();
    return maintenances;
}

export function getMaintenance(id: number): Maintenance | undefined {
    loadFiles();
    return maintenances.find(maintenance => maintenance.id === id);
}

export function getBookingsForCar(carId: number): Booking[] {
    loadFiles();
    return bookings.filter(booking => booking.car_id === carId);
}