// constants/Stylings.ts
import { StyleSheet } from "react-native";

export const styles = (darkMode: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? "#121212" : "#fff", // matches settings
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    },
    text: {
      color: darkMode ? "#fff" : "#000",
      fontSize: 16,
    },

    card: {
      backgroundColor: darkMode ? "#1E1E1E" : "#f9f9f9",
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      shadowColor: darkMode ? "#a5a5a5ff" : "#131313ff",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },

    button: {
      backgroundColor: "#007AFF",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },

    // 👇 NEW: CarListItem styles
    carItemUnavailable: {
      opacity: 0.7,
      backgroundColor: darkMode ? "#333" : '#f8f8f8',
    },
    carItemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    carItemName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? "#fff" : '#999999',
      flex: 1,
    },
    carItemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: darkMode ? "#ccc" : '#999999',
    },
    carItemUnavailableText: {
      color: darkMode ? "#aaa" : '#999999',
    },
    carItemModel: {
      fontSize: 14,
      color: darkMode ? "#aaa" : '#999999',
      marginBottom: 4,
    },
    carItemYear: {
      fontSize: 14,
      color: darkMode ? "#aaa" : '#999999',
      marginBottom: 8,
    },
    carItemAvailabilityContainer: {
      alignItems: 'flex-start',
    },
    carItemAvailability: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    carItemAvailable: {
      color: '#4caf50',
    },
    carItemUnavailableStatus: {
      color: '#f44336',
    },
  });
