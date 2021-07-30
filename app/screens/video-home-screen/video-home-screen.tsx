import React, { useEffect, useState, useCallback } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  FlatList,
  RefreshControl,
  ToastAndroid,
  TouchableOpacity,
} from "react-native"
import { Header, ListVideoItem, Screen, SearchBar, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { VideoData } from "../chat-screen/dummyData"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
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

export const VideoHomeScreen = observer(function VideoHomeScreen() {
  // Pull in one of our MST stores
  const { Videos } = useStores()
  // OR
  // const rootStore = useStores()

  useEffect(() => {
    if (Videos.data.length > 0) {
      console.log(Videos.data,"WEED")
      // let arr = []
      // Videos.data.forEach((video: any) => {
      //   console.log(video)
      //   createThumbnail({
      //     url: video.video,
      //     timeStamp: 10000,
      //   })
      //     .then(response => {
      //       video.thumbnail = response
      //       arr.push(video)
      //     })
      //     .catch(err => console.log({ err }));
      // })
      setVideos(Videos.data)
    }
  }, [])

  const apiResponse = () => {
    if (keyword != "") {
      Videos.searchVideo(keyword)
      isSetFlag(Videos.searchBar)
      console.log("array", isFlag.length)
    } else {
      isSetFlag([])
      console.log("array2", isFlag.length)
    }
  }

  const [keyword, setKeyword] = useState("")
  const [videos, setVideos] = useState([])
  const [isFlag, isSetFlag] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  function renderVideo(data: any) {
    return <ListVideoItem key={data.id} data={data} screen={"viewVideo"} />
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await Videos.getAllVideos()
    if (Videos.data.length > videos.length) {
      try {
        setVideos(Videos.data)
        setRefreshing(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        setVideos(Videos.data)
        setRefreshing(false)
      } catch (error) {
        console.log(error)
      }
      ToastAndroid.show("No more new Videos available", ToastAndroid.SHORT)
      setRefreshing(false)
    }
  }, [refreshing])

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.navigate("home", { screen: "home" })}
        headerText="Videos"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <SearchBar
        keyword={keyword}
        setKeyword={(e: any) => setKeyword(e)}
        ApiResponse={apiResponse}
        setFlag={(e: any) => isSetFlag(e)}
      />
      <FlatList
        data={isFlag.length > 0 ? isFlag : videos}
        keyExtractor={(_item, index) => `message ${index}`}
        renderItem={({ item }) => renderVideo(item)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={<View style={{ height: 100 }} />}
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
      />
    </Screen>
  )
})
