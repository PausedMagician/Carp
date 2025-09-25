import { styles } from "@/App";
import CarListItem from "@/components/CarListItem";
import { Car, getAll } from "@/types/Car";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";


export default function VehiclesScreen() {
  const [cars, setCars] = useState<Car[]>();

  // const loadCars = useCallback(async () => {
  //   try {
      
  //   }  
  // });


  useEffect(() => {
    getAll().then(value => setCars(value));
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