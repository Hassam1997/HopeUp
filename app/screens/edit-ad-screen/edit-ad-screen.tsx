import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image } from "react-native"
import { Screen, Header, AdForm, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import ImagePicker from "react-native-image-crop-picker"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SliderBox } from "react-native-image-slider-box"
import axios from "axios"
import date from "date-and-time"
import MarqueeText from "react-native-marquee"

const ROOT: ViewStyle = {
  backgroundColor: "#C5C5C5",
  flex: 1,
}

export const EditAdScreen = observer(function EditAdScreen({ route }) {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [isImage, isSetImage] = useState([])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState([])
  const [expired, setExpired] = useState(false)
  const [mainDif, setExpiry] = useState(0)
  const [adv_id, setID] = useState("")

  useEffect(() => {
    const { data } = route.params
    console.log(data, "RDP")
    setID(data._id)
    setTitle(data.title)
    setDescription(data.description)
    setPrice(data.price?.toString())
    setExpired(data.expired)
    let arr = []
    data.tags.forEach((element: any) => {
      arr.push(element.tag)
    })
    setTags(arr)
    isSetImage(data.images)
    let creationDate = new Date(data.createdAt)
    let today = new Date()
    let diff = date.subtract(today, creationDate).toDays()
    let mainDif = 7 - diff
    setExpiry(mainDif)
  }, [route])

  const imagepicker = () => {
    ImagePicker.openPicker({
      multiple: true,
      height: 250,
      width: wp("100%"),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    })
      .then((images) => {
        const formData = new FormData()
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

  async function uploadAd() {
    //repost classified
    navigation.navigate("paynowscreen", { adv_id: adv_id })
  }

  async function editAd() {
    try {
      let obj = {
        title: title,
        description: description,
        city: route.params.data.city,
        state: route.params.data.state,
        price: route.params.data.price,
        user_id: user.user_id,
        images: isImage,
        tags: tags
      }
      const response = await axios.put(`http://3.14.145.118:4000/api/adv/${route.params.data._id}`, obj)
      console.log(response, "EDIT")
    } catch (err) {
      if (err.request) {
        console.log(err.request, "client never recieved a err response")
      } else if (err.response) {
        console.log(err.response, "client received an error response")
      } else {
        console.log(err, "syntax error")
      }
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      {/* <Header onLeftPress={() => navigation.goBack()} leftIcon="back" headerText="Edit AD" /> */}
      <View
        style={{
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            imagepicker()
          }}
          style={{
            width: wp("100%"),
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <SliderBox
            images={isImage.length > 0 ? isImage : require("../../../assets/placeholder.png")}
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
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          padding: 10,
          marginBottom: 30,
        }}
      >
        <MarqueeText
          style={{ fontSize: 24, color: "#49669E" }}
          duration={7000}
          marqueeOnStart
          loop={true}
          marqueeDelay={1500}
          marqueeResetDelay={1000}
          useNativeDriver={true}
        >
          {expired
            ? "This is an unpaid ad and will be deleted after 5 days. This ad is not shown in classifieds until paid for."
            : `This is paid ad and lasts till ${mainDif.toFixed(0)} days`}
        </MarqueeText>
      </View>
      <View
        style={{
          bottom: 10,
          alignSelf: "center",
        }}
      >
        <AdForm
          description={description}
          setDescription={(e: any) => setDescription(e)}
          title={title}
          setTitle={setTitle}
          uploadAd={() => expired ? uploadAd() : editAd()}
          price={price}
          setPrice={setPrice}
          tags={tags}
          setTags={(e: any) => setTags(e)}
          btnTxt={expired ? "Repost Ad" : "Edit Ad"}
        />
      </View>
    </Screen>
  )
})
