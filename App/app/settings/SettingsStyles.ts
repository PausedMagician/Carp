import { StyleSheet } from "react-native";

export const settingsStyles = (darkMode: boolean) =>
  StyleSheet.create({
    // Main container: Set background for the whole screen
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: darkMode ? "#121212" : "#fff", // Dark mode background
    },
    sectionTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginVertical: 12,
      color: darkMode ? "#fff" : "#000", // Text color for titles
    },
    // Account Card Styling
    accountCard: {
      flexDirection: "row",
      padding: 16,
      borderRadius: 12,
      backgroundColor: darkMode ? "#1E1E1E" : "#f2f2f2",
      marginBottom: 16,
      elevation: 4, // Adds shadow for a card effect
    },
    accountAvatar: { marginRight: 16, justifyContent: "center", alignItems: "center" },
    accountName: { fontSize: 20, fontWeight: "bold", color: darkMode ? "#fff" : "#000" },
    accountEmail: { fontSize: 14, color: darkMode ? "#bbb" : "#555" },
    accountRole: { fontSize: 14, fontStyle: "italic", color: darkMode ? "#aaa" : "#333" },
    editButton: { backgroundColor: "#007AFF", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, alignSelf: "center" },
    editButtonText: { color: "#fff", fontWeight: "600" },

    // Dark Mode Toggle Row
    darkModeRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: darkMode ? "#333" : "#ddd",
    },
    rowText: { fontSize: 16, color: darkMode ? "#fff" : "#000" },

    // Links and Other Sections
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginBottom: 20,
    },
    rowLink: {
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderColor: darkMode ? "#333" : "#ddd",
    },
    rowLinkText: { fontSize: 16, color: "#007AFF" },
    rowLinkDangerText: { fontSize: 16, color: "red" },

    // Section Cards Styling
    sectionCard: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: darkMode ? "#1E1E1E" : "#f9f9f9", // Card background color
      marginBottom: 8,
      marginTop: 24,
    },
    sectionCardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, color: darkMode ? "#fff" : "#000" },

    // History Section Styling
    historyRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
    historyImageWrapper: { width: 60, height: 60, borderRadius: 8, overflow: "hidden", marginRight: 16 },
    historyImage: { width: "100%", height: "100%", resizeMode: "cover" },
    historyDetails: { flex: 1 },
    historyCarName: { fontSize: 16, fontWeight: "bold", color: darkMode ? "#fff" : "#000" },
    historyBookedAt: { fontSize: 14, color: darkMode ? "#bbb" : "#666" },
  });
