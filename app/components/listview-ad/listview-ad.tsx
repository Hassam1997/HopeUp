import * as React from "react"
import { TextStyle, View, ViewStyle, Image, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text, Icon } from "../"
import { useNavigation } from "@react-navigation/native"
import date from "date-and-time"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const rowFront: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  margin: 10,
  height: 250,
  // elevation: 10,
  borderRadius: 20,
}

export interface ListviewAdProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  data?: any
}

/**
 * Describe your component here
 */
export const ListviewAd = observer(function ListviewAd(props: ListviewAdProps) {
  const { style, data } = props

  const navigation = useNavigation()

  const _date = new Date(data.item.createdAt)
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("viewad", { data: data })}
      key={data.item._id}
      style={{ padding: 10 }}
    >
      <Text
        text={data.item.title}
        style={{ color: "#182848", fontSize: 15, fontWeight: "bold", textAlign: "center" }}
      />
      <View style={rowFront}>
        <Image
          source={{ uri: data.item.images[0] }}
          resizeMode="contain"
          style={{ height: 250, width: "100%" }}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: data.item.user_id.profile_picture }} style={{ left: 10 }} />
          <View style={{ left: 20 }}>
            <Text
              text={data.item.user_id.first_name + " " + data.item.user_id.last_name}
              style={{ color: "#182848" }}
            />
            <Text
              text={date.format(_date, "ddd, MMM DD YYYY")}
              style={{ color: "#585858", fontSize: 12 }}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon icon="like" style={{ right: 20 }} />
          <Text
            text={data.item.likes ? data.item.likes.length : "0"}
            style={{ color: "#7F7F7F", right: 10 }}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
})
