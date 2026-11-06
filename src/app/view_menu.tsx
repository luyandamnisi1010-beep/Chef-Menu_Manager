import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function ViewMenuScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    description?: string;
    price?: string;
    image?: string;
    course?: string;
  }>();

  const [isEditing, setIsEditing] = useState(false);
  const [dishId] = useState(params.id || "");
  const [dishName, setDishName] = useState(params.name || "");
  const [description, setDescription] = useState(params.description || "");
  const [price, setPrice] = useState(params.price || "");
  const [course, setCourse] = useState(params.course || "Main");
  const [imageUri, setImageUri] = useState(params.image || null);
  const [courseOpen, setCourseOpen] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [priceErrorMessage, setPriceErrorMessage] = useState("Field is empty");
  const [courseError, setCourseError] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const chooseImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSaveEdit = () => {
    let hasError = false;

    if (dishName.trim() === "") {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (description.trim() === "") {
      setDescriptionError(true);
      hasError = true;
    } else {
      setDescriptionError(false);
    }

    if (!course) {
      setCourseError(true);
      hasError = true;
    } else {
      setCourseError(false);
    }

    if (price.trim() === "") {
      setPriceErrorMessage("Field is empty");
      setPriceError(true);
      hasError = true;
    } else {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        setPriceErrorMessage("Dish price must be greater than R0.00.");
        setPriceError(true);
        hasError = true;
      } else {
        setPriceError(false);
      }
    }

    if (hasError) {
      return;
    }

    setIsEditing(false);
    setSuccessModalVisible(true);
  };

  const handleSuccessOk = () => {
    setSuccessModalVisible(false);
    router.replace({
      pathname: "/menu",
      params: {
        updated: "true",
        id: dishId || params.id || "",
        dishName: dishName,
        description: description,
        price: price,
        image: imageUri !== null ? imageUri : (params.image || ""),
        course: course,
      },
    });
  };

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false);
    router.replace({
      pathname: "/menu",
      params: {
        deleted: "true",
        id: dishId || params.id || "",
        dishName: params.name || dishName,
      },
    });
  };

  const handleBackFromEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackFromEdit}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Menu Item</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.field}>
            <Text style={styles.label}>Dish Name:</Text>
            <View style={[styles.inputBox, nameError && styles.errorBox]}>
              <TextInput
                style={styles.input}
                value={dishName}
                onChangeText={(text) => {
                  setDishName(text);
                  if (text.trim() !== "") setNameError(false);
                }}
                placeholder="Enter dish name"
                placeholderTextColor="#999999"
                numberOfLines={1}
                maxLength={30}
              />
              {nameError && <Text style={styles.exclamation}>!</Text>}
            </View>
            {nameError && (
              <Text style={styles.emptyText}>Field is empty</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Course:</Text>
            <TouchableOpacity
              style={[styles.inputBox, courseError && styles.errorBox]}
              onPress={() => setCourseOpen(!courseOpen)}
            >
              <Text style={styles.courseText}>{course || "Select Course"}</Text>
              <Text style={styles.arrow}>▼</Text>
              {courseError && <Text style={styles.exclamation}>!</Text>}
            </TouchableOpacity>

            {courseOpen && (
              <View style={styles.dropdown}>
                {["Starter", "Main", "Dessert"].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.option}
                    onPress={() => {
                      setCourse(item);
                      setCourseError(false);
                      setCourseOpen(false);
                    }}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {courseError && (
              <Text style={styles.emptyText}>Field is empty</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Price:</Text>
            <View
              style={[
                styles.priceBoxEdit,
                priceError && styles.errorBox,
              ]}
            >
              <Text style={styles.currency}>R</Text>
              <TextInput
                style={styles.priceInput}
                value={price}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#999999"
                onChangeText={(text) => {
                  const numbersOnly = text.replace(/[^0-9]/g, "");
                  setPrice(numbersOnly);
                  if (numbersOnly.trim() !== "") {
                    const numericPrice = parseFloat(numbersOnly);
                    if (!isNaN(numericPrice) && numericPrice > 0) {
                      setPriceError(false);
                    }
                  }
                }}
              />
              {priceError && <Text style={styles.exclamation}>!</Text>}
            </View>
            {priceError && (
              <Text style={styles.emptyText}>{priceErrorMessage}</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Description:</Text>
            <View style={[styles.descriptionBox, descriptionError && styles.errorBox]}>
              <TextInput
                style={styles.descriptionInput}
                value={description}
                multiline={true}
                textAlignVertical="top"
                placeholder="Enter description"
                placeholderTextColor="#999999"
                onChangeText={(text) => {
                  setDescription(text);
                  if (text.trim() !== "") setDescriptionError(false);
                }}
                maxLength={250}
                scrollEnabled={true}
              />
              {descriptionError && <Text style={styles.exclamation}>!</Text>}
            </View>
            {descriptionError && (
              <Text style={styles.emptyText}>Field is empty</Text>
            )}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Image:</Text>
            <TouchableOpacity style={styles.editImageBox} onPress={chooseImage}>
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={styles.dishImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.imagePlaceholder}>Tap to add image</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSaveEdit}
          >
            <Text style={styles.addButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>

        <Text style={styles.title}>View Menu Item</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageBox}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.dishImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.noImageText}>No Image</Text>
          )}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.dishName}>
            {dishName || params.name || "Dish Name"}
          </Text>

          <Text style={styles.price}>
            R{price || params.price || "0.00"}
          </Text>

          <Text style={styles.description}>
            {description || params.description || "No description added."}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.popupDelete}>
            <Text style={styles.popupTitle}>MenuNest</Text>
            <Text style={styles.popupMessage}>
              Do you want to delete this dish?
            </Text>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.cancelModalButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmModalButton}
                onPress={handleDeleteConfirm}
              >
                <Text style={styles.confirmModalText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={successModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.popup}>
            <Text style={styles.popupTitle}>Edit Successful!</Text>
            <Text style={styles.popupMessage}>
              Your menu item has been successfully updated.
            </Text>
            <TouchableOpacity
              style={styles.okButton}
              onPress={handleSuccessOk}
            >
              <Text style={styles.okText}>OK!</Text>
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
  editImageBox: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  dishImage: {
    width: "100%",
    height: "100%",
  },
  noImageText: {
    fontSize: 16,
    color: "#777777",
  },
  imagePlaceholder: {
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
  field: {
    width: "92%",
    marginBottom: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 5,
  },
  inputBox: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
  courseText: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
  arrow: {
    fontSize: 12,
    color: "#000000",
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#cad182",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    marginTop: 5,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  optionText: {
    fontSize: 15,
    color: "#000000",
  },
  priceBoxEdit: {
    width: "100%",
    height: 45,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  currency: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 5,
  },
  priceInput: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
  descriptionBox: {
    width: "100%",
    height: 100,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
