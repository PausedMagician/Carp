import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export interface Car {
    id: number;
    make: string,
    model: string;
    year: number;
    color: string;
    pricePerDay: number;
    isAvailable: boolean;
}

export async function getAll(): Promise<Car[]> {
    let cars: Car[] = [];
    let storage = await AsyncStorage.getItem("cars/getAll");
    if (storage != null) {
        console.log("Persistance hit!!!");
        return JSON.parse(storage);
    }

    let response = await axios.get("https://raw.githubusercontent.com/OthelloEngineer/mobile-software-development-exercises/refs/heads/main/cars.json");
    
    cars = response.data;

    AsyncStorage.setItem("cars/getAll", JSON.stringify(cars));

    return cars;
}