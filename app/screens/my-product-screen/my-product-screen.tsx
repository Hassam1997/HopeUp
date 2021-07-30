import React, { useState, useEffect, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Platform,
  RefreshControl,
  ToastAndroid,
} from "react-native"
import { Header, Icon, Screen, SearchBar, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { SwipeListView } from "react-native-swipe-list-view"
import LinearGradient from "react-native-linear-gradient"

const { height: viewportHeight, width: viewportWidth } = Dimensions.get("window")

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const rowFront: ViewStyle = {
  backgroundColor: "white",
  margin: 10,
  padding: 10,
  height: 100,
  elevation: 10,
  shadowColor: "#C5C5C5",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 12,
}

const rowBack: ViewStyle = {
  backgroundColor: "white",
  margin: 10,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  height: 100,
  borderRadius: 10,
  alignSelf: "flex-end",
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
  height: 150,
  padding: 10,
  backgroundColor: "white",
  width: "88%",
  alignSelf: "center",
  elevation: 10,
  borderRadius: 10,
  marginTop: Platform.OS == "ios" ? 240 : 250,
}

const gradient: ViewStyle = {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  height: 55,
  width: "90%",
  alignSelf: "center",
  borderRadius: 30,
}

export const MyProductScreen = observer(function MyProductScreen() {
  // Pull in one of our MST stores
  const { products, user } = useStores()

  useEffect(() => {
    console.log("run")
    getData()
    async function getData() {
      await products.getMyProduct(user.user_id)
      if (products.MyProductData.length > 0) {
        setMyData(products.MyProductData)
      }
    }
  }, [])

  const rowRef = useRef(null)
  // OR
  // const rootStore = useStores()
  const [isMyData, setMyData] = useState([])
  const [keyword, setKeyword] = useState("")
  const [deleteModal, setDeleteModal] = useState(false)
  const [productID, setProductId] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const openRowRef = useRef(null)

  const closeOpenRow = () => {
    console.log(openRowRef)
    if (openRowRef.current && openRowRef.current.closeRow) {
      openRowRef.current.closeRow()
    }
  }

  const onRowDidOpen = (rowKey: any, rowMap: any) => {
    console.log(rowKey, rowMap)
    openRowRef.current = rowMap[rowKey]
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await products.getMyProduct(user.user_id)
    if (products.MyProductData.length > isMyData.length) {
      try {
        setMyData(products.MyProductData)
        setRefreshing(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        setMyData(products.MyProductData)
        setRefreshing(false)
      } catch (error) {
        console.log(error)
      }
      ToastAndroid.show("You have not uploaded any product", ToastAndroid.SHORT)
      setRefreshing(false)
    }
  }, [refreshing])

  function deleteProduct(product_id: any) {
    setProductId(product_id)
    setDeleteModal(true)
    if (rowRef.current && rowRef.current.closeRow) {
      rowRef.current.closeRow()
    }
  }

  function confirmProduct() {
    closeOpenRow()
    setDeleteModal(false)
    let arr = [];
    isMyData.forEach(element => {
      if (element._id === productID) return
      arr.push(element)
    })
    setMyData(arr)
    products.deleteProduct(productID, user.token)
    products.getMyProduct(user.user_id)
    if (products.MyProductData.length > 0) {
      setMyData(products.MyProductData)
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="MY PRODUCT"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      {/* <ScrollView> */}

      <SearchBar keyword={keyword} setKeyword={(e: any) => setKeyword(e)} />
      <SwipeListView
        data={isMyData}
        friction={10}
        tension={45}
        closeOnRowPress={true}
        onRowDidOpen={onRowDidOpen}
        speed={15}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListFooterComponent={<View style={{ height: 80, width: "100%" }} />}
        ListEmptyComponent={
          <View
            style={{
              height: "100%",
              width: "100%",
              padding: 10,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "700",
                fontStyle: "normal",
                lineHeight: 30,
                letterSpacing: 1.2,
                textAlign: "center",
              }}
              text="You have currently no products in the store."
            />
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              colors={["#4B6CB7", "#182848"]}
              style={gradient}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("sellProduct")}
                style={{ padding: 10, borderRadius: 10 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: 30,
                    letterSpacing: 1.2,
                  }}
                  text="Want to sell a product?"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
        renderItem={(data: any, rowMap) => {
          return (
            <View
              key={data.item._id}
              style={[{ flexDirection: "row", alignItems: "center", borderRadius: 10 }, rowFront]}
            >
              <Image
                source={
                  data.item.images.length > 0
                    ? { uri: data.item.images[0] }
                    : require("../../../assets/PlayStore.png")
                }
                resizeMode="contain"
                style={{
                  width: 100,
                  height: 100,
                }}
              />
              <View style={{ left: 10 }}>
                <Text style={{ color: "black" }}>{data.item.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text text={data.item.price} style={{ color: "black" }} />
                  <Text
                    text={data.item.old_price}
                    style={{
                      color: "black",
                      textDecorationLine: "line-through",
                      textDecorationColor: "red",
                      left: 10,
                    }}
                  />
                </View>
              </View>
            </View>
          )
        }}
        renderHiddenItem={(data, rowMap) => {
          return (
            <View ref={rowRef} key={data.item._id} style={rowBack}>
              <View style={{ flexDirection: "row", alignItems: "center", height: 100 }}>
                <TouchableOpacity
                  onPress={() => {
                    closeOpenRow(), navigation.navigate("editProduct", { data: data.item })
                  }}
                  style={{
                    backgroundColor: "#009D0A",
                    padding: 10,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    borderRadius: 10,
                    margin: 10,
                  }}
                >
                  <Icon icon="edit" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteProduct(data.item._id)}
                  style={{
                    backgroundColor: "#DC1635",
                    padding: 10,
                    height: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    borderRadius: 10,
                  }}
                >
                  <Icon icon="delete" />
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
        // leftOpenValue={95}
        rightOpenValue={-180}
      />
      {/* </ScrollView> */}
      <Modal visible={deleteModal} transparent={true} animationType={"slide"}>
        <View style={filterMain}>
          <View style={filterSub}>
            <View>
              <Text
                text="Are You Sure You Want To Delete This Product?"
                style={{ color: "#010101", textAlign: "center" }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  padding: 10,
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setDeleteModal(false)}
                  style={{
                    backgroundColor: "#C5C5C5",
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text text="Cancel" />
                </TouchableOpacity>
                <LinearGradient
                  start={{ x: 0.5, y: 0.0 }}
                  end={{ x: 0.5, y: 1.0 }}
                  locations={[0, 0.5, 0.6]}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    width: 80,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  colors={["#4B6CB7", "#182848"]}
                >
                  <TouchableOpacity onPress={() => confirmProduct()}>
                    <Text text="Delete" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  )
})
