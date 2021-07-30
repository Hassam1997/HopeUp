import React, { useState, LegacyRef, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, ActivityIndicator, ToastAndroid } from "react-native"
import { Screen, Text, Header, VideoForm } from "../../components"
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

export const UploadVideoScreen = observer(function UploadVideoScreen() {
  // Pull in one of our MST stores
  const { user, Videos } = useStores()
  // OR
  // const rootStore = useStores()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isImage, isSetImage] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const [poster, setPoster] = useState("")
  let videoRef: LegacyRef<Video> = useRef(null)

  // Pull in navigation via hook
  const navigation = useNavigation()

  const imagepicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "video",
      height: 250,
      width: wp("100%"),
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    }).then((images) => {
      console.log(images)
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
  }

  const uploadVideo = () => {
    console.log(isImage, "image")
    if (isImage.length < 1 || title === "" || description === "" || tags.length === 0) {
      ToastAndroid.show("Please Fill All fields", 2000)
    } else {
      let video = {
        tokken: user.token,
        video: isImage,
        title: title,
        description: description,
        tags: tags,
        user_id: user.user_id,
        poster: poster
      }
      Videos.UploadVideo(video)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.navigate("home")}
        leftIcon="back"
        headerText="Upload Video"
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          top: 10,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#2681D5" />
        ) : (
            <TouchableOpacity
              onPress={() => {
                imagepicker()
              }}
              style={{
                width: wp("100%"),
                alignItems: "center",
                justifyContent: "center",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              {isImage.length > 0 ? (
                <Video
                  source={{ uri: isImage[0] }}
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
              ) : (
                  <Image
                    source={require("../../../assets/PlayStore.png")}
                    style={{
                      borderBottomLeftRadius: 20,
                      borderBottomRightRadius: 20,
                    }}
                  />
                )}
            </TouchableOpacity>
          )}
      </View>
      <VideoForm
        description={description}
        setDescription={(e: any) => setDescription(e)}
        title={title}
        setTitle={setTitle}
        imagePicker={() => imagepicker()}
        uploadVideo={() => uploadVideo()}
        tags={tags}
        setTags={(e: any) => setTags(e)}
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
