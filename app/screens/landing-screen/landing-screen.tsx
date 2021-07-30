import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import RBSheet from "react-native-raw-bottom-sheet"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const LandingScreen = observer(function LandingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <View
        style={{
          padding: 10,
          height: "60%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
          colors={["#4B6CB7", "#182848"]}
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5]}
            style={{
              height: 190,
              width: 190,
              borderRadius: 95,
              borderColor: "white",
              borderWidth: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
            colors={["#4B6CB7", "#182848"]}
          >
            <Image
              source={require("../../../assets/logo.png")}
              resizeMode="contain"
              style={{ height: 160, width: 160 }}
            />
          </LinearGradient>
        </LinearGradient>
      </View>
      <LinearGradient
        start={{ x: 0.5, y: 0.0 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5]}
        style={{
          height: "40%",
          width: "100%",
          padding: 10,
          alignItems: "flex-start",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
        colors={["#4B6CB7", "#182848"]}
      >
        <Text
          text="Welcome"
          style={{ fontSize: 24, fontWeight: "400", marginTop: 30, marginLeft: 10 }}
        />
        <Text text="Welcome to Hope up" style={{ left: 10 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
            marginTop: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("login")}
            style={{
              backgroundColor: "white",
              height: 50,
              width: 150,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
            }}
          >
            <Text text="Login" style={{ color: "#182848", fontSize: 18, fontWeight: "bold" }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("register")}
            style={{
              backgroundColor: "white",
              height: 50,
              width: 150,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
            }}
          >
            <Text text="Sign up" style={{ color: "#182848", fontSize: 18, fontWeight: "bold" }} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Screen>
  )
})
