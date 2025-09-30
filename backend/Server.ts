enum CarTypes {
    Car,
    Van
}

interface Car {
    id: number
    make: string
    model: string
    variant: string
    year: string
    color: string
    type: CarTypes
    registration: {
        license: string
        serial: string
    }
    specs: {
        horsepower: number
        top_speed: number
        mileage: number
        trailer_hitch: string
        transmission: {
            type: string;
            drive: string;
        }
    }
}

interface User {
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

interface Booking {
    id: number
    user_id: number
    car_id: number
    purpose: string
    start_date: Date
    end_date: Date
    start_odometer: number
    end_odometer: number
    created_at: Date
    updated_at: Date
}

interface Maintenance {
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

var cars: Car[];
var users: User[];
var bookings: Booking[];
var maintenances: Maintenance[];
var isLoaded = false;

export function loadFiles() {
    if (isLoaded) return;
    // Load json into cars
    cars = require('./Data/Cars.json');
    users = require('./Data/Users.json');
    bookings = require('./Data/Bookings.json');
    maintenances = require('./Data/Maintenances.json');
    isLoaded = true;
}

export function getCars(): Car[] {
    loadFiles();
    return cars;
}

export function getCar(id: number): Car | undefined {
    loadFiles();
    return cars.find(car => car.id === id);
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