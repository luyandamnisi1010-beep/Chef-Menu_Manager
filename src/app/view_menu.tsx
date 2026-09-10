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
  const params = useLocalSearchParams<{
    name?: string;
    description?: string;
    price?: string;
    image?: string;
  }>();

  return (
    <View style={styles.container}>
      {/* */}
      <Stack.Screen options={{ headerShown: false }} />

      {/*  */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>View Menu Item</Text>
      </View>

      {/*  */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* */}
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

        {/*  */}
        <View style={styles.infoCard}>
          {/* */}
          <Text style={styles.dishName}>
            {params.name || "Dish Name"}
          </Text>

          {/*  */}
          <Text style={styles.price}>
            R{params.price || "0.00"}
          </Text>

          {/*  */}
          <Text style={styles.description}>
            {params.description || "No description added."}
          </Text>
        </View>

        {/* */}
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
 
  container: {
    flex: 1,
    backgroundColor: "#EFE7D2",
    paddingHorizontal: 12,
    paddingTop: 45,
    paddingBottom: 25,
  },

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

  backButton: {
    position: "absolute",
    left: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backArrow: {
    fontSize: 34,
    color: "#000000",
    lineHeight: 36,
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },

  scrollView: {
    flex: 1,
    width: "100%",
  },

content: {
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: 20,
  marginBottom: 60,
},

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

  dishImage: {
    width: "100%",
    height: "100%",
  },

  noImageText: {
    fontSize: 16,
    color: "#777777",
  },

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

  dishName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    paddingRight: 75,
  },

  price: {
    position: "absolute",
    right: 10,
    top: 47,
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
  },

  description: {
    fontSize: 15,
    lineHeight: 19,
    color: "#000000",
    textAlign: "center",
    marginTop: 48,
    paddingHorizontal: 3,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
    gap: 18,
  },

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

  editText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },
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
  deleteText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },
});