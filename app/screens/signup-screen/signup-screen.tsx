import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import { Screen, Text, Icon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"

const { height, width } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: "#003D6A",
  height: height,
  width: width,
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

const back: ViewStyle = {
  height: 30,
  width: 30,
  borderRadius: 10,
  backgroundColor: "white",
  elevation: 10,
  justifyContent: "center",
  alignItems: "center",
}

const subRoot: ViewStyle = {
  backgroundColor: "white",
  height: "74%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  padding: 10,
  justifyContent: "center",
}

const subInput: ViewStyle = {
  padding: 10,
  width: "90%",
  alignSelf: "center",
}

export const SignupScreen = observer(function SignupScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  const Signup = async () => {
    setLoading(true)
    user.setEmailAddress(email)
    user.setFirstName(firstName)
    user.setLastName(lastName)
    user.setPassword(password)
    user.setUserName(username)
    await user.Signup()
    setLoading(false)
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ padding: 10, height: "25%" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={back}>
            <Icon icon="bback" />
          </TouchableOpacity>
          <View style={[back, { backgroundColor: "transparent", elevation: 0 }]} />
        </View>
        <View style={{ height: "80%", justifyContent: "center", top: 30 }}>
          <Text
            text="Sign Up"
            style={{ fontSize: 32, fontWeight: "bold", bottom: 10, textAlign: "center" }}
          />
          {/* <Text text="Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the indus....." style={{marginBottom: 40}} /> */}
        </View>
      </View>
      <View style={subRoot}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}
        >
          <View style={[input, { justifyContent: "center", marginBottom: 20, width: "40%" }]}>
            <TextInput
              placeholder="First Name"
              style={subInput}
              value={firstName}
              onChangeText={(e: any) => setFirstName(e)}
            />
          </View>
          <View style={[input, { justifyContent: "center", marginBottom: 20, width: "40%" }]}>
            <TextInput
              placeholder="Last Name"
              style={subInput}
              value={lastName}
              onChangeText={(e: any) => setLastName(e)}
            />
          </View>
        </View>
        <View style={[input, { justifyContent: "center", marginBottom: 20 }]}>
          <TextInput
            placeholder="User Name"
            style={subInput}
            value={username}
            onChangeText={(e: any) => setUsername(e)}
          />
        </View>
        <View style={[input, { justifyContent: "center", marginBottom: 20 }]}>
          <TextInput
            placeholder="Email"
            style={subInput}
            value={email}
            onChangeText={(e: any) => setEmail(e)}
          />
        </View>
        <View
          style={[
            input,
            {
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              marginBottom: 20,
            },
          ]}
        >
          <TextInput
            placeholder="Password"
            style={[subInput, { width: "80%" }]}
            value={password}
            onChangeText={(e: any) => setPassword(e)}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
            <Icon icon="eye" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            input,
            {
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
            },
          ]}
        >
          <TextInput
            placeholder="Confirm Password"
            style={[subInput, { width: "80%" }]}
            value={confirmPassword}
            secureTextEntry={showConfirmPassword}
            onChangeText={(e: any) => setConfirmPassword(e)}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{ padding: 10 }}
          >
            <Icon icon="eye" />
          </TouchableOpacity>
        </View>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={gradient}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => Signup()}
          >
            {loading ? <ActivityIndicator size="large" color="white" /> : <Text text="Sign Up" />}
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => navigation.navigate("login")}
          style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: 20 }}
        >
          <Text text="Already have an Account?  " style={{ color: "grey" }} />
          <Text
            text="Login"
            style={{ color: "#182848", textDecorationLine: "underline", fontWeight: "bold" }}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
