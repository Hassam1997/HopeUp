import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, View, ViewStyle, TextInput, TextStyle, Alert } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import ImagePicker from "react-native-image-crop-picker"
import { SliderBox } from "react-native-image-slider-box"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import ReactChipsInput from "react-native-chips"
import axios from "axios"
import { setTags } from "@sentry/react-native"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const input: ViewStyle = {
  width: "96%",
  backgroundColor: "white",
  elevation: 10,
  borderRadius: 30,
  margin: 10,
  height: 55,
  shadowColor: "#C5C5C5",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  justifyContent: "center",
}
const heading: TextStyle = {
  color: "#49669E",
  fontSize: 15,
  fontWeight: "bold",
}

export const EditProductScreen = observer(function EditProductScreen({ route }) {
  // Pull in one of our MST stores
  const { products, user } = useStores()
  // OR
  // const rootStore = useStores()
  //const [image, setImage] = useState([]);
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")
  const [description, setDescription] = useState("")
  const [weight, setWeight] = useState("")
  const [price, setPrice] = useState(0)
  const [isImage, isSetImage] = useState([])
  const [isTags, isSetTags] = useState([])
  const formData = new FormData()

  const imagepicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      height: 250,
      width: wp("100%"),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    })
      .then((images) => {
        for (var i = 0; i < images.length; i++) {
          formData.append(
            // `${Date.now()} + Image${i}.jpg`,
            "images",
            {
              name: `${Date.now()} + Image${i}.jpg`,
              type: images[i].mime,
              uri: images[i].path,
            },
          )
        }
        console.log(formData, "FD")
        axios
          .post("http://3.14.145.118:4000/api/image/uploadImage", formData)
          .then((res) => {
            isSetImage(res.data)
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
      .catch((err) => {
        if (err.request) {
          console.log(err.request, "req")
        } else if (err.response) {
          console.log(err.response, "response")
        } else {
          console.log(err, "error")
        }
      })
  }

  useEffect(() => {
    let { data } = route.params
    console.log(data, "EP")
    getProduct()
    async function getProduct() {
      const response = await products.getSpecificProduct(data._id)
      console.log(response.data, "data")
      isSetImage(response.data[0].images)
      setTitle(response.data[0].title)
      setDetails(response.data[0].details)
      setDescription(response.data[0].description)
      setWeight(response.data[0].weight)
      setPrice(response.data[0].price)
      const TAGS = []
      data.tags.forEach((element) => {
        TAGS.push({
          tag: element.tag,
        })
      })
      isSetTags(TAGS)
    }
  }, [route])

  const editproduct = async () => {
    let product = {
      images: isImage,
      title: title,
      weight: weight,
      price: price,
      description: description,
      user_id: user.user_id,
      id: route.params.data._id,
      tokken: user.token,
    }
    // console.log("product",myFeatured)
    await products.editProduct(product)
    Alert.alert("Successfully Edited", "Tap ok to see your product in Hope Up Store", [
      {
        text: "cancel",
        style: "destructive",
      },
      {
        text: "Ok",
        style: "default",
        onPress: () => initialState(),
      },
    ])
  }

  const initialState = () => {
    navigation.navigate("home", { screen: "store" })
    isSetImage([]),
      setTitle(" "),
      setDetails(" "),
      setDescription(""),
      setWeight(""),
      setPrice(0),
      isSetTags([])
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  // {
  //   console.log("hassam",)
  // }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText="Edit Product"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <ScrollView>
        <TouchableOpacity
          style={{ height: 200, width: wp("90%"), alignSelf: "center" }}
          onPress={() => {
            imagepicker()
          }}
        >
          {isImage.length > 0 ? (
            <SliderBox
              images={isImage}
              sliderBoxHeight={200}
              autoplay
              circleLoop
              resizeMode={"stretch"}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)",
              }}
              ImageComponentStyle={{
                width: 400,
                bottom: isImage.length > 0 ? 16 : -16,
                height: 200,
                top: 10,
              }}
            />
          ) : (
            <Image
              source={require("../../../assets/PlayStore.png")}
              resizeMode="stretch"
              style={{ height: 200, width: 400 }}
            />
          )}
        </TouchableOpacity>
        <View style={{ padding: 10 }}>
          <View style={{ padding: 10 }}>
            <Text text="Title" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Title"
                value={title}
                onChangeText={(e: any) => setTitle(e)}
              />
            </View>
          </View>
          {/* <View style={{ padding: 10 }}>
            <Text text="Details" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Details"
                value={details}
                onChangeText={(e: any) => setDetails(e)}
              />
            </View>
          </View> */}
          <View style={{ padding: 10 }}>
            <Text text="Description" style={heading} />
            <View style={[input, { height: 100 }]}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                multiline={true}
                numberOfLines={5}
                placeholder="Description"
                value={description}
                onChangeText={(e: any) => setDescription(e)}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Weight" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Weight in lbs"
                keyboardType="numeric"
                value={weight}
                onChangeText={(e: any) => setWeight(e)}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Price" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Price in USD"
                keyboardType="numeric"
                value={price.toString()}
                onChangeText={(e: any) => setPrice(e)}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Tags" style={heading} />
            <View
              style={[
                input,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingLeft: 12,
                  height: 60,
                },
              ]}
            >
              <ReactChipsInput
                label="Tags"
                onChangeChips={(chips: any) => isSetTags(chips)}
                alertRequired={true}
                chipStyle={{ borderColor: "blue", backgroundColor: "grey" }}
                inputStyle={{ fontSize: 16 }}
                labelStyle={{
                  color: "#707070",
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#000000",
                  width: wp("70%"),
                }}
                labelOnBlur={{ color: "#666" }}
              />

              <LinearGradient
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.5]}
                style={{
                  height: 60,
                  borderTopRightRadius: 30,
                  borderBottomRightRadius: 30,
                  width: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                colors={["#4B6CB7", "#182848"]}
              >
                <TouchableOpacity style={{ padding: 10 }}>
                  <Text text="ADD" style={{ fontWeight: "bold" }} />
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
              {isTags.length > 0 ? (
                <>
                  {isTags.map((item) => {
                    console.log(item)
                    return (
                      <View
                        style={{
                          backgroundColor: "grey",
                          marginHorizontal: 5,
                          paddingVertical: 5,
                          borderRadius: 20,
                          paddingHorizontal: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: "white",
                          }}
                        >
                          {item.tag}
                        </Text>
                      </View>
                    )
                  })}
                </>
              ) : null}
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            padding: 10,
          }}
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5]}
            style={{
              height: 45,
              width: 130,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
            colors={["#4B6CB7", "#182848"]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }}>
              <Text text="Cancel" />
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5]}
            style={{
              height: 45,
              width: 130,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
            }}
            colors={["#4B6CB7", "#182848"]}
          >
            <TouchableOpacity
              onPress={() => {
                editproduct()
              }}
              style={{ padding: 10 }}
            >
              <Text text="Update" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{ height: 50, width: "100%" }} />
      </ScrollView>
    </Screen>
  )
})
