import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, TouchableOpacity, ScrollView, Platform, Alert } from "react-native"
import { Header, Screen, SearchBar, Text } from "../../components"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SliderBox } from "react-native-image-slider-box"
import FastImage from "react-native-fast-image"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Contribute from "../../../assets/Contribute.svg"
import Orders from "../../../assets/orders.svg"
import BuynSell from "../../../assets/buynsell.svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
  const { products, Videos } = useStores()
  // OR
  // const rootStore = useStores()
  const [myFeatured, setMyFeatured] = useState([
    "https://source.unsplash.com/1024x768/?nature",
    "https://source.unsplash.com/1024x768/?water",
    "https://source.unsplash.com/1024x768/?girl",
    "https://source.unsplash.com/1024x768/?tree",
  ])

  const [keyword, setKeyword] = useState("")

  useEffect(() => {
    products.getAllProduct()
    Videos.getAllVideos()
  }, [])

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <Header
        leftIcon={"menu"}
        headerText="HOME"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
        onLeftPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <ScrollView>
        {myFeatured.length > 0 ? (
          <View>
            <SliderBox
              ImageComponent={FastImage}
              images={myFeatured}
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
        ) : (
          <View
            style={{ width: "100%", height: 170, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              text="No Featured Data"
              style={{ color: "black", fontSize: 24, fontWeight: "bold", letterSpacing: 1.2 }}
            />
          </View>
        )}
        <View style={{ padding: 10 }}>
          <Text
            text="My Featured"
            style={{
              color: "#010101",
              fontSize: 18,
              fontWeight: "bold",
              textShadowColor: "#7f7f7f",
              textShadowOffset: { width: 3, height: 2 },
              textShadowRadius: 4,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            width: "95%",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("myProduct")}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Image source={require("../../../assets/my-product.png")} />
            <Text text="My Product" style={{ color: "#000000", fontSize: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("myVideos")}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Image source={require("../../../assets/my-video.png")} />
            <Text text="My Videos" style={{ color: "#000000", fontSize: 12 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("myAds")}
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Image source={require("../../../assets/my-advertisement.png")} />
            <Text text="My Ads" style={{ color: "#000000", fontSize: 12 }} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("orders")} style={{ margin: 10 }}>
            {/* <Image source={require('../../../assets/Orders.png')} resizeMode={'contain'} style={{ width: '100%', height: 150 }} /> */}
            <Orders width={wp("95%")} height={hp("20%")} />
            <View
              style={{
                position: "absolute",
                bottom: 3,
                backgroundColor: "rgba(0,0,0,0.4)",
                width: Platform.OS === "android" ? wp("95%") : wp("92%"),
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                height: 50,
                justifyContent: "center",
                padding: 10,
                alignSelf: "center",
                left: 0,
              }}
            >
              <Text text="Orders" style={{ color: "#CCE3DE", fontSize: 18, fontWeight: "600" }} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("buynsell")} style={{ margin: 10 }}>
            {/* <Image source={require('../../../assets/BuyingSelling.png')} resizeMode={'contain'} style={{ width: '100%', height: 150 }} /> */}
            <BuynSell width={wp("95%")} height={hp("20%")} />
            <View
              style={{
                position: "absolute",
                bottom: 3,
                backgroundColor: "rgba(0,0,0,0.4)",
                width: Platform.OS === "android" ? wp("95%") : wp("92%"),
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                height: 50,
                justifyContent: "center",
                padding: 10,
                alignSelf: "center",
                left: 0,
              }}
            >
              <Text
                text="Buying and Selling"
                style={{ color: "#F3DB7A", fontSize: 18, fontWeight: "600" }}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("contribute")}
            style={{ margin: 10 }}
          >
            {/* <Image source={require('../../../assets/Contribute.png')} resizeMode={'contain'} style={{ width: '100%', height: 150 }} /> */}
            <Contribute width={wp("95%")} height={hp("20%")} />
            <View
              style={{
                position: "absolute",
                bottom: 3,
                backgroundColor: "rgba(0,0,0,0.4)",
                width: Platform.OS === "android" ? wp("95%") : wp("92%"),
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                height: 50,
                justifyContent: "center",
                padding: 10,
                alignSelf: "center",
                left: 0,
              }}
            >
              <Text
                text="Contribute"
                style={{ color: "#C6EA8D", fontSize: 18, fontWeight: "600" }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ width: "100%", height: "8%" }} />
    </Screen>
  )
})
