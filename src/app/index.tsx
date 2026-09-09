// ============================================================
// MENUNEST - FIRST SCREEN
// File: src/app/index.tsx
//
// Everything is kept in ONE file.
//
// This screen contains:
// - Your logo/chef image
// - MenuNest title
// - Subtitle
// - Enter button
// - Your own arrow image
// - No Expo Router "index" header
// ============================================================

import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { Stack, router } from "expo-router";


// ============================================================
// FIRST SCREEN
// ============================================================

export default function Index() {

  return (
    <>
      {/* ======================================================
          REMOVE THE WHITE "INDEX" HEADER
      ====================================================== */}

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />


      {/* ======================================================
          MAIN CONTAINER
          
          justifyContent: "center" puts EVERYTHING in the
          middle of the screen vertically.

          alignItems: "center" puts EVERYTHING in the
          middle horizontally.
      ====================================================== */}

      <View style={styles.container}>


        {/* ====================================================
            ⭐ YOUR IMAGE ⭐

            Put your image here:

            assets/images/Final-logo.png
        ==================================================== */}

        <Image
          source={require("../../assets/images/Final-logo.png")}
          style={styles.chefImage}
          resizeMode="contain"
        />


        {/* ====================================================
            MENUNEST TITLE
        ==================================================== */}

        <Text style={styles.logo}>
          MenuNest
        </Text>


        {/* ====================================================
            SUBTITLE
        ==================================================== */}

        <Text style={styles.subtitle}>
          Manage. Organise. Serve
        </Text>


        {/* ====================================================
            ENTER BUTTON
        ==================================================== */}

        <TouchableOpacity
          style={styles.enterButton}
          onPress={() => router.push("/dashboard")}
          activeOpacity={0.8}
        >

          {/* Enter text */}

          <Text style={styles.enterText}>
            Enter
          </Text>


          {/* ==================================================
              ⭐ YOUR BUTTON IMAGE ⭐

              Put your arrow image here:

              assets/images/arrow.png
          ================================================== */}

          <Image
            source={require("../../assets/images/arrow.png")}
            style={styles.arrowImage}
            resizeMode="contain"
          />

        </TouchableOpacity>

      </View>
    </>
  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // MAIN SCREEN
  // ==========================================================

  container: {
    flex: 1,

    // Lime green background
    backgroundColor: "#C5E887",

    // ⭐ CENTER EVERYTHING VERTICALLY ⭐
    justifyContent: "center",

    // ⭐ CENTER EVERYTHING HORIZONTALLY ⭐
    alignItems: "center",

    // Prevents things from touching the sides
    paddingHorizontal: 20,
  },


  // ==========================================================
  // YOUR CHEF / LOGO IMAGE
  // ==========================================================

  chefImage: {
    width: 210,
    height: 210,

    // Space between image and MenuNest
    marginBottom: 15,
  },


  // ==========================================================
  // MENUNEST TITLE
  // ==========================================================

  logo: {
    fontSize: 42,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#D92D61",

    // Space between MenuNest and subtitle
    marginBottom: 12,
  },


  // ==========================================================
  // SUBTITLE
  // ==========================================================

  subtitle: {
    fontSize: 17,

    color: "#171717",

    // Space between subtitle and Enter button
    marginBottom: 40,
  },


  // ==========================================================
  // ENTER BUTTON
  // ==========================================================

  enterButton: {
    width: 180,
    height: 52,

    // Yellow/orange button
    backgroundColor: "#FFC83B",

    // Black border
    borderWidth: 1.5,
    borderColor: "#111111",

    // Rounded corners
    borderRadius: 14,

    // Put text and image beside each other
    flexDirection: "row",

    // Center vertically
    alignItems: "center",

    // Space text and arrow apart
    justifyContent: "space-between",

    // Inside spacing
    paddingLeft: 35,
    paddingRight: 15,
  },


  // ==========================================================
  // ENTER TEXT
  // ==========================================================

  enterText: {
    fontSize: 22,

    fontFamily: "Irish Grover",

    fontWeight: "bold",

    color: "#111111",
  },


  // ==========================================================
  // BUTTON ARROW IMAGE
  // ==========================================================

  arrowImage: {
    width: 22,
    height: 22,
  },

});