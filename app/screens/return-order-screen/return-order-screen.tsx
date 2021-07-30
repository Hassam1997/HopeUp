import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Image, TextInput } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import LinearGradient from "react-native-linear-gradient"
import ImagePicker from "react-native-image-crop-picker"
import { SliderBox } from "react-native-image-slider-box"
import CheckBox from "@react-native-community/checkbox"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const buttongradient: ViewStyle = {
  backgroundColor: "#113394",
  width: 180,
  height: 40,
  borderRadius: 10,
  justifyContent: "center",
  top: 60,
  right: 10,
  flexDirection: "row",
}

export const ReturnOrderScreen = observer(function ReturnOrderScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [description, setDescription] = useState("")
  const [isImage, isSetImage] = useState([])
  const [Placeholder, setMyFeatured] = useState([require("../../../assets/PlayStore.png")])

  const imagepicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      height: 250,
      width: wp("100%"),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    }).then((images) => {
      const result = []
      for (const i of images) {
        console.log("received image", i)
        result.push({
          uri: i.path,
          width: i.width,
          height: i.height,
          mime: i.mime,
        })
      }
      isSetImage(result)
    })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="RETURN ORDERS"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <TouchableOpacity
        onPress={() => {
          imagepicker()
        }}
      >
        <SliderBox
          images={isImage.length < 0 ? isImage : Placeholder}
          sliderBoxHeight={250}
          onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
          autoplay
          circleLoop
          resizeMode={"cover"}
          ImageComponentStyle={{
            width: wp("100%"),
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          text="Return Description"
          style={{
            color: "#3F64A4",
            fontSize: 15,
            fontWeight: "bold",
            marginTop: 15,
            left: 10,
          }}
        />
        <View>
          <TextInput
            placeholder="Why you Return"
            style={{
              textAlignVertical: "top",
              backgroundColor: "white",
              elevation: 10,
              borderRadius: 20,
              height: 180,
              shadowColor: "#C5C5C5",
              shadowOffset: {
                width: 0,
                height: 10,
              },
              shadowOpacity: 0.5,
              shadowRadius: 12,
              justifyContent: "center",
              top: 5,
              alignSelf: "center",
              width: wp("92%"),
              paddingLeft: 10,
            }}
            multiline={true}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            top: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("terms")
            }}
          >
            <Text
              style={{
                fontSize: 15,
                paddingLeft: 20,
                color: "black",
              }}
            >
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
            tintColors={{
              true: "black",
            }}
          />
        </View>
        <View
          style={{
            width: wp("100%"),
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("terms")
            }}
          >
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              colors={["#4B6CB7", "#182848"]}
              style={buttongradient}
            >
              <Image
                source={require("../../components/icon/icons/heart-red.png")}
                resizeMode="cover"
                style={{
                  width: 20,
                  alignSelf: "center",
                  height: 18,
                  right: 5,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  padding: 10,
                  color: "white",
                  textAlign: "center",
                  left: 10,
                }}
              >
                Initiate a Return
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})
