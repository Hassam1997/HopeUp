import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Image, Alert, TextInput } from "react-native"
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

const gradient: ViewStyle = {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  height: 55,
  width: "90%",
  alignSelf: "center",
  borderRadius: 30,
}

export const EmailVerificationScreen = observer(function EmailVerificationScreen({ route }) {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const [code, setCode] = useState("")

  const [email, setEmail] = useState("")

  useEffect(() => {
    setEmail(route.params.email)
  }, [route])

  async function resendCode() {
    const response = await user.sendForgetMail(email)
    if (response) {
      Alert.alert("Code Sent", "Code is successfully sent to your email")
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ padding: 10, height: "55%" }}>
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
            text="Verify Your Email"
            style={{ fontSize: 32, fontWeight: "400", textAlign: "center" }}
          />
          <View style={{ width: "75%" }}>
            <Text
              text={`Please Enter The 4 Digit Code Sent To Your Email ${email}`}
              style={{ textAlign: "center" }}
            />
          </View>
          <Image source={require("../../../assets/codemail.png")} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: "white",
          height: "45%",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            justifyContent: "space-evenly",
            width: "90%",
            alignSelf: "center",
            height: "60%",
          }}
        >
          <View
            style={{
              backgroundColor: "lightgrey",
              height: 50,
              width: "85%",
              alignSelf: "center",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <TextInput
              value={code}
              onChangeText={(e: any) => setCode(e)}
              placeholder={"enter six digit code"}
              style={{ height: 40 }}
            />
          </View>
          <TouchableOpacity onPress={() => resendCode()} style={{ alignSelf: "center" }}>
            <Text
              text="Resend Code"
              style={{
                color: "#182848",
                textDecorationLine: "underline",
                textDecorationColor: "#182848",
                fontWeight: "bold",
              }}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={[gradient, { bottom: 15 }]}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("resetPassword", { email: email, code: code })}
          >
            <Text text="Verify" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Screen>
  )
})
