import React, { useEffect, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Image, Modal, Dimensions, Platform } from "react-native"
import { Screen, Text, Header, Icon, SearchBar } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SwipeListView } from "react-native-swipe-list-view"
import LinearGradient from "react-native-linear-gradient"
import date from 'date-and-time'

const { height: viewportHeight, width: viewportWidth } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const rowFront: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  margin: 10,
  height: 250,
  // elevation: 10,
  borderRadius: 20,
}

const rowBack: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  margin: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 200,
  borderRadius: 10,
  alignSelf: "flex-end",
  padding: 10,
}

const filterMain: ViewStyle = {
  width: viewportWidth,
  alignSelf: "center",
  height: viewportHeight,
  padding: 10,
  borderRadius: 10,
  elevation: 5,
  backgroundColor: "rgba(0,0,0,0.5)",
}
const filterSub: ViewStyle = {
  height: 150,
  padding: 10,
  backgroundColor: "white",
  width: "88%",
  alignSelf: "center",
  elevation: 10,
  borderRadius: 10,
  marginTop: Platform.OS == "ios" ? 240 : 250,
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

export const MyAdsScreen = observer(function MyAdsScreen() {
  // Pull in one of our MST stores
  const { classifieds, user } = useStores()
  // OR
  // const rootStore = useStores()

  const [keyword, setKeyword] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [adData, setData] = useState([])
  const [isLike, isSetLike] = useState(true)
  const [isProductId, isSetProductId] = useState("")
  const [adv_id, setAdvId] = useState("")
  const [isAd, isSetAd] = useState([])

  useEffect(() => {
    getData()
    async function getData() {
      const myClassifiedData = await classifieds.getMyClassifieds(user.user_id)
      console.log(myClassifiedData, "GMC")
      setData(myClassifiedData.data)
    }
  }, [])

  const openRowRef = useRef(null)

  const closeOpenRow = () => {
    console.log(openRowRef)
    if (openRowRef.current && openRowRef.current.closeRow) {
      openRowRef.current.closeRow()
    }
  }

  const onRowDidOpen = (rowKey: any, rowMap: any) => {
    console.log(rowKey, rowMap)
    openRowRef.current = rowMap[rowKey]
  }

  const createfavourite = (adv_id: any) => {
    isSetLike(!isLike)
    isSetProductId(adv_id)
    if (isLike === true) {
      let product = {
        user_id: user.user_id,
        adv_id: adv_id,
        tokken: user.token,
        favourite_type: "advertise",
      }
      classifieds.createFavourite(product)
      console.log("ad", product)
    }
  }

  const deleteVideoModal = (adv_id: any) => {
    setAdvId(adv_id)
    setDeleteModal(true)
  }

  const deleteVideo = () => {
    closeOpenRow()
    setDeleteModal(false)
    let arr = [];
    adData.forEach(element => {
      if (element._id === adv_id) return
      arr.push(element)
    })
    setData(arr)
    classifieds.deleteAdv(adv_id, user.token)
    classifieds.getMyClassifieds(user.user_id)
    if (adData.length > 0) {
      getData()
      async function getData() {
        const myClassifiedData = await classifieds.getMyClassifieds(user.user_id)
        console.log(myClassifiedData, "GMC")
        setData(myClassifiedData.data)
      }
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation()

  function renderAds(data: any) {
    const _date = new Date(data.item.createdAt)
    return (
      <View key={data.item._id.toString()} style={{ padding: 10 }}>
        <Text
          text={data.item.title}
          style={{ color: "#182848", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
        />
        <View style={rowFront}>
          <Image
            source={data.item.images.length > 0 ? { uri: data.item.images[0] } : require('../../../assets/placehole.png')}
            resizeMode="contain"
            style={{ height: 250, width: "100%" }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: user.myProfile.profile_picture }}
              resizeMode="cover"
              style={{ left: 10, height: 40, width: 40, borderRadius: 20 }}
            />
            <View style={{ left: 20 }}>
              <Text
                text={`${user.myProfile.first_name}` + " " + `${user.myProfile.last_name}`}
                style={{ color: "#182848" }}
              />
              <Text
                 text={date.format(_date, "ddd, MMM DD YYYY")}
                style={{ color: "#585858", fontSize: 12 }}
              />
            </View>
          </View>
          {/* <View style={{ flexDirection: "row", right: 20 }}>
            <TouchableOpacity key={data.item._id} onPress={() => createfavourite(data.item._id)}>
              <Image
                source={
                  isLike
                    ? require("../../components/icon/icons/heart.png")
                    : require("../../components/icon/icons/heart-red.png")
                }
                resizeMode="cover"
                style={{
                  width: 20,
                  alignSelf: "center",
                  height: 18,
                }}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    )
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="MY ADs"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <SearchBar keyword={keyword} setKeyword={(e: any) => setKeyword(e)} />
      <SwipeListView
        data={adData}
        renderItem={(data) => renderAds(data)}
        closeOnRowPress={true}
        onRowDidOpen={onRowDidOpen}
        ListEmptyComponent={
          <View
            style={{
              height: "100%",
              width: "100%",
              padding: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "700",
                fontStyle: "normal",
                lineHeight: 30,
                letterSpacing: 1.2,
                textAlign: "center",
              }}
              text="You have not uploaded any ads."
            />
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              colors={["#4B6CB7", "#182848"]}
              style={gradient}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("home", { screen: "create" })}
                style={{ padding: 10, borderRadius: 10 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: 30,
                    letterSpacing: 1.2,
                  }}
                  text="Want to post an ad?"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
        renderHiddenItem={(data, rowMap) => {
          console.log(data, "DATA", rowMap)
          return (
            <View style={rowBack}>
              <View
                style={{ flexDirection: "row", alignItems: "center", height: 100, marginRight: 10 }}
              >
                <TouchableOpacity
                  onPress={() => {
                    closeOpenRow(), navigation.navigate("editAd", { data: data.item })
                  }}
                  style={{
                    backgroundColor: "#009D0A",
                    padding: 10,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Icon icon="edit" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteVideoModal(data.item._id)}
                  style={{
                    backgroundColor: "#DC1635",
                    padding: 10,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    borderRadius: 10,
                  }}
                >
                  <Icon icon="delete" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
        // leftOpenValue={120}
        rightOpenValue={-180}
      />
      <Modal visible={deleteModal} transparent={true} animationType={"slide"}>
        <View style={filterMain}>
          <View style={filterSub}>
            <View>
              <Text
                text="Are You Sure You Want To Delete This Ad?"
                style={{ color: "#010101", textAlign: "center" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setDeleteModal(false)}
                  style={{
                    backgroundColor: "#C5C5C5",
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text text="Cancel" />
                </TouchableOpacity>
                <LinearGradient
                  start={{ x: 0.5, y: 0.0 }}
                  end={{ x: 0.5, y: 1.0 }}
                  locations={[0, 0.5, 0.6]}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  colors={["#4B6CB7", "#182848"]}
                >
                  <TouchableOpacity onPress={() => deleteVideo()}>
                    <Text text="Delete" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  )
})
