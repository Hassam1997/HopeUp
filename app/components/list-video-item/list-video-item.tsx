import * as React from "react"
import {
  ActivityIndicator,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import Video from "react-native-video"
import { useStores } from "../../models"
import { Icon } from "../icon/icon"
import { useNavigation } from "@react-navigation/native"
const { height: viewportHeight, width: viewportWidth } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface ListVideoItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  loading?: boolean

  data?: any

  screen?: string
}

/**
 * Describe your component here
 */
export function ListVideoItem(props: ListVideoItemProps) {
  const navigation = useNavigation()
  const { style, data, screen } = props

  let videoRef: React.LegacyRef<Video> = React.useRef(null)
  const [isPaused, setIsPaused] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [icon, setIcon] = React.useState("play")

  const { user } = useStores()

  React.useEffect(() => {
    setLoading(false)
    console.log("data", data)
  }, [videoRef])

  const pauseVideo = () => {
    setIsPaused(!isPaused)
    if (icon === "play") {
      setIcon("pause")
      setTimeout(() => {
        setIcon(null)
      }, 2000)
    } else {
      setIcon("play")
    }
  }

  return (
    <View>
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
            <TouchableHighlight onPress={() => navigation.navigate(screen, { data: data })}>
              <Video
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                }}
                poster={data.poster}
                posterResizeMode={'stretch'}
                useTextureView={false}
                source={{ uri: data.link }}
                ref={videoRef}
                allowsExternalPlayback={false}
                paused={true}
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
              <TouchableHighlight
                onPress={() => navigation.navigate(screen, { data: data })}
                style={{ height: 50, width: 50 }}
              >
                <Icon
                  icon={icon === "play" ? "play" : icon === "pause" ? "pause" : null}
                  style={{ height: 50, width: 50 }}
                />
              </TouchableHighlight>
            </View>
          </>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <View style={{ height: 70, width: 70, borderRadius: 40, backgroundColor: "#C5C5C5" }}>
          <Image
            source={
              screen === "editVideo"
                ? { uri: user.myProfile.profile_picture }
                : data.user_id.profile_picture !== null
                ? { uri: data.user_id.profile_picture }
                : require("../../../assets/cavatar1.png")
            }
            style={{ height: 70, width: 70, borderRadius: 40 }}
            resizeMode="cover"
          />
        </View>
        <View style={{ padding: 10, width: "80%" }}>
          <Text text={data.title} style={{ color: "black", fontWeight: "bold", fontSize: 15 }} />
          <Text text={data.description} style={{ fontSize: 10, color: "#7f7f7f" }} />
        </View>
      </View>
    </View>
  )
}
