import React, { useEffect, useState, LegacyRef, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ActivityIndicator } from "react-native"
import { Screen, Header, VideoForm } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import ImagePicker from "react-native-image-crop-picker"
import { TouchableOpacity } from "react-native-gesture-handler"
import Video from "react-native-video"
import axios from "axios"
import { createThumbnail } from "react-native-create-thumbnail";

const ROOT: ViewStyle = {
  backgroundColor: "#C5C5C5",
  flex: 1,
}

export const EditVideoScreen = observer(function EditVideoScreen({ route }) {
  // Pull in one of our MST stores
  const { user, Videos } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isImage, isSetImage] = useState([])
  const [isVideoId, isSetVideoId] = useState("")
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [poster, setPoster] = useState("")
  let videoRef: LegacyRef<Video> = useRef(null)

  useEffect(() => {
    console.log(route, "RR")
    let arr = []
    const { data } = route.params
    getVideoData()
    async function getVideoData() {
      const response = await Videos.getSpecificVideo(data._id)
      console.log(response, "rr")
      let videoData = response.data[0]
      data.tags.forEach((element: any) => {
        arr.push(element.tag)
      })
      setTitle(videoData.title)
      setDescription(videoData.description)
      isSetVideoId(videoData._id)
      setTags(arr)
      isSetImage(videoData.video)
    }
  }, [route])

  const imagepicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "video",
      height: 250,
      width: wp("100%"),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    }).then((images) => {
      console.log(images, "i")
      setLoading(true)
      let formData = new FormData()
      let formData2 = new FormData()
      formData.append("images", {
        name: `${Date.now()} + Video.mp4`,
        type: images.mime,
        uri: images.path,
      })
      axios
        .post("http://3.14.145.118:4000/api/image/uploadImage", formData)
        .then((res) => {
          console.log(res)
          isSetImage(res.data)
          createThumbnail({
            url: res.data[0],
            timeStamp: 10000,
          })
            .then(response => {
              formData2.append("images", {
                name: `${Date.now()} + Thumbnail.jpeg`,
                type: response.mime,
                uri: response.path,
              })
              axios
                .post("http://3.14.145.118:4000/api/image/uploadImage", formData2)
                .then((res) => {
                  console.log(res)
                  setPoster(res.data[0])
                }).catch(err => console.log({ err }));
            })
            .catch(err => console.log({ err }));
          setLoading(false)
        }).catch(err => {
          if (err.request) {
            console.log(err.request, "req")
          } else if (err.response) {
            console.log(err.response, "response")
          } else {
            console.log(err, "error")
          }
        })
    })
  }

  const uploadVideo = () => {
    console.log(isImage, "image")
    let video = {
      tokken: user.token,
      video: isImage,
      title: title,
      description: description,
      tags: tags,
      user_id: user.user_id,
      _id: isVideoId,
    }
    Videos.editVideo(video)
    console.log("check", isImage)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header onLeftPress={() => navigation.goBack()} leftIcon="back" headerText="Edit Video" />
      <View
        style={{
          flex: 1,
        }}
      >
        {isImage.length > 0 ? (
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
            <Video
              source={
                isImage.length > 0 ? { uri: isImage[0] } : require("../../../assets/PlayStore.png")
              }
              allowsExternalPlayback={true}
              resizeMode="cover"
              ref={videoRef}
              controls={true}
              style={{
                height: 250,
                width: wp("100%"),
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
              }}
            />
          </TouchableOpacity>
        ) : (
            <ActivityIndicator size="large" color={"black"} />
          )}
      </View>

      <VideoForm
        title={title}
        setTitle={(e: any) => setTitle(e)}
        description={description}
        setDescription={(e: any) => setDescription(e)}
        tags={tags}
        setTags={(e: any) => setTags(e)}
        imagePicker={() => imagepicker()}
        uploadVideo={() => uploadVideo()}
        loading={loading}
      />
      <View
        style={{
          marginBottom: 50,
        }}
      ></View>
    </Screen>
  )
})
