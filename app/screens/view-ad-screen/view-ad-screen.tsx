import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, TouchableOpacity } from "react-native"
import { Header, Screen, Text, Icon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { SliderBox } from "react-native-image-slider-box"
import FastImage from "react-native-fast-image"

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useStores } from "../../models"
import { color } from "../../theme"
import axios from "axios"

const ROOT: ViewStyle = {
  backgroundColor: "#EFEFEF",
  flex: 1,
}

export const ViewAdScreen = observer(function ViewAdScreen({ route }) {
  // Pull in one of our MST stores
  const { user, classifieds, products } = useStores()
  // OR
  // const rootStore = useStores()
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [User, setUser] = useState({})
  const [likeStatus, setStatus] = useState(false)
  const [likes, setLikes] = useState([])

  useEffect(() => {
    console.log(route, "RPA")
    const { item } = route.params.data
    setImages(item.images)
    setDescription(item.description)
    setTitle(item.title)
    setUser(item.user_id)
  }, [route])

  const likeAD = async (adv_id: any) => {
    setStatus(!likeStatus)
    let adv = {
      user_id: user.user_id,
      adv_id: adv_id,
      tokken: user.token,
      favourite_type: "advertise",
    }
    await classifieds.createFavourite(adv)
    axios.put(`http://3.14.145.118:4000/api/adv/like/${adv_id}`, {
      likes: [user.user_id]
    }).then(async (res) => {
      console.log(res)
      setLikes(res.data)
      await products.getMyFavourites(user.user_id)
    })
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="ADs"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View>
        <SliderBox
          ImageComponent={FastImage}
          images={images}
          sliderBoxHeight={200}
          onCurrentImagePressed={(index: any) => console.warn(`image ${index} pressed`)}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={"resize"}
          resizeMode={"cover"}
          paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: "rgba(128, 128, 128, 0.92)",
          }}
          ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
          imageLoadingColor="#2196F3"
        />
      </View>
      <View
        style={{
          width: wp("100%"),
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: wp("90%"),
          }}
        >
          <Text
            style={{
              fontSize: 12,
              paddingRight: 5,
              color: "#7F7F7F",
            }}
          >
            {`#${route.params.data.item.state}` +
              " " +
              `#${route.params.data.item.city}` +
              " " +
              `#${route.params.data.item.category}` +
              " " +
              `#${route.params.data.item.sub_category}`}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            width: wp("90%"),
            paddingTop: 10,
            paddingBottom: 10,
            color: "#3F64A4",
          }}
        >
          {title}
        </Text>

      </View>
      <TouchableOpacity
        onPress={() => likeAD(route.params.data.item._id)}
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 20, justifyContent: 'flex-start', alignSelf:'flex-start' }}
      >
        <Icon icon={likes.includes(user.user_id) ? "favouriter" : "like"} />
        <Text text={likes.length ? likes.length.toString() + " " + "Likes" : "0 Likes"} style={{ color: "#7F7F7F", left: 10 }} />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: User.profile_picture }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
            resizeMode="cover"
          />
          <Text
            text={User.first_name + " " + User.last_name}
            style={{ color: "black", left: 10 }}
          />
        </View>
        {
          user.user_id === route.params.data.item.user_id._id ?
            null :
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("chat", {
                  sender_id: route.params.data.item.user_id._id,
                  avatar: route.params.data.item.user_id.profile_picture,
                  username: route.params.data.item.user_id.username,
                })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                elevation: 10,
                height: 40,
                width: 100,
                padding: 10,
                borderRadius: 20,
              }}
            >
              <Icon icon="chatBubble" />
              <Text text="Chat" style={{ color: "black", left: 10 }} />
            </TouchableOpacity>
        }
      </View>
      <View
        style={{
          flex: 1,
          width: wp("90%"),
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "normal",
            color: "#000000",
          }}
        >
          Description
        </Text>
        <View style={{ flexDirection: "row", alignItems: "flex-start", padding: 10, width: "90%" }}>
          <Text text={"\u2B24"} style={{ color: "black" }} />
          <Text
            text={description}
            style={{ color: "#000000", left: 10, textAlign: "justify", fontSize: 12 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: wp("82%"),
            alignSelf: "center",
          }}
        >
          <Image
            source={require("../../components/icon/icons/chevron-down.png")}
            style={{ height: 20 }}
            resizeMode="contain"
          />
          <Text
            style={{
              color: "#3F64A4",
            }}
          >
            see more
          </Text>
        </View>
      </View>
    </Screen>
  )
})
