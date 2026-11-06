import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { Stack, router } from "expo-router";




export default function Index() {

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


        {/* */}

        <Image
          source={require("../../assets/images/Final-logo.png")}
          style={styles.chefImage}
          resizeMode="contain"
        />


        {/* */}

        <Text style={styles.logo}>
          MenuNest
        </Text>


        {/*  */}

        <Text style={styles.subtitle}>
          Manage. Organise. Serve
        </Text>


        {/*  */}

        <TouchableOpacity
          style={styles.enterButton}
          onPress={() => router.push("/dashboard")}
          activeOpacity={0.8}
        >

          {/**/}

          <Text style={styles.enterText}>
            Enter
          </Text>


          {/*  */}

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




const styles = StyleSheet.create({



  container: {
    flex: 1,

   
    backgroundColor: "#C5E887",


    justifyContent: "center",

    alignItems: "center",
    paddingHorizontal: 20,
  },


  chefImage: {
    width: 210,
    height: 210,

    marginBottom: 15,
  },


 

  logo: {
    fontSize: 42,

    fontFamily: "Georgia",

    fontWeight: "bold",

    color: "#D92D61",

  
    marginBottom: 12,
  },


  subtitle: {
    fontSize: 17,

    color: "#171717",

    marginBottom: 40,
  },


 

  enterButton: {
    width: 180,
    height: 52,

    
    backgroundColor: "#FFC83B",

   
    borderWidth: 1.5,
    borderColor: "#111111",

  
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 35,
    paddingRight: 15,
  },

  enterText: {
    fontSize: 22,

    fontFamily: "Irish Grover",

    fontWeight: "bold",

    color: "#111111",
  },

  arrowImage: {
    width: 22,
    height: 22,
  },

});