import { styles } from "@/App";
import { Booking, Vehicle, getBookingsForCar, getVehicles } from "@/backend/Server";
import CarListItem from "@/components/CarListItem";
// import { Car, getAll } from "@/types/Car";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";


export default function VehiclesScreen() {
  const [cars, setCars] = useState<{car: Vehicle, bookings: Booking[], isAvailable: boolean}[]>();

  // const loadCars = useCallback(async () => {
  //   try {
      
  //   }  
  // });


  useEffect(() => {
    const map: {car: Vehicle, bookings: Booking[], isAvailable: boolean}[] = [];
    const cars = getVehicles();
    cars.forEach(car => {
      const bookings = getBookingsForCar(car.id);
      const now = new Date();
      const isAvailable = bookings.every(booking => {
          const start = new Date(booking.start_date);
          const end = new Date(booking.end_date);
          return now < start || now > end;
      });
      map.push({car, bookings, isAvailable});
    });
    setCars(map);
  }, [])

  return (
    <View style={styles.container}>
      <Text>Meow</Text>
      {/* <Text>Cars: {cars.toString()}</Text> */}
      <FlatList
        data={cars}
        renderItem={CarListItem}
      />
      <StatusBar style="auto" />
      {/* <Navigator /> */}
    </View>
  );
}