import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

import {
  Stack,
  router,
  useLocalSearchParams,
} from "expo-router";


// ============================================================
// COURSE TYPE
// ============================================================

type Course = "Starter" | "Main" | "Dessert";


// ============================================================
// DISH TYPE
// ============================================================

type Dish = {
  id: string;
  name: string;
  course: Course;
  description: string;
  price: string;
  image: string;
};


// ============================================================
// SAVED DISHES
// ============================================================

// This keeps ALL dishes while the app is running.

let savedDishes: Dish[] = [];


// ============================================================
// MENU SCREEN
// ============================================================

export default function MenuScreen() {

  // Information coming from Add Dish

  const params = useLocalSearchParams<{
    added?: string;
    dishName?: string;
    course?: string;
    description?: string;
    price?: string;
    image?: string;
  }>();


  // All dishes

  const [dishes, setDishes] =
    useState<Dish[]>(savedDishes);


  // Selected course

  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);


  // Course dropdown

  const [showCourses, setShowCourses] =
    useState(false);


  // Search box

  const [searchText, setSearchText] =
    useState("");


  // ==========================================================
  // RECEIVE NEW DISH
  // ==========================================================

  useEffect(() => {

    if (
      params.added === "true" &&
      params.dishName &&
      params.course &&
      params.description &&
      params.price &&
      params.image
    ) {

      // Make sure the course is valid.

      if (
        params.course === "Starter" ||
        params.course === "Main" ||
        params.course === "Dessert"
      ) {

        const newDish: Dish = {

          id: Date.now().toString(),

          name: params.dishName,

          course: params.course,

          description: params.description,

          price: params.price,

          image: params.image,

        };


        // Check if this exact dish already exists.

        const alreadyExists =
          savedDishes.some(
            (dish) =>
              dish.name === newDish.name &&
              dish.course === newDish.course &&
              dish.price === newDish.price
          );


        // Add the dish WITHOUT removing old dishes.

        if (!alreadyExists) {

          savedDishes.push(newDish);

          setDishes([...savedDishes]);

        }


        // Automatically open the course
        // that the new dish belongs to.

        setSelectedCourse(params.course);
      }

    }

  }, [
    params.added,
    params.dishName,
    params.course,
    params.description,
    params.price,
    params.image,
  ]);


  // ==========================================================
  // FILTER DISHES
  // ==========================================================

  const filteredDishes =
    selectedCourse
      ? dishes.filter(
          (dish) =>
            dish.course === selectedCourse
        )
      : [];


  // ==========================================================
  // OPEN VIEW DISH
  // ==========================================================

  const openDish = (dish: Dish) => {

    router.push({

      pathname: "../view_menu",

      params: {

        name: dish.name,

        course: dish.course,

        description: dish.description,

        price: dish.price,

        image: dish.image,

      },

    });

  };


  // ==========================================================
  // SCREEN
  // ==========================================================

  return (

    <View style={styles.container}>

      {/* Hide default Expo header */}

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />


      {/* ======================================================
          HEADER
          ====================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >

          <Image
            source={require("../../assets/images/back.png")}
            style={styles.backImage}
          />

        </TouchableOpacity>


        <Text style={styles.menuTitle}>
          Menu
        </Text>

      </View>


      {/* ======================================================
          SEARCH
          ====================================================== */}

      <View style={styles.searchContainer}>

        <TextInput
          style={styles.searchInput}
          placeholder="Search dishes..."
          placeholderTextColor="#777777"
          value={searchText}
          onChangeText={setSearchText}
        />

      </View>


      {/* ======================================================
          COURSE DROPDOWN
          ====================================================== */}

      <View style={styles.courseContainer}>

        <TouchableOpacity
          style={styles.courseButton}
          onPress={() =>
            setShowCourses(!showCourses)
          }
        >

          <Text style={styles.courseButtonText}>
            {selectedCourse || "Courses"}
          </Text>


          <Text style={styles.downArrow}>
            ⌄
          </Text>

        </TouchableOpacity>


        {showCourses && (

          <View style={styles.dropdown}>

            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {

                setSelectedCourse("Starter");

                setShowCourses(false);

              }}
            >

              <Text style={styles.dropdownText}>
                Starter
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {

                setSelectedCourse("Main");

                setShowCourses(false);

              }}
            >

              <Text style={styles.dropdownText}>
                Main
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              style={styles.dropdownOption}
              onPress={() => {

                setSelectedCourse("Dessert");

                setShowCourses(false);

              }}
            >

              <Text style={styles.dropdownText}>
                Dessert
              </Text>

            </TouchableOpacity>

          </View>

        )}

      </View>


      {/* ======================================================
          DISH LIST
          ====================================================== */}

      <ScrollView
        style={styles.dishScroll}
        contentContainerStyle={styles.dishContent}
        showsVerticalScrollIndicator={false}
      >

        {filteredDishes.length === 0 ? (

          <Text style={styles.noDishText}>
            No dish added
          </Text>

        ) : (

          filteredDishes.map((dish) => (

            /*
             * THE ENTIRE CARD IS A BUTTON.
             *
             * Pressing the card opens View Dish.
             */

            <TouchableOpacity
              key={dish.id}
              style={[
                styles.dishCard,

                dish.course === "Main" &&
                  styles.mainCard,

                dish.course === "Starter" &&
                  styles.starterCard,

                dish.course === "Dessert" &&
                  styles.dessertCard,
              ]}
              onPress={() => openDish(dish)}
              activeOpacity={0.7}
            >

              {/* =================================================
                  IMAGE
                  ================================================= */}

              <View style={styles.imageBox}>

                <Image
                  source={{
                    uri: dish.image,
                  }}
                  style={styles.dishImage}
                />

              </View>


              {/* =================================================
                  DISH NAME
                  ================================================= */}

              <Text
                style={styles.dishName}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.70}
              >

                {dish.name}

              </Text>


              {/* =================================================
                  COURSE
                  ================================================= */}

              <Text
                style={styles.dishCourse}
                numberOfLines={1}
              >

                {dish.course} Course

              </Text>


              {/* =================================================
                  PRICE
                  ================================================= */}

              <Text
                style={styles.dishPrice}
                numberOfLines={1}
              >

                R{dish.price}.00

              </Text>

            </TouchableOpacity>

          ))

        )}

      </ScrollView>


      {/* ======================================================
          ADD DISH BUTTON
          ====================================================== */}

      <View style={styles.addButtonArea}>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            router.push("/add_dish")
          }
        >

          <Text style={styles.addButtonText}>
            + Add Dish
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );
}


// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({

  // ==========================================================
  // SCREEN
  // ==========================================================

  container: {
    flex: 1,

    backgroundColor: "#EFE7D2",

    alignItems: "center",
  },


  // ==========================================================
  // HEADER
  // ==========================================================

  header: {
    width: "100%",

    marginTop: 55,

    marginBottom: 20,

    position: "relative",

    alignItems: "center",

    justifyContent: "center",
  },


  backButton: {
    position: "absolute",

    left: 25,

    top: 2,

    width: 45,

    height: 45,

    justifyContent: "center",

    alignItems: "center",
  },


  backImage: {
    width: 32,

    height: 32,

    resizeMode: "contain",
  },


  menuTitle: {
    fontSize: 32,

    fontWeight: "bold",

    color: "#000000",

    fontFamily: "serif",
  },


  // ==========================================================
  // SEARCH
  // ==========================================================

  searchContainer: {
    width: "88%",

    marginBottom: 15,
  },


  searchInput: {
    width: "100%",

    height: 48,

    backgroundColor: "#FFFFFF",

    borderWidth: 2,

    borderColor: "#000000",

    borderRadius: 15,

    paddingHorizontal: 18,

    fontSize: 16,

    color: "#000000",
  },


  // ==========================================================
  // COURSE
  // ==========================================================

  courseContainer: {
    width: "88%",

    alignItems: "center",

    marginBottom: 10,

    zIndex: 10,
  },


  courseButton: {
    width: 180,

    height: 48,

    backgroundColor: "#DAF0C5",

    borderWidth: 2,

    borderColor: "#000000",

    borderRadius: 15,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",
  },


  courseButtonText: {
    fontSize: 17,

    fontWeight: "bold",

    color: "#000000",
  },


  downArrow: {
    fontSize: 24,

    color: "#000000",

    marginLeft: 12,

    marginTop: -5,
  },


  // ==========================================================
  // DROPDOWN
  // ==========================================================

  dropdown: {
    width: 180,

    backgroundColor: "#DAF0C5",

    borderWidth: 2,

    borderColor: "#000000",

    borderRadius: 15,

    marginTop: 5,

    overflow: "hidden",
  },


  dropdownOption: {
    height: 45,

    justifyContent: "center",

    alignItems: "center",

    borderBottomWidth: 1,

    borderBottomColor: "#000000",
  },


  dropdownText: {
    fontSize: 16,

    fontWeight: "bold",

    color: "#000000",
  },


  // ==========================================================
  // DISH SCROLL
  // ==========================================================

  dishScroll: {
    width: "88%",

    flex: 1,
  },


  dishContent: {
    alignItems: "center",

    paddingTop: 10,

    paddingBottom: 20,
  },


  noDishText: {
    fontSize: 20,

    fontWeight: "bold",

    color: "#000000",

    marginTop: 35,
  },


  // ==========================================================
  // DISH CARD
  // ==========================================================
  //
  // The card stays large.
  //
  // The CONTENT inside it is what has changed.
  //
  // ==========================================================

  dishCard: {
    width: "100%",

    height: 145,

    borderWidth: 2,

    borderColor: "#000000",

    borderRadius: 20,

    marginBottom: 15,

    position: "relative",

    overflow: "hidden",
  },


  // ==========================================================
  // CARD COLOURS
  // ==========================================================

  mainCard: {
    backgroundColor: "#F19C99",
  },


  starterCard: {
    backgroundColor: "#E1D5E7",
  },


  dessertCard: {
    backgroundColor: "#CCE5FF",
  },


  // ==========================================================
  // IMAGE
  // ==========================================================
  //
  // THIS IS THE BIG CHANGE.
  //
  // The image is now small, like your reference picture.
  // ==========================================================

  imageBox: {
    position: "absolute",

    left: 10,

    top: 15,

    width: 102,

    height: 115,

    backgroundColor: "#FFFFFF",

    borderWidth: 2,

    borderColor: "#000000",

    borderRadius: 2,

    overflow: "hidden",

    justifyContent: "center",

    alignItems: "center",
  },


  dishImage: {
    width: "100%",

    height: "100%",

    resizeMode: "cover",
  },


  // ==========================================================
  // DISH NAME
  // ==========================================================
  //
  // Starts directly beside the image.
  //
  // Bigger than the course.
  //
  // Bold.
  //
  // ALWAYS ONE LINE.
  // ==========================================================

  dishName: {
    position: "absolute",

    left: 100,

    right: 3,

    top: 19,

    fontSize: 12.8,

    fontWeight: "bold",

    color: "#000000",

    textAlign: "center",

    includeFontPadding: false,
  },


  // ==========================================================
  // COURSE
  // ==========================================================
  //
  // Directly underneath the dish name.
  //
  // Same size as the price.
  // ==========================================================

  dishCourse: {
    position: "absolute",

    left: 118,

    top: 60,

    fontSize: 13,

    fontWeight: "bold",

    color: "#000000",

    textAlign: "right",

    includeFontPadding: false,
  },


  // ==========================================================
  // PRICE
  // ==========================================================
  //
  // Bottom-right.
  //
  // Same size as the course.
  // ==========================================================

  dishPrice: {
    position: "absolute",

    right: 15,

    bottom: 19,

    fontSize: 15,

    fontWeight: "bold",

    color: "#000000",

    textAlign: "right",

    includeFontPadding: false,
  },


  // ==========================================================
  // ADD BUTTON AREA
  // ==========================================================

  addButtonArea: {
    width: "100%",

    alignItems: "center",

    marginTop: 10,

    marginBottom: 25,

    paddingTop: 5,

    paddingBottom: 5,
  },


  // ==========================================================
  // ADD BUTTON
  // ==========================================================

  addButton: {
    width: "65%",

    height: 55,

    backgroundColor: "#FFC83B",

    borderWidth: 2,

    borderColor: "#000000",

    borderRadius: 18,

    justifyContent: "center",

    alignItems: "center",
  },


  addButtonText: {
    fontSize: 18,

    fontWeight: "bold",

    color: "#000000",
  },

});