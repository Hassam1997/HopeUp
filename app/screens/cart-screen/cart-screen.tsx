import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Image, TouchableOpacity, FlatList, Platform } from "react-native"
import { Header, Icon, Screen, Text } from "../../components"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

export const CartScreen = observer(function CartScreen() {
  // Pull in one of our MST stores
  const { cart, user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [productIds, setIds] = useState([])

  useEffect(() => {
    //get cart items
    getData()
    async function getData() {
      const cartData = await cart.getCartItems(user.user_id)
      let price = 0
      let arr = []
      cartData.data.forEach((element: any) => {
        if (price == 0) {
          price = element.price * element.quantity
        } else {
          price = price + element.price * element.quantity
        }
        console.log(element,"EE")
        arr.push(element.product_id._id)
      })
      setIds(arr)
      setData(cartData.data)
      setTotalPrice(price)
    }
  }, [flag])

  async function setQuantity(action: any, item: any) {
    let data = {
      item: item,
      tokken: user.token,
    }
    const cartData = await cart.updateCart(action, data)
    setFlag(!flag)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="menu"
        onLeftPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        headerText="CART"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      {data.length > 0 ? (
        <View style={{ height: "90%" }}>
          <View style={{ padding: 10 }}>
            <Text
              text="Shopping Cart"
              style={{ color: "#000000", fontSize: 24, fontWeight: "bold" }}
            />
            <FlatList
              data={data}
              renderItem={(itm: any) => {
                console.log(itm, "I")
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-evenly",
                      padding: 10,
                    }}
                  >
                    <View style={{ padding: 10 }}>
                      <Image
                        source={
                          itm.item.product_id.images?.length > 0
                            ? { uri: itm.item.product_id.images[0] }
                            : require("../../../assets/dummyProduct.png")
                        }
                        style={{ height: 80, width: 80 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={{ padding: 10, width: "60%", alignSelf: "center" }}>
                      <Text
                        text={itm.item.name.substr(0, 20)}
                        style={{ color: "#000000", fontSize: 12 }}
                      />
                      <Text text={`$${itm.item.price}`} style={{ color: "#000000" }} />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                        top: 20,
                        right: 15,
                      }}
                    >
                      <LinearGradient
                        start={{ x: 0.5, y: 0.0 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5]}
                        style={{
                          height: 26,
                          width: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopLeftRadius: 30,
                          borderBottomLeftRadius: 30,
                          elevation: 10,
                        }}
                        colors={["#4B6CB7", "#182848"]}
                      >
                        <TouchableOpacity
                          onPress={() => setQuantity("less", itm.item)}
                          style={{ padding: 10 }}
                        >
                          <Icon icon="subtract" />
                        </TouchableOpacity>
                      </LinearGradient>
                      <View style={{ padding: 10 }}>
                        <Text
                          text={itm.item.quantity}
                          style={{ color: "#000000", fontWeight: "bold" }}
                        />
                      </View>
                      <LinearGradient
                        start={{ x: 0.5, y: 0.0 }}
                        end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5]}
                        style={{
                          height: 26,
                          width: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderTopRightRadius: 30,
                          borderBottomRightRadius: 30,
                          elevation: 10,
                        }}
                        colors={["#4B6CB7", "#182848"]}
                      >
                        <TouchableOpacity
                          onPress={() => setQuantity("add", itm.item)}
                          style={{ padding: 10 }}
                        >
                          <Icon icon="add" />
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                )
              }}
            />
          </View>
          <View
            style={{ width: "100%", position: "absolute", bottom: Platform.OS === "ios" ? 40 : 0 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                justifyContent: "space-between",
                backgroundColor: "white",
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                top: 10,
                height: 50,
              }}
            >
              <Text text="Total Price:" style={{ color: "#7F7F7F" }} />
              <Text text={totalPrice.toString()} style={{ color: "#7F7F7F" }} />
            </View>
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              colors={["#4B6CB7", "#182848"]}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                height: 100,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text text="Proceed to" />
                <Text text=" checkout" style={{ fontWeight: "bold" }} />
              </View>
              <TouchableOpacity
                disabled={data.length > 0 ? false : true}
                onPress={() => navigation.navigate("checkout", { data: totalPrice, product: productIds })}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: "white",
                  borderRadius: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <Icon icon="right" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
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
              width: "100%",
            }}
          >
            <Image
              source={require("../../../assets/e-cart.png")}
              resizeMode="contain"
              style={{ width: "90%", alignSelf: "center" }}
            />
            <Text
              text="Your Hope Up Cart is Empty"
              style={{ color: "#182848", fontSize: 20, fontWeight: "bold" }}
            />
            <Text text="Looks like you haven't added" style={{ color: "#182848" }} />
            <Text text="anything to your cart yet" style={{ color: "#182848" }} />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("store")}
            style={{
              backgroundColor: "white",
              elevation: 10,
              width: 200,
              height: 50,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <Text text="Start Shopping" style={{ color: "#717171", fontWeight: "bold" }} />
          </TouchableOpacity>
        </View>
      )}
    </Screen>
  )
})
