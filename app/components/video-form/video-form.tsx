import * as React from "react"
import { TextStyle, View, ViewStyle, TextInput, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { Icon } from "../icon/icon"
import ReactChipsInput from "react-native-chips"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  elevation: 5,
  backgroundColor: "white",
  width: wp("90%"),
  alignSelf: "center",
  borderRadius: 15,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 15,
  color: "#49669E",
  paddingLeft: 4,
  fontWeight: "bold",
}

const gradient: ViewStyle = {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  height: 45,
  width: wp("90%"),
  alignSelf: "center",
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
}

export interface VideoFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  description?: string

  setDescription?: (e: any) => any

  title?: string

  setTitle?: (e: any) => any

  tags?: []

  setTags?: (e: []) => any

  uploadVideo?: () => any

  imagePicker?: () => any

  loading?: boolean
}

/**
 * Describe your component here
 */
export const VideoForm = observer(function VideoForm(props: VideoFormProps) {
  const {
    style,
    description,
    setDescription,
    title,
    setTitle,
    tags,
    setTags,
    uploadVideo,
    imagePicker,
    loading
  } = props
  const navigation = useNavigation()

  return (
    <View style={[CONTAINER, style, { height: tags.length > 0 ? hp("60%") : hp("55%") }]}>
      <View
        style={{
          flex: 1.5,
          backgroundColor: "white",
          width: wp("80%"),
          alignSelf: "center",
          marginTop: 20,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: wp("80%"),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={[TEXT]}>Title</Text>
          <Image
            source={require("../../components/icon/icons/Trash.png")}
            style={{ height: 25 }}
            resizeMode="contain"
          />
        </View>

        <View>
          <TextInput
            placeholder={"Title"}
            value={title}
            onChangeText={(e: any) => setTitle(e)}
            placeholderTextColor="#707070"
            style={{
              width: wp("80%"),
              fontSize: 15,
              height: 40,
              borderBottomWidth: 1,
              borderBottomColor: "#707070",
            }}
          />
        </View>
        <View
          style={{
            width: wp("80%"),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: 40,
          }}
        >
          <Text style={[TEXT]}>Description</Text>
        </View>

        <View>
          <TextInput
            placeholder={"Description"}
            value={description}
            onChangeText={(e: any) => setDescription(e)}
            placeholderTextColor="#707070"
            style={{
              width: wp("80%"),
              fontSize: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#707070",
            }}
          />
        </View>
        <View style={{ width: wp("85%"), alignSelf: "center" }}>
          <ReactChipsInput
            label="Tags"
            initialChips={tags}
            onChangeChips={(chips: any) => setTags(chips)}
            alertRequired={false}
            chipStyle={{ borderColor: "blue", backgroundColor: "grey" }}
            inputStyle={{ fontSize: 16 }}
            labelStyle={[TEXT, { bottom: 20 }]}
          />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", padding: 10, left: 10 }}>
          <TouchableOpacity
            onPress={() => imagePicker()}
            style={{
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 10,
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon icon="addVideo" />
          </TouchableOpacity>
          <Text text="Select another video" style={{ color: "grey", left: 15 }} />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 999999999999,
        }}
      >
        <View style={{}}>
          <TouchableOpacity disabled={loading} onPress={uploadVideo}>
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.7]}
              colors={["#4B6CB7", "#182848"]}
              style={{
                width: 70,
                height: 70,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={() => {
                if (loading) {
                  Alert.alert("Hey User", "Please Wait while video is uploading")
                } else {
                  uploadVideo()
                }
              }}>
                <Image
                  source={require("../../components/icon/icons/Download.png")}
                  style={{ height: 25 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={gradient}
        >{loading ?
          <ActivityIndicator size="large" color="#FFFFFF" />
          :
          <TouchableOpacity onPress={uploadVideo}>
            <Text text="Upload" />
          </TouchableOpacity>
          }
        </LinearGradient>
      </View>
    </View>
  )
})
