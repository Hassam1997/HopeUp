import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, ScrollView, TouchableOpacity, View, ViewStyle, Dimensions, TextInput, ToastAndroid } from "react-native"
import { Header, Screen, Text, Icon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import axios from "axios"
import date from "date-and-time"
import LinearGradient from "react-native-linear-gradient"
const { height, width } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

export const OrdersScreen = observer(function OrdersScreen() {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()

  useEffect(() => {
    axios.get(`http://3.14.145.118:4000/api/order/${user.user_id}`).then((res: any) => {
      console.log(res, "order")
      setDelivery(res.data.bought)
      setReceivedOrders(res.data.sold)
    })
  }, [])

  const emptyComponent = () => {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text
          text="No Data to Display."
          style={{ textAlign: "center", fontSize: 18, color: "black", letterSpacing: 1.2 }}
        />
      </View>
    )
  }

  const [boughtOrders, setDelivery] = useState([])

  const [sold_orders, setReceivedOrders] = useState([])

  const [tab, setTab] = useState(false)

  const [trackingId, setTrackingId] = useState("")

  async function postTrackingId(order_id) {
    const response = await axios.put(`http://3.14.145.118:4000/api/order/track-id`, {
      order_id: order_id,
      track_id: trackingId
    })
    console.log(response)
  }

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.navigate('home', { screen: "home" })}
        leftIcon="back"
        headerText="Orders"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
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
            text="Bought"
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
          <Text
            text="Sold"
            style={{ color: tab ? "#3F64A4" : "#C5C5C5", fontWeight: "bold", fontSize: 17 }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {tab ?
          <View style={{ padding: 10 }}>
            <Text text="Delivery" style={{ color: "#182848", fontSize: 22, fontWeight: "bold" }} />
            <FlatList
              data={sold_orders}
              ListEmptyComponent={emptyComponent}
              renderItem={(itm: any) => {
                const _date = new Date(itm.item.createdAt)
                return (
                  <View style={{ backgroundColor: '#c5c5c5', marginVertical: 10, padding: 10 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "white",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 10,
                        borderRadius: 10,
                        marginVertical: 10,
                      }}
                    >
                      <View>
                        <Text text={itm.item.product_id.title} style={{ color: "#000000", fontSize: 15 }} />
                        <Text
                          text={date.format(_date, "ddd, MMM DD YYYY hh:mm A")}
                          style={{ color: "#C5C5C5", fontSize: 11 }}
                        />
                        <View style={{ paddingVertical: 10, top: 15 }}>
                          <Text
                            style={{ color: "#11961B", fontSize: 11 }}
                            text={`Estimated delivery on ${itm.item.estimated_time}`}
                          />
                        </View>
                      </View>
                      <View>
                        <Image source={{ uri: itm.item.product_id.images[0] }} style={{ height: 40, width: 40 }} resizeMode='contain' />
                      </View>
                    </TouchableOpacity>
                    <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 10 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text text="Provide Tracking_ID" style={{ color: 'black' }} />
                        <TouchableOpacity
                          onPress={() => ToastAndroid.show("USPS Tracking Id", 4000)}
                          style={{ borderWidth: 1, borderColor: 'black', height: 10, width: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                          <Text text="i" style={{ color: 'black', fontSize: 8 }} />
                        </TouchableOpacity>
                      </View>
                      <TextInput
                        placeholder="Enter here...."
                        value={trackingId}
                        onChangeText={(e: any) => setTrackingId(e)}
                        onSubmitEditing={() => postTrackingId(itm.item._id)}
                        clearButtonMode="while-editing"
                        returnKeyType="done"
                        style={{ color: 'black', backgroundColor: '#C5C5C5', marginTop: 5 }}
                      />
                    </View>
                  </View>
                )
              }}
            />
          </View>
          :
          <View style={{ padding: 10 }}>
            <Text
              text="Received Orders"
              style={{ color: "#182848", fontSize: 22, fontWeight: "bold" }}
            />
            <FlatList
              data={boughtOrders}
              ListEmptyComponent={emptyComponent}
              renderItem={(itm: any) => {
                const _date = new Date(itm.item.createdAt)
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("orderdetails")
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: 10,
                          borderRadius: 10,
                          marginVertical: 10,
                        }}
                      >
                        <View>
                          <Text text={itm.item.product_id.title} style={{ color: "#000000", fontSize: 15 }} />
                          <Text
                            text={date.format(_date, "ddd, MMM DD YYYY hh:mm A")}
                            style={{ color: "#C5C5C5", fontSize: 11 }}
                          />
                          <View style={{ paddingVertical: 10 }}>
                            <Text
                              style={{ color: "#182848", fontSize: 11, top: 15 }}
                            // text={`Delivered on ${itm.item.delivered_on}`}
                            />
                          </View>
                        </View>
                        <View>
                          <Image source={{ uri: itm.item.product_id.images[0] }} style={{ height: 40, width: 40 }} resizeMode='contain' />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("track_order")}
                      style={{ height: 50, width: 100, borderRadius: 10, alignSelf: 'flex-end' }}>
                      <LinearGradient
                        start={{ x: 0.5, y: 0.0 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5]}
                        style={{ height: 40, width: 100, padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                        colors={["#4B6CB7", "#182848"]}>
                        <Text text="Track Order" style={{ textAlign: 'center' }} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )
              }}
            />
          </View>
        }
      </ScrollView>
    </Screen>
  )
})
