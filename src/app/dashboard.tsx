import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { Stack, router } from "expo-router";



export default function Dashboard() {

  return (
    <>
      {/*  */}

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />


      {/*  */}

      <View style={styles.container}>


        {/*  */}

        <Text style={styles.title}>
          Dashboard
        </Text>


        {/* */}

        <Image
          source={require("../../assets/images/Dashboard.png")}
          style={styles.dashboardImage}
          resizeMode="contain"
        />


        {/*  */}

        <Text style={styles.welcome}>
          Welcome to MenuNest,
        </Text>


        {/*  */}

        <Text style={styles.description}>
          Keep your menu fresh, organised, and ready to serve.
          Add new dishes, update details and manage your menu
          with ease.
        </Text>


        {/*  */}

        <Text style={styles.callout}>
          All in one place. Let's get organised!
        </Text>


        {/*  */}

        <TouchableOpacity
          style={styles.viewMenuButton}
          onPress={() => router.push("/menu")}
          activeOpacity={0.8}
        >

          <Text style={styles.viewMenuText}>
            View Menu
          </Text>

        </TouchableOpacity>


        {/*  */}

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


const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#EFE7D2",

   
    justifyContent: "center",

  
    alignItems: "center",

    paddingHorizontal: 25,
  },


  title: {
    fontSize: 38,
    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#D92D61",

    textAlign: "center",

    marginBottom: 15,
  },


  dashboardImage: {
    width: 150,
    height: 150,

    marginBottom: 12,
  },


  welcome: {
    fontSize: 24,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#171717",

    textAlign: "center",

    marginBottom: 12,
  },


  description: {
    fontSize: 15,

    lineHeight: 22,

    color: "#171717",

    textAlign: "center",

    maxWidth: 330,

    marginBottom: 12,
  },


  callout: {
    fontSize: 15,

    fontStyle: "italic",

    color: "#171717",

    textAlign: "center",

    marginBottom: 25,
  },

  viewMenuButton: {
    width: 210,
    height: 50,

    backgroundColor: "#F76C82",

    borderWidth: 1.5,
    borderColor: "#111111",

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 12,
  },


  viewMenuText: {
    fontSize: 19,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#111111",
  },



  statisticsButton: {
    width: 210,
    height: 50,

    backgroundColor: "#CBEED6",

    borderWidth: 1.5,
    borderColor: "#111111",

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",
  },

  statisticsText: {
    fontSize: 19,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#111111",
  },

});