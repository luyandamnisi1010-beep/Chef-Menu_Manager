import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";

export default function ViewMenuScreen() {
  // Get the dish information sent from the Menu screen
  const params = useLocalSearchParams<{
    name?: string;
    description?: string;
    price?: string;
    image?: string;
  }>();

  return (
    <View style={styles.container}>
      {/* Hide the normal Expo header */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Back button and title */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>View Menu Item</Text>
      </View>

      {/* Everything below can scroll if needed */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Dish image */}
        <View style={styles.imageBox}>
          {params.image ? (
            <Image
              source={{ uri: params.image }}
              style={styles.dishImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImageText}>No Image</Text>
          )}
        </View>

        {/* Dish information */}
        <View style={styles.infoCard}>
          {/* Dish name */}
          <Text style={styles.dishName}>
            {params.name || "Dish Name"}
          </Text>

          {/* Price */}
          <Text style={styles.price}>
            R{params.price || "0.00"}
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            {params.description || "No description added."}
          </Text>
        </View>

        {/* Edit and Delete buttons */}
        <View style={styles.buttonRow}>
          {/* These buttons intentionally do NOTHING for now */}
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main cream background
  container: {
    flex: 1,
    backgroundColor: "#EFE7D2",
    paddingHorizontal: 12,
    paddingTop: 45,
    paddingBottom: 25,
  },

  // Header
  header: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 4,
    marginTop: 40,
  },

  // Back button
  backButton: {
    position: "absolute",
    left: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  // Back arrow
  backArrow: {
    fontSize: 34,
    color: "#000000",
    lineHeight: 36,
  },

  // Page title
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },

  // Scroll area
  scrollView: {
    flex: 1,
    width: "100%",
  },

  // Keeps everything centered
  // Keeps the image, card and buttons centered vertically
content: {
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 20,
  marginBottom: 60,
},

  // Large image area
 imageBox: {
  width: "92%",
  height: 220,
  backgroundColor: "#FFFFFF",
  borderRadius: 7,
  overflow: "hidden",
  justifyContent: "center",
  alignItems: "center",
  marginTop: -15,
  marginBottom: 16,
borderColor: "#070000",
borderWidth: 1,
},

  // Dish image
  dishImage: {
    width: "100%",
    height: "100%",
  },

  // If there is no image
  noImageText: {
    fontSize: 16,
    color: "#777777",
  },

  // Pink information card
  infoCard: {
    width: "92%",
    minHeight: 200,
    backgroundColor: "#FFC7C7",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
    position: "relative",
    marginTop: 10,
  },

  // Dish name
  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    paddingRight: 75,
  },

  // Price in the top-right
  price: {
    position: "absolute",
    right: 10,
    top: 47,
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
  },

  // Description
  description: {
    fontSize: 15,
    lineHeight: 19,
    color: "#000000",
    textAlign: "center",
    marginTop: 48,
    paddingHorizontal: 3,
  },

  // Buttons stay close together
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
    gap: 18,
  },

  // Edit button
  editButton: {
    width: 101,
    height: 40,
    backgroundColor: "#CFE1F2",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  // Edit text
  editText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },

  // Delete button
  deleteButton: {
    width: 101,
    height: 40,
    backgroundColor: "#FFC83B",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  // Delete text
  deleteText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },
});