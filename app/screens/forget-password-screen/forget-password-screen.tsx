import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Image, TextInput } from "react-native"
import { Screen, Text, Icon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: "#003D6A",
  flex: 1,
}

const back: ViewStyle = {
  height: 30,
  width: 30,
  borderRadius: 10,
  backgroundColor: "white",
  elevation: 10,
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
}

const input: ViewStyle = {
  width: "90%",
  alignSelf: "center",
  borderRadius: 30,
  backgroundColor: color.palette.offWhite,
  height: 55,
}

const gradient: ViewStyle = {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  height: 55,
  width: "90%",
  alignSelf: "center",
  borderRadius: 30,
  marginTop: 30,
}

export const ForgetPasswordScreen = observer(function ForgetPasswordScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()

  const [email, setEmail] = useState("")

  async function sendEmail() {
    console.log("runing")
    const response = await user.sendForgetMail(email)
    if (response) {
      navigation.navigate("emailVerification", { email: email })
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ padding: 10, height: "65%" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={back}>
            <Icon icon="bback" />
          </TouchableOpacity>
          <View style={[back, { backgroundColor: "transparent", elevation: 0 }]} />
        </View>
        <View
          style={{ height: "80%", justifyContent: "space-evenly", top: 10, alignItems: "center" }}
        >
          <Text
            text="Forgot Password"
            style={{ fontSize: 32, fontWeight: "400", textAlign: "center" }}
          />
          <View style={{ width: "65%", alignSelf: "center" }}>
            <Text
              text="Please Enter Your Email Address To Receive a Verification Code"
              style={{ textAlign: "center" }}
            />
          </View>
          <Image source={require("../../../assets/lock.png")} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: "35%",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View style={[input, { justifyContent: "center", marginBottom: 20 }]}>
          <TextInput
            placeholder="Enter Your Email Address"
            style={{ padding: 10, width: "90%", alignSelf: "center" }}
            value={email}
            onChangeText={(e: any) => setEmail(e)}
          />
        </View>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={[gradient, { bottom: 20 }]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => sendEmail()}
          >
            <Text text="Send" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Screen>
  )
})
