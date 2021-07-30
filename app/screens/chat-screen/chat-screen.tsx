import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ActivityIndicator,
  FlatList,
  Image,
  SectionList,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Header, Icon, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { chatData } from "./dummyData"
import LinearGradient from "react-native-linear-gradient"
import styles from "../../navigation/styles"
import EmojiBoard from "react-native-emoji-board"
import IO from "socket.io-client"
import Axios from "axios"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import date from "date-and-time"
import { cos } from "react-native-reanimated"

const socket = IO("ws://3.14.145.118:4000")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const input: ViewStyle = {
  width: wp("77%"),
  backgroundColor: "white",
  elevation: 10,
  borderRadius: 30,
  margin: 10,
  height: 40,
  shadowColor: "#C5C5C5",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
}

export const ChatScreen = observer(function ChatScreen({ route }) {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState([])
  const [avatar, setAvatar] = useState(null)
  const [dated, setDated] = useState(new Date())
  socket.on("message", (message) => {
    console.log(message, "AND", conversation)
    if (conversation.length) {
      setConversation(
        conversation.map((item) =>
          item.date === `${date.format(dated, "ddd, MMM DD YYYY")}`
            ? {
                date: item.date,
                data: item.data.length
                  ? [
                      ...item.data,
                      {
                        message: message.chat.message,
                        receiver_id: message.chat.receiver_id,
                        sender_id: message.chat.sender_id,
                      },
                    ]
                  : [
                      {
                        message: message.chat.message,
                        receiver_id: message.chat.receiver_id,
                        sender_id: message.chat.sender_id,
                      },
                    ],
              }
            : item,
        ),
      )
    } else
      setConversation([
        {
          date: `${date.format(dated, "ddd, MMM DD YYYY")}`,
          data: [
            {
              message: message.chat.message,
              receiver_id: message.chat.receiver_id,
              sender_id: message.chat.sender_id,
            },
          ],
        },
      ])
  })

  useEffect(() => {
    setAvatar(route.params.avatar)
    setShow(true)
    let sender_id = user.user_id
    let receiver_id = route.params.sender_id
    Axios.get(
      `http://3.14.145.118:4000/api/chat/?sender_id=${sender_id}&receiver_id=${receiver_id}`,
    ).then((chat) => {
      let arr = []
      chat.data.forEach((element: any) => {
        const _date = new Date(element.createdAt)
        if (arr.length > 0) {
          let sameDayMessage = arr.filter(
            (item) => item.date === date.format(_date, "ddd, MMM DD YYYY"),
          )
          if (sameDayMessage.length > 0) {
            let obj = {
              message: element.message,
              receiver_id: element.receiver_id,
              sender_id: element.sender_id,
            }
            sameDayMessage[0].data.push(obj)
          } else {
            let data = {
              date: `${date.format(_date, "ddd, MMM DD YYYY")}`,
              data: [
                {
                  message: element.message,
                  receiver_id: element.receiver_id,
                  sender_id: element.sender_id,
                },
              ],
            }
            arr.push(data)
          }
        } else {
          let data = {
            date: `${date.format(_date, "ddd, MMM DD YYYY")}`,
            data: [
              {
                message: element.message,
                receiver_id: element.receiver_id,
                sender_id: element.sender_id,
              },
            ],
          }
          arr.push(data)
        }
      })
      setConversation(arr)
      setShow(false)
    })
  }, [route])

  // const onClick = (emoji) => {
  //   setMessage(emoji.code)
  // }

  const sendMessage = () => {
    if (message === null || message === "") return
    socket.emit("new_message", {
      receiver_id: route.params.sender_id,
      sender_id: user.user_id,
      message: message,
    })
    let obj = {
      date: `${date.format(dated, "")}`,
      data: [
        {
          message: message,
          receiver_id: route.params.sender_id,
          sender_id: user.user_id,
        },
      ],
    }
    if (conversation.length > 0) {
      let sameDayMessage = conversation.filter(
        (item) => item.date === date.format(dated, "ddd, MMM DD YYYY"),
      )
      if (sameDayMessage.length > 0) {
        let objct = {
          message: message,
          receiver_id: route.params.sender_id,
          sender_id: user.user_id,
        }
        sameDayMessage[0].data.push(objct)
      } else {
        let data = {
          date: `${date.format(dated, "ddd, MMM DD YYYY")}`,
          data: [
            {
              message: message,
              receiver_id: route.params.sender_id,
              sender_id: user.user_id,
            },
          ],
        }
        conversation.push(data)
      }
    } else {
      setConversation([obj])
    }
    setMessage("")
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText={route.params.username}
      />
      {show ? (
        <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={"large"} color={"#C5C5C5"} style={{ bottom: 70 }} />
        </View>
      ) : (
        <SectionList
          sections={conversation}
          ListFooterComponent={<View style={{ height: 100 }} />}
          renderSectionHeader={({ section: { date } }) => {
            return (
              <View style={{ padding: 10 }}>
                <Text
                  text={date}
                  style={{
                    textAlign: "center",
                    color: "#7F7F7F",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                />
              </View>
            )
          }}
          renderItem={(itm: any) => {
            return (
              <View style={{ padding: 10, flex: 1 }}>
                {itm.item.receiver_id === user.user_id ? (
                  <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    <Image
                      source={
                        avatar !== null ? { uri: avatar } : require("../../../assets/cavatar2.png")
                      }
                      style={{ height: 40, width: 40, borderRadius: 20 }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        padding: 10,
                        width: "75%",
                        backgroundColor: "white",
                        elevation: 10,
                        left: 10,
                        borderRadius: 10,
                      }}
                    >
                      <Text text={itm.item.message} style={{ color: "black" }} />
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-end",
                      width: "90%",
                      justifyContent: "flex-end",
                      alignSelf: "center",
                    }}
                  >
                    <LinearGradient
                      start={{ x: 0.5, y: 0.0 }}
                      end={{ x: 0.5, y: 1.0 }}
                      locations={[0, 0.8]}
                      colors={["#4B6CB7", "#182848"]}
                      style={{ borderRadius: 10, right: 10, width: "80%" }}
                    >
                      <View style={{ padding: 10, flex: 1, borderRadius: 10 }}>
                        <Text text={itm.item.message} style={{ color: "white" }} />
                      </View>
                    </LinearGradient>
                    {user.myProfile.profile_picture !== null ? (
                      <Image
                        source={{ uri: user.myProfile.profile_picture }}
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View
                        style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: "grey" }}
                      />
                    )}
                  </View>
                )}
              </View>
            )
          }}
        />
      )}
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          bottom: 0,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={input}>
            {/* <TouchableOpacity>
            <View
              style={[
                styles.buttonViewBack,
                { top: 0.5, right: 1, borderWidth: 0, height: 30, width: 30 },
              ]}
            >
              <LinearGradient
                start={{ x: 0.5, y: 0.0 }}
                end={{ x: 0.5, y: 1.0 }}
                locations={[0, 0.8]}
                colors={["#4B6CB7", "#182848"]}
                style={[
                  styles.buttonViewFront,
                  {
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 0,
                    height: 30,
                    width: 30,
                  },
                ]}
              >
                <Icon icon="plusCircle" />
              </LinearGradient>
            </View>
          </TouchableOpacity> */}
            <TextInput
              placeholder="Type a message"
              style={{ width: wp("75%") }}
              value={message}
              onChangeText={(e: any) => setMessage(e)}
            />
            {/* <TouchableOpacity onPress={() => setShow(!show)}>
            <Icon icon="emoji" style={{ height: 20, width: 20 }} />
          </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            onPress={() => sendMessage()}
            style={{
              height: 45,
              width: 45,
              borderRadius: 30,
              backgroundColor: "white",
              elevation: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon icon="telegram" />
          </TouchableOpacity>
        </View>
      </View>
      {/* <EmojiBoard showBoard={show} onClick={onClick} /> */}
    </Screen>
  )
})
