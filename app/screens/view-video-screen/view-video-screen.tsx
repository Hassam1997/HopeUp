import React, { useState, LegacyRef, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  Dimensions,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native"
import { Icon, Screen, Text, ReportProduct } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useIsFocused } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import Video from "react-native-video"
import axios from "axios"
import Flag from "../../../assets/flag-.svg"
import date from "date-and-time"

const { height: viewportHeight, width: viewportWidth } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const ViewVideoScreen = observer(function ViewVideoScreen({ route }) {
  // Pull in one of our MST stores
  const { user, Videos, products } = useStores()
  // OR
  // const rootStore = useStores()
  const [replyView, setReplyView] = useState(false)
  const [likes, setLikes] = useState([])
  const [dislikes, setDislikes] = useState(0)
  let videoRef: LegacyRef<Video> = useRef(null)
  const [paused, setPaused] = useState(true)
  const [loading, setLoading] = useState(false)
  const [icon, setIcon] = useState("play")
  const isFocused = useIsFocused()
  const [views, setViews] = useState([])
  const [likeStatus, setStatus] = useState(true)
  const [isShowModel, isSetModel] = useState(false)
  const [isvideoId, isSetVideoId] = useState("")
  const [keyword, setKeyword] = useState("")
  const [review, setReview] = useState([])
  const [reviewUser, setReviewUser] = useState([])
  const [showComment, setShowComment] = useState([])
  const [commentView, setView] = useState(showComment.length > 0 ? false : true)
  const [isUser, isSetUser] = useState([])

  console.log(route, "RR")

  useEffect(() => {
    isSetVideoId(route.params.data._id)

    const viewComment = async (video_id: any) => {
      let matchedItemsArray = []
      const videoData = await Videos.getSpecificVideo(video_id)
      console.log(videoData, "VD")
      setReview(videoData.data[0].reviews)
      setReviewUser(videoData.data[0].review_user)
      isSetUser(videoData.data[0].user)
      videoData.data[0].review_user.map((item: any) => {
        console.log(item, "IT")
        videoData.data[0].reviews.map((item1: any) => {
          if (item1.user_id === item._id) {
            matchedItemsArray.push({
              first_name: item.first_name,
              profile_picture: item.profile_picture,
              createdAt: item1.createdAt,
              review: item1.review,
            })
          }
        })
      })
      setShowComment(matchedItemsArray)
    }
    viewComment(route.params.data._id)

    if (showComment.length > 0) {
      commentView
    } else {
      setView(true)
    }
  }, [route])

  const hide = () => {
    isSetModel(false)
  }

  // const viewComment = async (video_id: any) => {
  //   const videoData = await Videos.getSpecificVideo(video_id)
  //   console.log("post",videoData)
  // }

  const commentVideo = async () => {
    let obj = {
      first_name: user.myProfile.first_name,
      profile_picture: user.myProfile.profile_picture,
      createdAt: new Date(),
      review: keyword,
    }

    setShowComment([...showComment, obj])

    let product = {
      tokken: user.token,
      video_id: isvideoId,
      user_id: user.user_id,
      review: keyword,
    }

    await Videos.videoComment(product)

    const videoData = await Videos.getSpecificVideo(isvideoId)

    let data = videoData.data[0]
    setKeyword("")
    setView(false)
    let matchedItemsArray = []
    if (data.reviews.length > 0 && data.review_user.length > 0) {
      data.review_user.map((item) => {
        data.reviews.map((item1) => {
          if (item1.user_id === item._id) {
            matchedItemsArray.push({
              first_name: item.first_name,
              profile_picture: item.profile_picture,
              createdAt: item1.createdAt,
              review: item1.review,
            })
            setShowComment(matchedItemsArray)
          }
        })
      })
    } else {
      setShowComment([])
    }
  }

  const pauseVideo = () => {
    console.log("run")
    setPaused(!paused)
    if (icon === "play") {
      setIcon("pause")
      setTimeout(() => {
        setIcon(null)
      }, 2000)
    } else {
      setIcon("play")
    }
  }

  const onEnd = (id: any) => {
    setPaused(true)
    viewVideo(user.user_id, id)
  }

  const onErrored = (err: any) => {
    if (err.request) {
      console.log(err.request, "request not sent")
    } else if (err.response) {
      console.log(err.response, "Request sent but not successfull")
    } else {
      console.log(err)
    }
  }

  const viewVideo = async (user_id: any, video_id: any) => {
    await axios
      .get(`http://3.14.145.118:4000/api/video/play/${video_id}/${user_id}`)
      .then((res) => {
        console.log(res, "views")
        setViews(res.data.views)
      })
      .catch((err) => onErrored(err))
  }

  const likeVideo = async (video_id: any) => {
    setStatus(!likeStatus)
    let video = {
      user_id: user.user_id,
      video_id: video_id,
      tokken: user.token,
      favourite_type: "video",
    }
    await Videos.likeVideo(video)
    axios.put(`http://3.14.145.118:4000/api/video/like/${video_id}`, {
      likes: [user.user_id]
    }).then(async (res) => {
      console.log(res)
      setLikes(res.data)
      let video = {
        user_id: user.user_id,
        video_id: video_id,
        tokken: user.token,
        favourite_type: "video",
      }
      await products.getMyFavourites(user.user_id)
    })
  }

  const reportVideo = () => {
    isSetModel(true)
  }

  const reportContent = async (category: any) => {
    let video = {
      user_id: user.user_id,
      video_id: route.params.data._id,
      flag_type: "video",
      tokken: user.token,
      category: category,
    }
    await Videos.postReport(video)
    isSetModel(false)
  }

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <View
        style={{
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
            <>
              <TouchableHighlight>
                <Video
                  bufferConfig={{
                    minBufferMs: 15000,
                    maxBufferMs: 50000,
                    bufferForPlaybackMs: 2500,
                    bufferForPlaybackAfterRebufferMs: 5000,
                  }}
                  useTextureView={false}
                  source={{ uri: route.params.data.video }}
                  ref={videoRef}
                  poster={route.params.data.poster}
                  posterResizeMode={'stretch'}
                  onEnd={() => onEnd(route.params.data._id)}
                  allowsExternalPlayback={false}
                  paused={isFocused ? paused : true}
                  resizeMode="contain"
                  style={{ height: 200, width: viewportWidth, alignSelf: "center" }}
                />
              </TouchableHighlight>
              <View
                style={{
                  position: "absolute",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 75,
                }}
              >
                <TouchableHighlight onPress={() => pauseVideo()} style={{ height: 50, width: 50 }}>
                  <Icon
                    icon={icon === "play" ? "play" : icon === "pause" ? "pause" : null}
                    style={{ height: 50, width: 50 }}
                  />
                </TouchableHighlight>
              </View>
            </>
          )}
      </View>
      <View style={{ padding: 10 }}>
        <Text text={route.params.data.title} style={{ color: "black", fontWeight: "bold" }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon icon="eye" style={{ top: 5 }} />
          <Text
            text={
              views && views.length > 0
                ? views.length + " " + "Views"
                : route.params.data.views?.length + " " + "Views"
            }
            style={{ color: "#7F7F7F" }}
          />
        </View>
        <TouchableOpacity
          onPress={() => likeVideo(route.params.data._id)}
          style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}
        >
          <Icon icon={likes.includes(user.user_id) ? "favouriter" : "like"} />
          <Text text={likes.length ? likes.length.toString() + " " + "Likes" : "0 Likes"} style={{ color: "#7F7F7F", left: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: "absolute", right: 20 }} onPress={() => reportVideo()}>
          <Flag />
        </TouchableOpacity>
      </View>
      <View style={{ borderBottomColor: "grey", borderBottomWidth: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ backgroundColor: "#C5C5C5", height: 70, width: 70, borderRadius: 40 }}>
              <Image
                source={{ uri: route.params.data.user_id.profile_picture }}
                style={{ height: 70, width: 70, borderRadius: 40 }}
                resizeMode="cover"
              />
            </View>
            <Text
              text={
                route.params.data.user_id.first_name + " " + route.params.data.user_id.last_name
              }
              style={{ color: "black", left: 10 }}
            />
          </View>
          {
            user.user_id === route.params.data.user_id._id ?
              null :
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("chat", {
                    sender_id: route.params.data.user_id._id,
                    avatar: route.params.data.user_id.profile_picture,
                    username: route.params.data.user_id.username,
                  })
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  elevation: 10,
                  height: 40,
                  width: 100,
                  padding: 10,
                  borderRadius: 20,
                  shadowColor: "#C5C5C5",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 12,
                }}
              >
                <Icon icon="chatBubble" />
                <Text text="Chat" style={{ color: "black", left: 10 }} />
              </TouchableOpacity>
          }
        </View>
      </View>
      {replyView ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ padding: 10 }} onPress={() => setReplyView(false)}>
                <Icon icon="gback" />
              </TouchableOpacity>
              <Text text="Replies" style={{ color: "grey", left: 20 }} />
            </View>
            <TouchableOpacity onPress={() => setReplyView(false)} style={{ padding: 10 }}>
              <Icon icon="close" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
          >
            <Image source={require("../../../assets/cavatar1.png")} />
            <View
              style={{
                backgroundColor: "white",
                elevation: 10,
                left: 10,
                width: 250,
                borderRadius: 30,
                height: 50,
              }}
            >
              <TextInput placeholder="Add a Public Reply" multiline={true} />
            </View>
          </View>
        </View>
      ) : commentView ? (
        <View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "grey" }}>Comments {showComment.length.toString()}</Text>
            {showComment.length > 0 ? (
              <TouchableOpacity onPress={() => setView(false)} style={{ padding: 10 }}>
                <Icon icon="close" />
              </TouchableOpacity>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                backgroundColor: "lightgrey",
              }}
            >
              {user.myProfile.profile_picture ? (
                <Image
                  source={{ uri: user.myProfile.profile_picture }}
                  style={{ height: 40, width: 40, borderRadius: 20 }}
                />
              ) : null}
            </View>
            <View
              style={{
                backgroundColor: "white",
                elevation: 10,
                left: 10,
                width: 250,
                borderRadius: 30,
                height: 50,
              }}
            >
              <TextInput
                placeholder="Add a Public Comment"
                value={keyword}
                onChangeText={(e) => setKeyword(e)}
                onSubmitEditing={commentVideo}
                clearButtonMode="while-editing"
                returnKeyType="done"
              />
            </View>
          </View>
        </View>
      ) : null}

      <ScrollView contentContainerStyle={{ padding: 10 }} onScroll={() => setView(false)}>
        <FlatList
          data={showComment}
          renderItem={(itm: any) => {
            const _date = new Date(itm.item.createdAt)
            return (
              <TouchableOpacity
                onPress={() => setView(!commentView)}
                key={itm.index.toString()}
                style={{ borderBottomWidth: 1, borderBottomColor: "lightgrey" }}
              >
                <View
                  style={{ padding: 10, flexDirection: "row", alignItems: "center", width: "90%" }}
                >
                  <View>
                    <Image
                      source={{ uri: itm.item.profile_picture }}
                      style={{ height: 40, width: 40, borderRadius: 20 }}
                      resizeMode="cover"
                    />
                  </View>
                  <View>
                    <Text
                      text={itm.item.first_name + " - " + date.format(_date, "ddd, MMM DD YYYY")}
                      style={{ color: "grey", left: 10 }}
                    />
                    <Text
                      text={itm.item.review}
                      style={{ color: "black", left: 10, fontSize: 12 }}
                    />
                    {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <TouchableOpacity onPress={() => setLikes(likes + 1)} style={{ padding: 10 }}>
                        <Icon icon="likec" />
                      </TouchableOpacity>
                      <Text text={likes.toString()} style={{ color: "black", fontSize: 14 }} />
                      <TouchableOpacity
                        onPress={() => setDislikes(dislikes + 1)}
                        style={{ padding: 10 }}
                      >
                        <Icon icon="dislike" />
                      </TouchableOpacity>
                      <Text text={dislikes.toString()} style={{ color: "black", fontSize: 14 }} />
                      <TouchableOpacity onPress={() => setReplyView(true)} style={{ padding: 10 }}>
                        <Icon icon="reply" />
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </ScrollView>

      {isShowModel === true ? (
        <ReportProduct
          setModel={isShowModel}
          closeModel={(e: any) => reportContent(e)}
          ishide={hide}
        />
      ) : null}
    </Screen>
  )
})
