import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  Platform,
  ActivityIndicator,
} from "react-native"
import { Icon, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"
import messaging from "@react-native-firebase/messaging"

const ROOT: ViewStyle = {
  backgroundColor: "#003D6A",
  flex: 1,
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
  padding: 10,
}

const subRoot: ViewStyle = {
  backgroundColor: "white",
  height: "70%",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  padding: 10,
  // justifyContent: 'center'
}

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [validation, setValidation] = useState(false)
  const [deviceToken, setDeviceToken] = useState("")
  const [loading, setLoading] = useState(false)

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    registerAppWithFCM()
    async function registerAppWithFCM() {
      if (Platform.OS === "ios") {
        await messaging().registerDeviceForRemoteMessages()
        await messaging().setAutoInitEnabled(true)
      }
    }
    if (Platform.OS === "ios") {
      messaging()
        .hasPermission()
        .then((res) => {
          // console.log(res, 'MESSAGING');
          switch (res) {
            case 2:
              messaging()
                .getToken()
                .then((token) => {
                  // console.log('token', token);
                  setDeviceToken(token)
                })
              break
            case -1:
              messaging()
                .requestPermission()
                .then((res) => {
                  messaging()
                    .getToken()
                    .then((token) => {
                      // console.log('token', token);
                      setDeviceToken(token)
                    })
                })
              break
            case 1:
              messaging()
                .getToken()
                .then((token) => {
                  // console.log('token', token);
                  setDeviceToken(token)
                })
              break
            default:
              messaging()
                .getToken()
                .then((token) => {
                  // console.log('token', token);
                  setDeviceToken(token)
                })
          }
        })
    } else {
      messaging()
        .getToken()
        .then((token) => {
          // console.log('token', token);
          setDeviceToken(token)
        })
    }
  }, [])

  const Login = async () => {
    setLoading(true)
    user.setEmailAddress(email.toLowerCase().trim())
    user.setPassword(password.trim())
    user.setDeviceToken(deviceToken)
    console.log(deviceToken, "DT")
    const response = await user.login()
    setLoading(false)
    if (response.status !== 200) {
      setLoading(false)
    } else {
      setLoading(false)
      navigation.navigate("app", { screen: "home" })
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ padding: 10, height: "30%" }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={back}>
            <Icon icon="bback" />
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate("register")}>
            <Text text="Register" />
          </TouchableOpacity>
        </View>
        <View style={{ height: "80%", justifyContent: "center", top: 30 }}>
          <Text
            text="Log In"
            style={{ fontSize: 32, fontWeight: "bold", bottom: 10, textAlign: "center" }}
          />
          {/* <Text text="Lorem Ipsum is simply dummy text of the printing and type setting industry. Lorem Ipsum has been the indus....." /> */}
        </View>
      </View>
      <View style={subRoot}>
        <View style={[input, { justifyContent: "center", marginTop: 30 }]}>
          <TextInput
            placeholder="Email"
            style={{ padding: 10, width: "90%", alignSelf: "center" }}
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
              marginTop: 20,
            },
          ]}
        >
          <TextInput
            placeholder="Password"
            style={{ padding: 10, width: "80%", alignSelf: "center" }}
            value={password}
            onChangeText={(e: any) => setPassword(e)}
            secureTextEntry={showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
            <Icon icon="eye" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("forgetPassword")}
          style={{ alignSelf: "flex-end", marginRight: 40, top: 10 }}
        >
          <Text
            text="Forget Password!"
            style={{ color: "#c5c5c5", textDecorationLine: "underline" }}
          />
        </TouchableOpacity>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={gradient}
        >
          <TouchableOpacity
            style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center" }}
            onPress={() => Login()}
          >
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text text="Login" style={{ textAlign: "center" }} />
            )}
          </TouchableOpacity>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => navigation.navigate("register")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 20,
            padding: 10,
          }}
        >
          <Text text="Don't have an Account? " style={{ color: "grey" }} />
          <Text
            text="Sign up"
            style={{ color: "#182848", textDecorationLine: "underline", fontWeight: "bold" }}
          />
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
