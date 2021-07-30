import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { Header, Icon, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import date from "date-and-time"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const MessagesScreen = observer(function MessagesScreen() {
  // Pull in one of our MST stores
  const { messenger, user } = useStores()
  // OR
  // const rootStore = useStores()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    setLoading(true)
    getData()
    async function getData() {
      const resposne = await messenger.getConversations(user.user_id, user.token)
      console.log(resposne, "REP")
      setData(resposne.data)
      setLoading(false)
    }
  }, [])

  const chatList = (item: any) => {
    navigation.navigate("chat", {
      sender_id: item.message.sender_id === user.user_id ? item.receiver._id : item.user._id,
      username:
        item.message.sender_id === user.user_id ? item.receiver.username : item.user.username,
      avatar:
        item.message.sender_id === user.user_id
          ? item.receiver.profile_picture
          : item.user.profile_picture,
      deleted:
        item.message.sender_id === user.user_id
          ? item.receiver.deleted && item.receiver.deleted === true
            ? true
            : false
          : item.user.deleted && item.user.deleted === true
          ? true
          : false,
    })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header leftIcon="back" onLeftPress={() => navigation.goBack()} headerText="Messages" />
      {loading ? (
        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={"#C5C5C5"} style={{ bottom: 70 }} />
        </View>
      ) : (
        <View>
          <Text
            text="Messages"
            style={{
              color: "#010101",
              fontSize: 24,
              fontWeight: "bold",
              left: 10,
            }}
          />
          {data.length > 0 ? (
            <FlatList
              data={data}
              ListFooterComponent={<View style={{ height: 120 }} />}
              renderItem={(itm: any) => {
                console.log(itm, "i")
                const _date = new Date(itm.item.message.createdAt)
                return (
                  <TouchableOpacity
                    onPress={() => chatList(itm.item)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      margin: 10,
                      backgroundColor: "white",
                      elevation: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={
                        itm.item.message.sender_id === user.user_id
                          ? itm.item.receiver.profile_picture
                            ? { uri: itm.item.receiver.profile_picture }
                            : require("../../../assets/avatar.png")
                          : itm.item.user.profile_picture
                          ? { uri: itm.item.user.profile_picture }
                          : require("../../../assets/avatar.png")
                      }
                      style={{ height: 70, width: 70, borderRadius: 35 }}
                      resizeMode="cover"
                    />
                    <View style={{ width: "69%", padding: 10 }}>
                      <Text
                        text={
                          itm.item.message.sender_id === user.user_id
                            ? itm.item.receiver.first_name
                            : itm.item.user.first_name
                        }
                        style={{ color: "#3F64A4", fontSize: 18, fontWeight: "bold" }}
                      />
                      <Text text={itm.item.message.message} style={{ color: "#C5C5C5" }} />
                    </View>
                    <View style={{ marginTop: 10, right: 70 }}>
                      {/* {itm.item.unread.length > 0 ? (
                      <View>
                      <Icon icon="bubble" style={{ height: 25, width: 25, left: 8, top: 5 }} />
                      <Text
                      text={itm.item.unread.length}
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 20,
                        color: "white",
                        fontWeight: "bold",
                      }}
                      />
                      </View>
                    ) : null} */}
                      <Text
                        text={date.format(_date, "ddd, MMM DD YYYY")}
                        style={{ color: "#C5C5C5", top: 20, right: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          ) : (
            <View
              style={{ justifyContent: "center", alignItems: "center", padding: 10, height: "80%" }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  height: "60%",
                }}
              >
                <Image source={require("../../../assets/nomsg.png")} />
                <Text
                  text="No Messages Yet."
                  style={{ color: "#585858", fontWeight: "bold", fontSize: 24, marginTop: 20 }}
                />
                <Text text="No Messages in your inbox, yet" style={{ color: "#C5C5C5" }} />
              </View>
            </View>
          )}
        </View>
      )}
    </Screen>
  )
})
