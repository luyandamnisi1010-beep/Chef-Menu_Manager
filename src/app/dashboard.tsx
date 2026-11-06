import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Stack, router } from "expo-router";
import { savedDishes, Dish } from "./menu";

export default function Dashboard() {
  const [showStats, setShowStats] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    if (showStats) {
      setDishes([...savedDishes]);
    }
  }, [showStats]);

  const totalItems = dishes.length;

  const totalPrice = dishes.reduce((sum, dish) => {
    const priceNum = parseFloat(dish.price);
    return sum + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);

  const averagePrice = totalItems > 0 ? totalPrice / totalItems : 0;

  const starterCount = dishes.filter((d) => d.course === "Starter").length;
  const mainCount = dishes.filter((d) => d.course === "Main").length;
  const dessertCount = dishes.filter((d) => d.course === "Dessert").length;

  const getPercentage = (count: number) => {
    if (totalItems === 0) return 0;
    return Math.round((count / totalItems) * 100);
  };

  if (showStats) {
    return (
      <View style={[styles.container, styles.statsBackground]}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowStats(false)}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.statsHeadingText}>Statistics</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.overviewCard}>
            <Text style={styles.cardTitle}>Menu Overview</Text>
            <Text style={styles.cardSubtitle}>Your restaurant menu at a glance</Text>

            <View style={styles.panelsRow}>
              <View style={styles.infoPanel}>
                <Text style={styles.panelValue}>{totalItems}</Text>
                <Text style={styles.panelLabel}>Total Menu Items</Text>
              </View>

              <View style={styles.infoPanel}>
                <Text style={styles.panelValue}>R{averagePrice.toFixed(2)}</Text>
                <Text style={styles.panelLabel}>Average Menu Price</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionHeading}>Menu Items by Course</Text>

          <View style={styles.courseCard}>
            <View style={styles.courseLeft}>
              <View>
                <Text style={styles.courseName}>Starter</Text>
                <Text style={styles.courseSubtitle}>{starterCount} Menu Items</Text>
              </View>
            </View>
            <View style={styles.courseRight}>
              <Text style={styles.courseCount}>{starterCount}</Text>
              <Text style={styles.coursePercentage}>{getPercentage(starterCount)}%</Text>
            </View>
          </View>

          <View style={styles.courseCard}>
            <View style={styles.courseLeft}>
              <View>
                <Text style={styles.courseName}>Main</Text>
                <Text style={styles.courseSubtitle}>{mainCount} Menu Items</Text>
              </View>
            </View>
            <View style={styles.courseRight}>
              <Text style={styles.courseCount}>{mainCount}</Text>
              <Text style={styles.coursePercentage}>{getPercentage(mainCount)}%</Text>
            </View>
          </View>

          <View style={styles.courseCard}>
            <View style={styles.courseLeft}>
              <View>
                <Text style={styles.courseName}>Dessert</Text>
                <Text style={styles.courseSubtitle}>{dessertCount} Menu Items</Text>
              </View>
            </View>
            <View style={styles.courseRight}>
              <Text style={styles.courseCount}>{dessertCount}</Text>
              <Text style={styles.coursePercentage}>{getPercentage(dessertCount)}%</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>

        <Image
          source={require("../../assets/images/Dashboard.png")}
          style={styles.dashboardImage}
          resizeMode="contain"
        />

        <Text style={styles.welcome}>Welcome to MenuNest,</Text>

        <Text style={styles.description}>
          Keep your menu fresh, organised, and ready to serve. Add new dishes, update details and manage your menu with ease.
        </Text>

        <Text style={styles.callout}>All in one place. Let's get organised!</Text>

        <TouchableOpacity
          style={styles.viewMenuButton}
          onPress={() => router.push("/menu")}
          activeOpacity={0.8}
        >
          <Text style={styles.viewMenuText}>View Menu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statisticsButton}
          onPress={() => setShowStats(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.statisticsText}>Statistics</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, backgroundColor: "#EFE7D2", justifyContent: "center", alignItems: "center", paddingHorizontal: 25 },
  statsBackground: { backgroundColor: "#CCE5FF", justifyContent: "flex-start", paddingTop: 65 },
  title: { fontSize: 38, fontFamily: "Georgia", fontWeight: "bold", color: "#D92D61", textAlign: "center", marginBottom: 15 },
  dashboardImage: { width: 150, height: 150, marginBottom: 12 },
  welcome: { fontSize: 24, fontFamily: "Georgia", fontWeight: "bold", color: "#171717", textAlign: "center", marginBottom: 12 },
  description: { fontSize: 15, lineHeight: 22, color: "#171717", textAlign: "center", maxWidth: 330, marginBottom: 12 },
  callout: { fontSize: 15, fontStyle: "italic", color: "#171717", textAlign: "center", marginBottom: 25 },
  viewMenuButton: { width: 210, height: 50, backgroundColor: "#F76C82", borderWidth: 1.5, borderColor: "#111111", borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  viewMenuText: { fontSize: 19, fontFamily: "Georgia", fontWeight: "bold", color: "#111111" },
  statisticsButton: { width: 210, height: 50, backgroundColor: "#CBEED6", borderWidth: 1.5, borderColor: "#111111", borderRadius: 14, alignItems: "center", justifyContent: "center" },
  statisticsText: { fontSize: 19, fontFamily: "Georgia", fontWeight: "bold", color: "#111111" },
  header: { width: "100%", height: 60, flexDirection: "row", alignItems: "center", justifyContent: "center", position: "relative", marginTop: 10, marginBottom: 10 },
  backButton: { position: "absolute", left: 0, width: 40, height: 40, justifyContent: "center", alignItems: "center" },
  backArrow: { fontSize: 28, color: "#000000", fontWeight: "bold" },
  statsHeadingText: { fontSize: 30, fontWeight: "bold", color: "#D92D61", fontFamily: "Georgia", textAlign: "center", includeFontPadding: false },
  scrollView: { flex: 1, width: "100%" },
  contentContainer: { paddingBottom: 30, alignItems: "center" },
  overviewCard: { width: "100%", backgroundColor: "#F19C99", borderRadius: 20, padding: 20, alignItems: "center", borderWidth: 1.5, borderColor: "#000000", marginBottom: 25 },
  cardTitle: { fontSize: 22, fontWeight: "bold", color: "#000000", fontFamily: "serif", marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: "#333333", marginBottom: 20 },
  panelsRow: { width: "100%", flexDirection: "row", justifyContent: "space-between", gap: 12 },
  infoPanel: { flex: 1, backgroundColor: "#E1D5E7", borderRadius: 14, paddingVertical: 15, paddingHorizontal: 10, alignItems: "center", borderWidth: 1.5, borderColor: "#000000" },
  panelValue: { fontSize: 20, fontWeight: "bold", color: "#000000", marginBottom: 4 },
  panelLabel: { fontSize: 12, fontWeight: "bold", color: "#333333", textAlign: "center" },
  sectionHeading: { fontSize: 20, fontWeight: "bold", color: "#000000", fontFamily: "serif", marginBottom: 15, alignSelf: "flex-start" },
  courseCard: { width: "100%", backgroundColor: "#FFFFFF", borderRadius: 15, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12, borderWidth: 1.5, borderColor: "#000000" },
  courseLeft: { flexDirection: "row", alignItems: "center" },
  courseName: { fontSize: 17, fontWeight: "bold", color: "#000000" },
  courseSubtitle: { fontSize: 13, color: "#666666", marginTop: 2 },
  courseRight: { alignItems: "flex-end" },
  courseCount: { fontSize: 18, fontWeight: "bold", color: "#000000" },
  coursePercentage: { fontSize: 12, color: "#666666", marginTop: 2 },
});