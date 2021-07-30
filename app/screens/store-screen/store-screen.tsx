import React, { useState, useEffect, useCallback } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
} from "react-native"
import { Header, Screen, Text, SearchBar, ReportProduct, Icon } from "../../components"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Flag from "../../../assets/flag-.svg"
import Chat from "../../../assets/chat(1).svg"
import axios from "axios"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
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

export const StoreScreen = observer(function StoreScreen() {
  // Pull in one of our MST stores
  const { products, user } = useStores()
  // OR
  // const rootStore = useStores()
  const [keyword, setKeyword] = useState("")
  const [isLike, isSetLike] = useState(true)
  const [isShowModel, isSetModel] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [isProductId, isSetProductId] = useState("")
  const [isFlag, isSetFlag] = useState([])
  const [isData, isSetData] = useState([])
  // const [category, setCategory] = useState(0)

  const toggleLike = () => {
    isSetLike(!isLike)
  }

  useEffect(() => {
    if (products.data.length > 0) {
      isSetData(products.data)
    }
    console.log("array3", isData)
  }, [])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    console.log(user.user_id)
    await products.getAllProduct()
    if (products.data.length > isData.length) {
      try {
        isSetData(products.data)
        setRefreshing(false)
      } catch (error) {
        console.error(error)
      }
    } else {
      ToastAndroid.show("No more new Products available", ToastAndroid.SHORT)
      setRefreshing(false)
    }
  }, [refreshing])

  const viewProduct = async (product_id: any) => {
    const productData = await products.getSpecificProduct(product_id)
    navigation.navigate("viewProduct", { product: productData })
  }

  const viewComment = async (product_id: any) => {
    const productData = await products.getSpecificProduct(product_id)
    navigation.navigate("productcomment", { product: productData })
  }

  const createfavourite = async (product_id: any) => {
    isSetLike(!isLike)
    isSetProductId(product_id)
    let product = {
      user_id: user.user_id,
      product_id: product_id,
      tokken: user.token,
      favourite_type: "product",
    }
    await products.createFavourite(product)
    await likeProduct(product_id)
  }

  const reportProduct = (product_id: any) => {
    isSetProductId(product_id)
    isSetModel(true)
  }

  const hide = () => {
    isSetModel(false)
  }

  const apiResponse = () => {
    if (keyword != "") {
      products.search(keyword)
      isSetFlag(products.searchBar)
      console.log("array", isFlag.length)
    } else {
      isSetFlag([])
      console.log("array2", isFlag.length)
    }
  }

  const reportContent = async (category: any) => {
    let product = {
      user_id: user.user_id,
      product_id: isProductId,
      flag_type: "product",
      tokken: user.token,
      category: category,
    }
    await products.postReport(product)
    isSetModel(false)
  }
  // Pull in navigation via hook
  const navigation = useNavigation()

  const likeProduct = async (id: any) => {
    try {
      const response = await axios.put(`http://3.14.145.118:4000/api/product/like/${id}`, {
        likes: [user.user_id],
      })
      console.log(response, "RESP")
      if (response.status === 200) {
        await onRefresh()
        products.getMyFavourites(user.user_id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="menu"
        onLeftPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        headerText="Store"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View>
        <SearchBar
          keyword={keyword}
          setKeyword={(e: any) => setKeyword(e)}
          ApiResponse={apiResponse}
          setFlag={(e: any) => isSetFlag(e)}
        />
        <FlatList
          data={isFlag.length > 0 ? isFlag : isData}
          keyExtractor={(item: any) => item._id}
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
                text="There are currently no products in store."
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={<View style={{ height: 180 }} />}
          renderItem={(itm: any) => {
            console.log(itm, "item")
            return (
              <>
                <View
                  style={{
                    padding: 10,
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "flex-start",
                      width: "98%",
                      alignSelf: "center",
                      top: 10,
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      source={
                        itm.item.user_id.profile_picture !== null
                          ? { uri: itm.item.user_id.profile_picture }
                          : require("../../../assets/dummyProduct.png")
                      }
                      style={{ height: 50, width: 50, borderRadius: 50 }}
                      resizeMode="cover"
                    />
                    <View style={{ left: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                        }}
                      >
                        <Text
                          text={itm.item.title}
                          style={{
                            color: "#000000",
                            fontSize: 18,
                            width: wp("68%"),
                            fontWeight: "bold",
                          }}
                        />
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                        <Text style={{ color: "#000000" }}>${itm.item.price}</Text>
                        {/* <Text
                          text={itm.item.user_id.first_name + " " + itm.item.user_id.last_name}
                          style={{
                            color: "#000000",
                            left: 10,
                            width: wp("60%"),
                            textDecorationLine: "line-through",
                            textDecorationColor: "red",
                          }}
                        /> */}
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      width: wp("92%"),
                      backgroundColor: "#C5C5C5",
                      justifyContent: "center",
                      borderRadius: 5,
                      height: 300,
                    }}
                  >
                    <TouchableOpacity
                      key={itm.item._id}
                      onPress={() => viewProduct(itm.item._id)}
                      style={{ padding: 10, alignSelf: "center" }}
                    >
                      <Image
                        source={
                          itm.item.images.length > 0
                            ? { uri: itm.item.images[0] }
                            : require("../../../assets/dummyProduct.png")
                        }
                        resizeMode="contain"
                        style={{
                          width: 300,
                          alignSelf: "center",
                          height: 250,
                          borderRadius: 10,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        width: wp("30%"),
                        top: 10,
                        marginBottom: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 30,
                      }}
                      key={itm.item._id}
                      onPress={() => createfavourite(itm.item._id)}
                    >
                      <View>
                        <Icon
                          icon={itm.item.likes.includes(user.user_id) ? "favouriter" : "like"}
                        />
                      </View>
                      <Text
                        text={`${itm.item.likes.length.toString()} Likes`}
                        style={{ color: "#000000", fontSize: 12, left: 10 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={itm.item._id}
                      onPress={() => viewComment(itm.item._id)}
                      style={{
                        flexDirection: "row",
                        width: wp("30%"),
                        top: 10,
                        marginBottom: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 30,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => viewComment(itm.item._id)}
                        style={{
                          flexDirection: "row",
                          top: 10,
                          marginBottom: 20,
                          justifyContent: "center",
                          height: 20,
                        }}
                      >
                        <Chat height={18} width={18} />
                        <Text
                          text="Comments"
                          style={{ color: "#000000", fontSize: 12, left: 10 }}
                        />
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={itm.item._id}
                      onPress={() => reportProduct(itm.item._id)}
                      style={{
                        flexDirection: "row",
                        width: wp("30%"),
                        top: 10,
                        marginBottom: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 30,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => reportProduct(itm.item._id)}
                      >
                        <Flag />
                      </TouchableOpacity>
                      <Text text="Report" style={{ color: "#000000", fontSize: 12, left: 10 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )
          }}
        />
      </View>
      {isShowModel === true ? (
        <ReportProduct
          setModel={isShowModel}
          closeModel={(e: any) => reportContent(e)}
          ishide={hide}
        />
      ) : null}
    </Screen>
  )
})
