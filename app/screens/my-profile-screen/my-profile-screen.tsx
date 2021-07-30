import React, { useState, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native"
import { Screen, Text, Header, Icon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"
import RBSheet from "react-native-raw-bottom-sheet"
import RadioForm from "react-native-simple-radio-button"
import ImagePicker from "react-native-image-crop-picker"
import axios from "axios"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  height: "100%",
  width: "100%",
}

const input: ViewStyle = {
  backgroundColor: "#859ABE",
  borderRadius: 10,
  opacity: 0.7,
}

export const MyProfileScreen = observer(function MyProfileScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()
  const [value, setValue] = useState(0)
  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [isImage, isSetImage] = useState("")
  const refRBSheet = useRef(undefined)
  const [loading, setLoading] = useState(false)
  const [IsProfile, isSetProfile] = useState({})

  useEffect(() => {
    isSetProfile(user.myProfile)
    setFName(user.myProfile.first_name)
    setLName(user.myProfile.last_name)
    setEmail(user.myProfile.email)
    isSetImage(user.myProfile.profile_picture)
  }, [])

  const imagepicker = () => {
    ImagePicker.openPicker({
      height: 250,
      multiple: false,
      width: wp("100%"),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    }).then((images) => {
      refRBSheet.current.close()
      setLoading(true)
      let formData = new FormData()
      formData.append("images", {
        name: `${Date.now()}  + Image.jpg`,
        type: images.mime,
        uri: images.path,
      })
      axios
        .post(`http://3.14.145.118:4000/api/image/uploadImage`, formData)
        .then((res) => {
          console.log(res)
          user.editProfileImage(user.user_id, user.token, res.data[0])
          isSetImage(res.data[0])
          setLoading(false)
        })
        .catch((err) => {
          if (err.request) {
            console.log(err.request, "req")
          } else if (err.response) {
            console.log(err.response, "response")
          } else {
            console.log(err, "error")
          }
        })
    })
  }

  const campicker = () => {
    ImagePicker.openCamera({
      multiple: false,
      cropping: true,
      height: 150,
      width: 150,
    }).then((images) => {
      refRBSheet.current.close()
      setLoading(true)
      let formData = new FormData()
      formData.append("images", {
        name: `${Date.now()}  + Image.jpg`,
        type: images.mime,
        uri: images.path,
      })
      axios
        .post("http://3.14.145.118:4000/api/image/uploadImage", formData)
        .then((res) => {
          console.log(res)
          user.editProfileImage(user.user_id, user.token, res.data[0])
          isSetImage(res.data[0])
          setLoading(false)
        })
        .catch((err) => {
          if (err.request) {
            console.log(err.request, "req")
          } else if (err.response) {
            console.log(err.response, "response")
          } else {
            console.log(err, "error")
          }
        })
    })
  }

  var radio_props = [
    { label: "Male", value: 0 },
    { label: "Female", value: 1 },
  ]

  // Pull in navigation via hook
  const navigation = useNavigation()

  const saveProfile = async () => {
    if (fName !== user.myProfile.first_name || lName !== user.myProfile.last_name) {
      let obj = {
        first_name: fName,
        last_name: lName,
      }
      const data = await user.editProfile(user.user_id, user.token, obj)
      console.log("success", data)
      Alert.alert("Congratulations", "You have successfuly updated your profile", [
        {
          text: " Ok",
          style: "default",
          onPress: () => navigation.goBack(),
        },
      ])
    } else {
      Alert.alert("Congratulations", "You have successfuly updated your profile", [
        {
          text: " Ok",
          style: "default",
          onPress: () => navigation.goBack(),
        },
      ])
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText="Profile"
        rightIcon={"bell"}
        onRightPress={() => navigation.navigate("notifications")}
      />
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 200,
            width: 300,
            alignSelf: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#2681D5" />
          ) : (
              <Image
                source={isImage !== null ? { uri: isImage } : require("../../../assets/avatar3.png")}
                resizeMode="contain"
                style={{ height: 150, width: 150, marginTop: 50, borderRadius: 10 }}
              />
            )}
          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.open()
            }}
            style={{
              left: 55,
              backgroundColor: color.palette.offWhite,
              padding: 10,
              borderRadius: 10,
              bottom: 23,
            }}
          >
            <Icon icon="camera" />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ padding: 10 }}>
            <Text text="First Name" style={{ color: "#49669E" }} />
            <View style={input}>
              <TextInput
                value={fName}
                onChangeText={(e: any) => setFName(e)}
                style={{ color: "white" }}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Last Name" style={{ color: "#49669E" }} />
            <View style={input}>
              <TextInput
                value={lName}
                onChangeText={(e: any) => setLName(e)}
                style={{ color: "white" }}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Date Of Birth" style={{ color: "#49669E" }} />
            <View style={input}>
              <TextInput />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Gender" style={{ color: "#49669E" }} />
            <View style={{ justifyContent: "space-between" }}>
              <RadioForm
                radio_props={radio_props}
                formHorizontal={true}
                initial={0}
                onPress={(val: any) => setValue(val)}
                buttonColor="white"
                labelColor="white"
                buttonInnerColor={"#49669E"}
                buttonOuterColor={"#49669E"}
                style={{
                  justifyContent: "space-evenly",
                  backgroundColor: "#859ABE",
                  padding: 10,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Email" style={{ color: "#49669E" }} />
            <View style={input}>
              <TextInput
                keyboardType="email-address"
                value={email}
                editable={false}
                onChangeText={(e: any) => setEmail(e)}
                style={{ color: "white" }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: 10,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: "#859ABE",
                padding: 10,
                height: 40,
                width: 80,
                borderRadius: 10,
              }}
            >
              <Text text="Cancel" style={{ textAlign: "center" }} />
            </TouchableOpacity>
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              style={{ padding: 10, borderRadius: 10, height: 40, width: 80 }}
              colors={["#4B6CB7", "#182848"]}
            >
              <TouchableOpacity onPress={() => saveProfile()}>
                <Text text="Save" style={{ textAlign: "center" }} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "white",
          },
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          style={{
            height: loading ? 300 : 500,
            width: "100%",
            padding: 10,
            alignItems: "flex-start",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          colors={["#4B6CB7", "#182848"]}
        >
          <View style={{ width: "100%" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                width: "100%",
              }}
            >
              <View></View>
              <View>
                <TouchableOpacity
                  onPress={() => refRBSheet.current.close()}
                  style={{ padding: 10, left: 10 }}
                >
                  <Icon icon="up" style={{ transform: [{ rotate: "180deg" }] }} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                campicker()
              }}
              style={{
                width: 230,
                height: 55,
                borderRadius: 40,
                alignSelf: "center",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text text="Camera" style={{ color: "#182848", fontWeight: "bold", fontSize: 18 }} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                imagepicker()
              }}
              style={{
                width: 230,
                height: 55,
                borderRadius: 40,
                alignSelf: "center",
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text text="Gallery" style={{ color: "#182848", fontWeight: "bold", fontSize: 18 }} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </RBSheet>
    </Screen>
  )
})
