import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";

import { styles } from "@/constants/Stylings";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import CarListItem from "@/components/CarListItem";
import { ThemeContext } from "@/contexts/ThemeContext";
import { client } from "@/backend/Server";
import { Vehicle } from "@/types/openapi";

export default function VehiclesScreen() {
  
  const { darkMode } = useContext(ThemeContext);
  const s = useThemedStyles(styles);
  const [cars, setCars] = useState<{car: Vehicle; isAvailable: boolean}[]>();

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
    <View style={s.container}>
      <Text>Meow</Text>
      {/* <Text>Cars: {cars.toString()}</Text> */}
      <FlatList
        data={cars}
        renderItem={(props) => <CarListItem {...props} />}
        style={{
          width: "100%",
          backgroundColor: darkMode ? "#1E1E1E" : "#ffffffff",
          padding: 8,
          borderRadius: 12,
        }}
      />
      <StatusBar style="auto" />
      {/* <Navigator /> */}
    </View>
  );
}