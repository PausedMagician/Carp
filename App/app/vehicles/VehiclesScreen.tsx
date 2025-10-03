import { styles } from "@/constants/Stylings";
import { client } from "@/backend/Server";
import CarListItem from "@/components/CarListItem";
import { Vehicle } from "@/types/openapi";
// import { Car, getAll } from "@/types/Car";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";


export default function VehiclesScreen() {
  const [cars, setCars] = useState<{car: Vehicle, isAvailable: boolean}[]>();

  // const loadCars = useCallback(async () => {
  //   try {
      
  //   }  
  // });


  useEffect(() => {
    const map: {car: Vehicle, isAvailable: boolean}[] = [];
    client.then(c => c.getVehicles().then(vehicles => {
      vehicles.data.forEach(v => map.push({car: v, isAvailable: true})); // TODO: isAvailable
      setCars(map);
    })).catch(err => console.error(err));
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