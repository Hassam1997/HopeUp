import * as React from "react"
import {
  Modal,
  TextStyle,
  View,
  ViewStyle,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import Video from "../../../assets/cvideo.svg"
import Ad from "../../../assets/cad.svg"
import Product from "../../../assets/cproduct.svg"
import { useStores } from "../../models"

const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
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
  height: 300,
  padding: 10,
  backgroundColor: "white",
  width: "88%",
  alignSelf: "center",
  elevation: 10,
  borderRadius: 10,
  marginTop: Platform.OS == "ios" ? 200 : 200,
}

const ROW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-evenly",
  borderRadius: 45,
  padding: 10,
}

export interface AddComponentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  show?: boolean
}

/**
 * Describe your component here
 */
export function AddComponent(props: AddComponentProps) {
  const { style, show } = props

  const navigation = useNavigation()
  const { classifieds } = useStores()

  function adNavigation() {
    classifieds.setAction("add")
    navigation.navigate("selectState")
  }

  return (
    <View style={[CONTAINER, style]}>
      {/* <Modal visible={true} animationType='slide' transparent={true}> */}
      <View style={filterMain}>
        <View style={filterSub}>
          <View style={{ justifyContent: "space-evenly", height: "98%", padding: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("uploadVideo")}>
              <LinearGradient
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.8]}
                colors={["#4B6CB7", "#182848"]}
                style={ROW}
              >
                {/* <Image source={require('../../../assets/cvideo.png')} resizeMode='contain' /> */}
                <Video />
                <Text text="Create Video" style={{ fontWeight: "bold" }} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => adNavigation()}>
              <LinearGradient
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.8]}
                colors={["#4B6CB7", "#182848"]}
                style={ROW}
              >
                {/* <Image source={require('../../../assets/cad.png')} resizeMode='contain' /> */}
                <Ad />
                <Text text="Create Ads" style={{ fontWeight: "bold" }} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("sellProduct")}>
              <LinearGradient
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.8]}
                colors={["#4B6CB7", "#182848"]}
                style={ROW}
              >
                {/* <Image source={require('../../../assets/cproduct.png')} resizeMode='contain' /> */}
                <Product />
                <Text text="Sell Product" style={{ fontWeight: "bold" }} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </Modal> */}
    </View>
  )
}
