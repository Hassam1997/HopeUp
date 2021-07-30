import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, View, ViewStyle, Dimensions, ToastAndroid } from "react-native"
import { Header, Icon, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import Axios from "axios"
import { useStores } from "../../models"
import { color } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import IO from "socket.io-client"

const { height, width } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const socket = IO("ws://3.14.145.118:4000")

export const NotificationsScreen = observer(function NotificationsScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()
  const [tab, setTab] = useState(false)
  const [data, setData] = useState([])
  const [unreadData, setUnReadData] = useState([])

  useEffect(() => {
    Axios.get(`http://3.14.145.118:4000/api/notification/${user.user_id}`)
      .then((res: any) => {
        console.log(res, "RR")
        let arr = []
        let unreadArr = []
        res.data.forEach((element) => {
          if (element.viewed) {
            arr.push(element)
          } else {
            unreadArr.push(element)
          }
        })
        setData(arr)
        setUnReadData(unreadArr)
      })
      .catch((err) => {
        onErrored(err)
      })
  }, [])

  const onErrored = (err: any) => {
    if (err.request) {
      console.log(err.request, "client never received an error response.")
    } else if (err.response) {
      console.log(err.response, "client received an error response.")
    } else {
      console.log(err)
    }
  }

  const checkNotification = (data: any) => {
    socket.emit("view_notification", data._id)

    Axios.get(`http://3.14.145.118:4000/api/notification/${user.user_id}`).then((res: any) => {
      console.log(res, "RR")
    })
    if (data.notification_type === "video") {
      if (data.video[0].deleted === true) {
        ToastAndroid.show("Video has been deleted.", 2000)
      } else {
        Axios.get(`http://3.14.145.118:4000/api/video/${data.video[0]._id}`)
          .then((res) => {
            // navigation.navigate("Video", {
            //   screen: "VideoDetail",
            //   params: { video: res.data[0] }
            // });
          })
          .catch((err) => onErrored(err))
      }
    } else if (data.notification_type === "product") {
      if (data.product[0].deleted === true) {
        ToastAndroid.show("Video has been deleted.", 2000)
      } else {
        Axios.get(`http://3.14.145.118:4000/api/product/${data.product[0]._id}`)
          .then((res) => {
            //  navigation.navigate("FavouriteProduct", {
            //   product: res.data[0]
            // });
          })
          .catch((err) => onErrored(err))
      }
    } else if (data.notification_type === "advertise") {
      if (data.advertise[0].deleted === true) {
        ToastAndroid.show("Ad has been deleted.", 2000)
      } else {
        Axios.get(`http://3.14.145.118:4000/api/adv/${data.advertise[0]._id}`)
          .then((res) => {
            // navigation.navigate("FavouriteClassified", {
            //   classified: res.data[0]
            // });
          })
          .catch((err) => onErrored(err))
      }
    } else {
      // navigation.navigate("AllOrders");
      console.log("goto orders")
    }
  }
  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText={"Notifications"}
      />
      {data.length || unreadData.length ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              elevation: 10,
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => setTab(!tab)}
              style={{
                padding: 10,
                borderBottomColor: tab ? "#C5C5C5" : "#3F64A4",
                borderBottomWidth: 3,
                width: width / 2,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
            >
              <Text
                text="All"
                style={{ color: tab ? "#C5C5C5" : "#3F64A4", fontWeight: "bold", fontSize: 17 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setTab(!tab)}
              style={{
                width: width / 2,
                backgroundColor: "white",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: tab ? "#3F64A4" : "#C5C5C5",
                borderBottomWidth: 3,
                height: 50,
              }}
            >
              <Icon icon={tab ? "nfbell" : "nebell"} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={tab ? unreadData : data}
            ListFooterComponent={<View style={{ height: 150 }} />}
            renderItem={(itm: any) => {
              return (
                <TouchableOpacity
                  onPress={() => checkNotification(itm.item)}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    padding: 10,
                    margin: 10,
                    backgroundColor: "white",
                    elevation: 10,
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={{ uri: itm.item.user[0].profile_picture }}
                    style={{ height: 70, width: 70 }}
                    resizeMode="contain"
                  />
                  <View style={{ width: "79%", padding: 10 }}>
                    <Text
                      text={itm.item.user[0].first_name + " " + itm.item.user[0].last_name}
                      style={{ color: "#3F64A4", fontSize: 18, fontWeight: "bold" }}
                    />
                    <Text
                      text={`${itm.item.user[0].username} has ${
                        itm.item.title == "flaged" ? "flagged" : itm.item.title
                      } your ${itm.item.notification_type}`}
                      style={{ color: "#C5C5C5", fontSize: 10 }}
                    />
                  </View>
                  {/* <View style={{ position: "absolute", top: 10, right: 10 }}>
                    <Text text={itm.item.date} style={{ color: "#C5C5C5" }} />
                  </View> */}
                </TouchableOpacity>
              )
            }}
          />
        </View>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", padding: 10, height: "80%" }}
        >
          <View
            style={{ justifyContent: "center", alignItems: "center", padding: 10, height: "60%" }}
          >
            <Image source={require("../../../assets/nonotification.png")} />
            <Text text="Nothing here!!!" style={{ color: "#585858", fontWeight: "bold" }} />
            <Text text="No Notifications yet" style={{ color: "#C5C5C5" }} />
          </View>
        </View>
      )}
    </Screen>
  )
})
