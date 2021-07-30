import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Image, ScrollView, View, ViewStyle, TextInput, TextStyle, Alert } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SliderBox } from "react-native-image-slider-box"
import ImagePicker from "react-native-image-crop-picker"
import ReactChipsInput from "react-native-chips"
import axios from "axios"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const heading: TextStyle = {
  color: "#49669E",
  fontSize: 15,
  fontWeight: "bold",
}

const input: ViewStyle = {
  width: "95%",
  backgroundColor: "white",
  elevation: 10,
  borderRadius: 30,
  marginVertical: 10,
  height: 55,
}

export const SellProductScreen = observer(function SellProductScreen() {
  // Pull in one of our MST stores
  const { products, user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook

  const [myFeatured, setMyFeatured] = useState([])
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [details, setDetails] = useState("")
  const [weight, setWeight] = useState("")
  const [price, setPrice] = useState(0)
  const [tags, setTags] = useState([])
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [zipcode, setZipcode] = useState(0)
  const formData = new FormData()

  const navigation = useNavigation()

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
            console.log(res)
            setMyFeatured(res.data)
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

  const uploadproduct = async () => {

    if (tags && tags.length) {
      let Tag = []
      for (var i = 0; i < tags.length; i++) {
        Tag.push(tags[i])
        formData.append("tags[]", Tag)
      }
    }

    let product = {
      images: myFeatured,
      title: title,
      weight: weight,
      price: price,
      details: details,
      description: description,
      user_id: user.user_id,
      tags: tags,
      tokken: user.token,
      line1: address,
      state: state,
      postal_code: zipcode.toString(),
      city: city
    }
    const response = await products.uploadProduct(product)
    if (response.status === 200) {
      setMyFeatured([])
      setTitle("")
      setDescription("")
      setPrice(0)
      setWeight("")
      setTags([])
      setDetails("")
      setAddress("")
      setCity("")
      setState("")
      setZipcode(0)
      Alert.alert("Successfully Uploaded", "Tap ok to see your product in Hope Up Store", [
        {
          text: "cancel",
          style: "destructive",
        },
        {
          text: "Ok",
          style: "default",
          onPress: () => updateStore()
        },
      ])
    } else {
      setMyFeatured([])
      setTitle("")
      setDescription("")
      setPrice(0)
      setWeight("")
      setTags([])
      setDetails("")
      setAddress("")
      setCity("")
      setState("")
      setZipcode(0)
      Alert.alert("Error", `${response.data.message}`)
    }
  }

  async function updateStore() {
    await products.getAllProduct()
    navigation.navigate("home", { screen: "store" })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText="Sell Product"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <ScrollView>
        {/* <Image source={require('../../../assets/placeholder.png')} resizeMode='contain' style={{ width: '100%', bottom: 16 }} /> */}
        <TouchableOpacity
          onPress={() => {
            imagepicker()
          }}
        >
          <SliderBox
            images={
              myFeatured.length > 0 ? myFeatured : [require("../../../assets/placeholder.png")]
            }
            sliderBoxHeight={200}
            // onCurrentImagePressed={(index) => console.warn(`image ${index} pressed`)}
            autoplay
            circleLoop
            resizeMode={"cover"}
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
              width: wp("100%"),
              height: 200,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          />
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
          <View style={{ padding: 10 }}>
            <Text text="Details" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Details"
                value={details}
                onChangeText={(e: any) => setDetails(e)}
              />
            </View>
          </View>
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
            <Text text="Address" style={heading} />
            <View style={[input, { height: 100 }]}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                multiline={true}
                numberOfLines={5}
                placeholder="6406 Ivy Lane"
                value={address}
                onChangeText={(e: any) => setAddress(e)}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="State" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="MD"
                value={state}
                onChangeText={(e: any) => { setState(e) }}
                maxLength={2}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="City" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Greenbelt"
                value={city}
                onChangeText={(e: any) => setCity(e)}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Postal Code" style={heading} />
            <View style={input}>
              <TextInput
                style={{ width: "90%", alignSelf: "center" }}
                placeholder="Destination 5-digit ZIP Code(20770)."
                keyboardType="numeric"
                value={zipcode.toString()}
                onChangeText={(e: any) => setZipcode(e)}
                maxLength={5}
              />
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text text="Tags" style={heading} />
            <View style={{ width: wp("90%"), alignSelf: "center" }}>
              <ReactChipsInput
                label="Tags"
                initialChips={tags}
                onChangeChips={(chips: any) => setTags(chips)}
                alertRequired={true}
                chipStyle={{ borderColor: "blue", backgroundColor: "grey" }}
                inputStyle={{ fontSize: 16 }}
                labelStyle={{
                  color: "#707070",
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#000000",
                  width: wp("80%"),
                  alignSelf: "center",
                }}
                labelOnBlur={{ color: "#666" }}
              />
            </View>
            {/* <View
              style={[
                input,
                { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
              ]}
            >
              <TextInput
                style={{ width: "70%", alignSelf: "center", left: 15 }}
                placeholder="Tags"
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
            </View> */}
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
                uploadproduct()
              }}
              style={{ padding: 10 }}
            >
              <Text text="Post" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={{ height: 50, width: "100%" }} />
      </ScrollView>
    </Screen>
  )
})
