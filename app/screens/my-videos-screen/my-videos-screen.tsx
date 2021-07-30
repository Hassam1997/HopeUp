import React, { useState, useEffect, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
  RefreshControl,
  ToastAndroid,
} from "react-native"
import { Header, Icon, ListVideoItem, Screen, Text, SearchBar } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SwipeListView } from "react-native-swipe-list-view"
import LinearGradient from "react-native-linear-gradient"
import { VideoData } from "../chat-screen/dummyData"
import { Item } from "react-native-paper/lib/typescript/components/List/List"

const { height: viewportHeight, width: viewportWidth } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const rowFront: ViewStyle = {
  backgroundColor: "white",
  margin: 10,
  padding: 10,
  height: 200,
  elevation: 10,
}

const rowBack: ViewStyle = {
  backgroundColor: "white",
  margin: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 100,
  borderRadius: 10,
  alignSelf: "flex-end",
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
}

export const MyVideosScreen = observer(function MyVideosScreen() {
  // Pull in one of our MST stores
  const { Videos, user } = useStores()
  // OR
  // const rootStore = useStores()import React, { useState } from "react"

  const [keyword, setKeyword] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [isVideo, isSetVideo] = useState([])
  const [video_id, setVideoId] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    console.log("run")
    getVideo()
    async function getVideo() {
      await Videos.getMyVideo(user.user_id)
      if (Videos.videos.length > 0) {
        isSetVideo(Videos.videos)
      }
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

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Videos.getMyVideo(user.user_id)
    if (Videos.videos.length > isVideo.length) {
      try {
        isSetVideo(Videos.videos)
        setRefreshing(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      ToastAndroid.show("No more new Videos available", ToastAndroid.SHORT)
      setRefreshing(false)
    }
  }, [refreshing])

  const deleteVideoModal = (videoId: any) => {
    setVideoId(videoId)
    setDeleteModal(true)
  }

  const deleteVideo = () => {
    closeOpenRow()
    setDeleteModal(false)
    let arr = [];
    isVideo.forEach(element => {
      if (element._id === video_id) return
      arr.push(element)
    })
    isSetVideo(arr)
    Videos.deleteVideo(video_id, user.token)
    Videos.getMyVideo(user.user_id)
    if (Videos.videos.length > 0) {
      isSetVideo(Videos.videos)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  }

  function renderVideo(data: any) {
    return (
      <>
        <ListVideoItem key={data.id} data={data} screen={"editVideo"} />
      </>
    )
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="MY VIDEOS"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />

      <SearchBar keyword={keyword} setKeyword={(e: any) => setKeyword(e)} />
      <SwipeListView
        data={isVideo}
        style={{ marginBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        keyExtractor={(data, item) => data.id}
        closeOnRowPress={true}
        onRowDidOpen={onRowDidOpen}
        removeClippedSubviews={true}
        renderItem={(data, rowMap) => renderVideo(data.item)}
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
              text="There are currently no videos."
            />
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              colors={["#4B6CB7", "#182848"]}
              style={gradient}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("uploadVideo")}
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
                  text="Want to upload a video?"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
        renderHiddenItem={(data, rowMap) => {
          console.log(data, "DATA", rowMap)
          return (
            <View style={rowBack}>
              <View style={{ flexDirection: "row", alignItems: "center", height: 100 }}>
                <TouchableOpacity
                  onPress={() => {
                    closeOpenRow(), navigation.navigate("editVideo", { data: data.item })
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
        // leftOpenValue={180}
        rightOpenValue={-180}
        viewabilityConfig={viewabilityConfig}
      // ListFooterComponent={
      //   <TouchableOpacity>
      //     <Text style={{ padding: 30 }}>Load more</Text>
      //   </TouchableOpacity>
      // }
      />
      <Modal visible={deleteModal} transparent={true} animationType={"slide"}>
        <View style={filterMain}>
          <View style={filterSub}>
            <View>
              <Text
                text="Are You Sure You Want To Delete This Video?"
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
