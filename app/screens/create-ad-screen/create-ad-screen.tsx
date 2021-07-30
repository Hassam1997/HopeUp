import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, View, TouchableOpacity } from "react-native"
import { AdForm, Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useStores } from "../../models"
import { color } from "../../theme"
import ImagePicker from "react-native-image-crop-picker"
import { SliderBox } from "react-native-image-slider-box"
import axios from "axios"

const ROOT: ViewStyle = {
  backgroundColor: "#C5C5C5",
  flex: 1,
}

export const CreateAdScreen = observer(function CreateAdScreen({ route }) {
  // Pull in one of our MST stores
  const { classifieds, user } = useStores()
  // OR
  // const rootStore = useStores()
  const [isImage, isSetImage] = useState([])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState([])
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
            console.log(route, res.data, "PP")
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

  const uploadAd = async () => {
    let params = route.params.data
    let data = {
      tokken: user.token,
      userId: user.user_id,
      category: params.category,
      City: params.city,
      State: params.state,
      images: isImage,
      price: price,
      title: title,
      description: description,
      sub_category: params.sub_category,
    }
    const link = await classifieds.uploadAd(data)
    console.log(link, "L")
    navigation.navigate("paynowscreen", { adv_id: link.data.adv_id })
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header onLeftPress={() => navigation.goBack()} leftIcon="back" headerText="CREATE AD" />
      <View
        style={{
          height: 250,
        }}
      >
        <TouchableOpacity
          onPress={() => imagepicker()}
          style={{
            width: wp("100%"),
            alignItems: "center",
          }}
        >
          <SliderBox
            images={isImage.length > 0 ? isImage : [require("../../../assets/placeholder.png")]}
            sliderBoxHeight={250}
            onCurrentImagePressed={() => imagepicker()}
            autoplay
            circleLoop
            resizeMode="cover"
            ImageComponentStyle={{
              width: wp("100%"),
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          width: wp("100%"),
          alignItems: "center",
          justifyContent: "flex-start",
          bottom: 39,
        }}
      >
        <AdForm
          description={description}
          setDescription={(e: any) => setDescription(e)}
          title={title}
          setTitle={setTitle}
          uploadAd={() => uploadAd()}
          price={price}
          setPrice={setPrice}
          tags={tags}
          setTags={(e: any) => setTags(e)}
          btnTxt={"Create Ad"}
        />
      </View>
    </Screen>
  )
})
