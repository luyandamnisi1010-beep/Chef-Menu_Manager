import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

import { Stack, router } from "expo-router";

import * as ImagePicker from "expo-image-picker";

const DISH_NAME_LIMIT = 30;
const DESCRIPTION_LIMIT = 250;

type Course = "Starter" | "Main" | "Dessert";

export default function AddDishScreen() {

  const [dishName, setDishName] = useState("");

  const [course, setCourse] =
    useState<Course | null>(null);

  const [description, setDescription] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [imageUri, setImageUri] =
    useState<string | null>(null);

  const [courseOpen, setCourseOpen] =
    useState(false);

  const [nameError, setNameError] =
    useState(false);

  const [courseError, setCourseError] =
    useState(false);

  const [descriptionError, setDescriptionError] =
    useState(false);

  const [priceError, setPriceError] =
    useState(false);

  const [imageError, setImageError] =
    useState(false);

  const [popupVisible, setPopupVisible] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const chooseImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes: ["images"],

        allowsEditing: true,

        aspect: [1, 1],

        quality: 1,

      });

    if (!result.canceled) {

      setImageUri(result.assets[0].uri);

      setImageError(false);

    }
  };

  const handleDishNameChange = (
    text: string
  ) => {

    const lettersAndSpaces =
      text.replace(/[0-9]/g, "");

    const limitedText =
      lettersAndSpaces.slice(
        0,
        DISH_NAME_LIMIT
      );

    setDishName(limitedText);

    if (limitedText.trim() !== "") {

      setNameError(false);

    }
  };

  const handleDescriptionChange = (
    text: string
  ) => {

    const lettersAndSpaces =
      text.replace(/[0-9]/g, "");

    const limitedText =
      lettersAndSpaces.slice(
        0,
        DESCRIPTION_LIMIT
      );

    setDescription(limitedText);

    if (limitedText.trim() !== "") {

      setDescriptionError(false);

    }
  };

  const handleAddDish = () => {

    let hasError = false;

    if (dishName.trim() === "") {

      setNameError(true);

      hasError = true;

    } else {

      setNameError(false);

    }

    if (!course) {

      setCourseError(true);

      hasError = true;

    } else {

      setCourseError(false);

    }

    if (description.trim() === "") {

      setDescriptionError(true);

      hasError = true;

    } else {

      setDescriptionError(false);

    }

    if (price.trim() === "") {

      setPriceError(true);

      hasError = true;

    } else {

      setPriceError(false);

    }

    if (!imageUri) {

      setImageError(true);

      hasError = true;

    } else {

      setImageError(false);

    }

    if (hasError) {

      setSuccess(false);

      setPopupVisible(true);

      return;

    }

    setSuccess(true);

    setPopupVisible(true);

  };

  const handleOkay = () => {

    setPopupVisible(false);

  };

  const handleBack = () => {

    if (
      success &&
      course &&
      imageUri
    ) {

      router.replace({

        pathname: "/menu",

        params: {

          added: "true",

          dishName: dishName,

          course: course,

          description: description,

          price: price,

          image: imageUri,

        },

      });

      return;

    }

    router.back();

  };

  return (

    <View style={styles.container}>

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
          >

            <Image
              source={require("../../assets/images/back.png")}
              style={styles.backImage}
            />

          </TouchableOpacity>

          <Text style={styles.title}>
            Add Menu Item
          </Text>

        </View>

        <View style={styles.field}>

          <Text style={styles.label}>
            Dish Name:
          </Text>

          <View
            style={[
              styles.inputBox,
              nameError && styles.errorBox,
            ]}
          >

            <TextInput

              style={styles.input}

              value={dishName}

              onChangeText={handleDishNameChange}

              placeholder="Enter dish name"

              placeholderTextColor="#999999"

              numberOfLines={1}

              maxLength={DISH_NAME_LIMIT}

            />

            {nameError && (

              <Text style={styles.exclamation}>
                !
              </Text>

            )}

          </View>

          <Text style={styles.characterCounter}>

            {dishName.length}/{DISH_NAME_LIMIT} characters

          </Text>

          {nameError && (

            <Text style={styles.emptyText}>
              Field is empty
            </Text>

          )}

        </View>

        <View style={styles.field}>

          <Text style={styles.label}>
            Course:
          </Text>

          <TouchableOpacity

            style={[
              styles.inputBox,
              courseError && styles.errorBox,
            ]}

            onPress={() =>
              setCourseOpen(!courseOpen)
            }

          >

            <Text style={styles.courseText}>
              {course || "Select Course"}
            </Text>

            <Text style={styles.arrow}>
              ▼
            </Text>

            {courseError && (

              <Text style={styles.exclamation}>
                !
              </Text>

            )}

          </TouchableOpacity>

          {courseOpen && (

            <View style={styles.dropdown}>

              <TouchableOpacity

                style={styles.option}

                onPress={() => {

                  setCourse("Starter");

                  setCourseError(false);

                  setCourseOpen(false);

                }}

              >

                <Text style={styles.optionText}>
                  Starter
                </Text>

              </TouchableOpacity>

              <TouchableOpacity

                style={styles.option}

                onPress={() => {

                  setCourse("Main");

                  setCourseError(false);

                  setCourseOpen(false);

                }}

              >

                <Text style={styles.optionText}>
                  Main
                </Text>

              </TouchableOpacity>

              <TouchableOpacity

                style={styles.option}

                onPress={() => {

                  setCourse("Dessert");

                  setCourseError(false);

                  setCourseOpen(false);

                }}

              >

                <Text style={styles.optionText}>
                  Dessert
                </Text>

              </TouchableOpacity>

            </View>

          )}

          {courseError && (

            <Text style={styles.emptyText}>
              Field is empty
            </Text>

          )}

        </View>

        <View style={styles.field}>

          <Text style={styles.label}>
            Description:
          </Text>

          <View
            style={[
              styles.descriptionBox,
              descriptionError && styles.errorBox,
            ]}
          >

            <TextInput

              style={styles.descriptionInput}

              value={description}

              multiline={true}

              textAlignVertical="top"

              placeholder="Enter description"

              placeholderTextColor="#999999"

              onChangeText={handleDescriptionChange}

              maxLength={DESCRIPTION_LIMIT}

              scrollEnabled={true}

            />

            {descriptionError && (

              <Text style={styles.exclamation}>
                !
              </Text>

            )}

          </View>

          <Text style={styles.characterCounter}>

            {description.length}/{DESCRIPTION_LIMIT} characters

          </Text>

          {descriptionError && (

            <Text style={styles.emptyText}>
              Field is empty
            </Text>

          )}

        </View>

        <View style={styles.field}>

          <Text style={styles.label}>
            Price:
          </Text>

          <View
            style={[
              styles.priceBox,
              priceError && styles.errorBox,
            ]}
          >

            <Text style={styles.currency}>
              R
            </Text>

            <TextInput

              style={styles.priceInput}

              value={price}

              keyboardType="numeric"

              placeholder="0"

              placeholderTextColor="#999999"

              onChangeText={(text) => {

                const numbersOnly =
                  text.replace(/[^0-9]/g, "");

                setPrice(numbersOnly);

                if (
                  numbersOnly.trim() !== ""
                ) {

                  setPriceError(false);

                }

              }}

            />

            {priceError && (

              <Text style={styles.exclamation}>
                !
              </Text>

            )}

          </View>

          {priceError && (

            <Text style={styles.emptyText}>
              Field is empty
            </Text>

          )}

        </View>

        <View style={styles.field}>

          <Text style={styles.label}>
            Image:
          </Text>

          <TouchableOpacity

            style={[
              styles.imageBox,
              imageError && styles.errorBox,
            ]}

            onPress={chooseImage}

          >

            {imageUri ? (

              <Image

                source={{
                  uri: imageUri,
                }}

                style={styles.selectedImage}

              />

            ) : (

              <Text style={styles.imagePlaceholder}>
                Tap to add image
              </Text>

            )}

            {imageError && (

              <Text style={styles.imageExclamation}>
                !
              </Text>

            )}

          </TouchableOpacity>

          {imageError && (

            <Text style={styles.emptyText}>
              Field is empty
            </Text>

          )}

        </View>

        <TouchableOpacity

          style={styles.addButton}

          onPress={handleAddDish}

        >

          <Text style={styles.addButtonText}>
            Add Dish
          </Text>

        </TouchableOpacity>

      </ScrollView>

      <Modal

        visible={popupVisible}

        transparent={true}

        animationType="fade"

        onRequestClose={() =>
          setPopupVisible(false)
        }

      >

        <View style={styles.modalBackground}>

          <View style={styles.popup}>

            <Text style={styles.popupTitle}>
              MenuNest
            </Text>

            <Text style={styles.popupMessage}>

              {success
                ? "Dish Added Successfully"
                : "Dish Not Added"}

            </Text>

            <Text style={styles.popupSmallText}>

              {success
                ? "Might take a moment to upload"
                : "Please fill in the empty fields"}

            </Text>

            <TouchableOpacity

              style={styles.okButton}

              onPress={handleOkay}

            >

              <Text style={styles.okText}>
                OK!
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EFE7D2",
  },

  scroll: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 25,
  },

  header: {
    width: "88%",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },

  backButton: {
    position: "absolute",
    left: 0,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },

  field: {
    width: "88%",
    marginBottom: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
  },

  inputBox: {
    width: "100%",
    height: 43,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    justifyContent: "center",
  },

  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000000",
    paddingRight: 35,
  },

  errorBox: {
    borderWidth: 1,
    borderColor: "#000000",
  },

  exclamation: {
    position: "absolute",
    right: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },

  emptyText: {
    fontSize: 10,
    color: "#000000",
    marginLeft: 3,
    marginTop: 1,
    fontStyle: "italic",
  },

  characterCounter: {
    fontSize: 10,
    color: "#555555",
    textAlign: "right",
    marginTop: 2,
    marginRight: 3,
  },

  courseText: {
    textAlign: "center",
    fontSize: 16,
    color: "#000000",
  },

  arrow: {
    position: "absolute",
    right: 12,
    fontSize: 12,
    color: "#000000",
  },

  dropdown: {
    width: "100%",
    backgroundColor: "#DAF0C5",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    marginTop: 4,
    overflow: "hidden",
  },

  option: {
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },

  descriptionBox: {
    width: "100%",
    height: 63,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    overflow: "hidden",
  },

  descriptionInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 15,
    color: "#000000",
  },

  priceBox: {
    width: "100%",
    height: 43,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  currency: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#000000",
    marginLeft: 11,
    marginRight: 5,
  },

  priceInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#000000",
    paddingHorizontal: 2,
  },

  imageBox: {
    width: "100%",
    height: 105,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  imagePlaceholder: {
    fontSize: 14,
    color: "#777777",
  },

  imageExclamation: {
    position: "absolute",
    right: 10,
    top: 7,
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },

  addButton: {
    width: "65%",
    height: 50,
    backgroundColor: "#FFC83B",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.20)",
  },

  popup: {
    width: 320,
    minHeight: 200,
    backgroundColor: "#D9EAD3",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
  },

  popupTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
    marginBottom: 20,
  },

  popupMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 14,
  },

  popupSmallText: {
    fontSize: 12,
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },

  okButton: {
    width: 90,
    height: 40,
    backgroundColor: "#FFF36A",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  okText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    fontFamily: "serif",
  },

}); 