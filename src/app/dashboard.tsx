// ============================================================
// MENUNEST - DASHBOARD SCREEN
// File: src/app/dashboard.tsx
//
// Everything for the Dashboard is in this ONE file.
//
// This screen contains:
// - Dashboard title
// - Dashboard image
// - Welcome message
// - Description
// - Callout text
// - View Menu button
// - Statistics button
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
// DASHBOARD SCREEN
// ============================================================

export default function Dashboard() {

  return (
    <>
      {/* ======================================================
          REMOVE THE WHITE EXPO ROUTER HEADER
      ====================================================== */}

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />


      {/* ======================================================
          MAIN DASHBOARD CONTAINER

          justifyContent: "center"
          = centers everything vertically

          alignItems: "center"
          = centers everything horizontally
      ====================================================== */}

      <View style={styles.container}>


        {/* ====================================================
            DASHBOARD TITLE
        ==================================================== */}

        <Text style={styles.title}>
          Dashboard
        </Text>


        {/* ====================================================
            ⭐ YOUR DASHBOARD IMAGE ⭐

            Your image should be located at:

            assets/images/Dashboard.png

            Because this file is inside:

            src/app/dashboard.tsx

            we use ../../ to reach the project folder.
        ==================================================== */}

        <Image
          source={require("../../assets/images/Dashboard.png")}
          style={styles.dashboardImage}
          resizeMode="contain"
        />


        {/* ====================================================
            WELCOME TEXT
        ==================================================== */}

        <Text style={styles.welcome}>
          Welcome to MenuNest,
        </Text>


        {/* ====================================================
            DESCRIPTION
        ==================================================== */}

        <Text style={styles.description}>
          Keep your menu fresh, organised, and ready to serve.
          Add new dishes, update details and manage your menu
          with ease.
        </Text>


        {/* ====================================================
            CALLOUT
        ==================================================== */}

        <Text style={styles.callout}>
          All in one place. Let's get organised!
        </Text>


        {/* ====================================================
            VIEW MENU BUTTON

            This button will take us to the Menu screen.
        ==================================================== */}

        <TouchableOpacity
          style={styles.viewMenuButton}
          onPress={() => router.push("/menu")}
          activeOpacity={0.8}
        >

          <Text style={styles.viewMenuText}>
            View Menu
          </Text>

        </TouchableOpacity>


        {/* ====================================================
            STATISTICS BUTTON

            This is currently inactive.

            We are only making it look like the design.
        ==================================================== */}

        <TouchableOpacity
          style={styles.statisticsButton}
          activeOpacity={0.8}
        >

          <Text style={styles.statisticsText}>
            Statistics
          </Text>

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

    // Cream background
    backgroundColor: "#EFE7D2",

    // ⭐ CENTER EVERYTHING VERTICALLY ⭐
    justifyContent: "center",

    // ⭐ CENTER EVERYTHING HORIZONTALLY ⭐
    alignItems: "center",

    // Prevent content from touching the phone edges
    paddingHorizontal: 25,
  },


  // ==========================================================
  // DASHBOARD TITLE
  // ==========================================================

  title: {
    fontSize: 38,

    // Serif font
    fontFamily: "Georgia",

    fontWeight: "bold",

    // Red/pink colour
    color: "#D92D61",

    textAlign: "center",

    marginBottom: 15,
  },


  // ==========================================================
  // DASHBOARD IMAGE
  // ==========================================================

  dashboardImage: {
    width: 150,
    height: 150,

    // Space below image
    marginBottom: 12,
  },


  // ==========================================================
  // WELCOME TEXT
  // ==========================================================

  welcome: {
    fontSize: 24,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#171717",

    textAlign: "center",

    marginBottom: 12,
  },


  // ==========================================================
  // DESCRIPTION
  // ==========================================================

  description: {
    fontSize: 15,

    lineHeight: 22,

    color: "#171717",

    textAlign: "center",

    maxWidth: 330,

    marginBottom: 12,
  },


  // ==========================================================
  // CALLOUT
  // ==========================================================

  callout: {
    fontSize: 15,

    fontStyle: "italic",

    color: "#171717",

    textAlign: "center",

    marginBottom: 25,
  },


  // ==========================================================
  // VIEW MENU BUTTON
  // ==========================================================

  viewMenuButton: {
    width: 210,
    height: 50,

    // Pink button
    backgroundColor: "#F76C82",

    // Black border
    borderWidth: 1.5,
    borderColor: "#111111",

    borderRadius: 14,

    // Center text
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },


  // ==========================================================
  // VIEW MENU TEXT
  // ==========================================================

  viewMenuText: {
    fontSize: 19,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#111111",
  },


  // ==========================================================
  // STATISTICS BUTTON
  // ==========================================================

  statisticsButton: {
    width: 210,
    height: 50,

    // Light mint green
    backgroundColor: "#CBEED6",

    // Black border
    borderWidth: 1.5,
    borderColor: "#111111",

    borderRadius: 14,

    // Center text
    alignItems: "center",
    justifyContent: "center",
  },


  // ==========================================================
  // STATISTICS TEXT
  // ==========================================================

  statisticsText: {
    fontSize: 19,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#111111",
  },

});