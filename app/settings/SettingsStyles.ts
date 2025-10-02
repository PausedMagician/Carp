import { StyleSheet } from "react-native";

export const settingsStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  darkModeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  rowText: {
    fontSize: 16,
  },
  rowLink: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  rowLinkText: {
    fontSize: 16,
  },
  rowLinkDangerText: {
    fontSize: 16,
    color: "red",
  },
  // Account card styles
  accountCard: {
    width: "100%",
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  accountAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
    marginRight: 15,
  },
  accountName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accountEmail: {
    fontSize: 14,
    color: "gray",
  },
  accountRole: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
  editButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#007AFF",
    borderRadius: 6,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  sectionCard: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
});
