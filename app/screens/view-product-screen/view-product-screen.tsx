import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
  TextInput,
  Platform,
} from "react-native"
import { Icon, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { SliderBox } from "react-native-image-slider-box"
import FastImage from "react-native-fast-image"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const head: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  elevation: 10,
  padding: 10,
  borderRadius: 10,
  height: 40,
  width: 40,
  justifyContent: "center",
  alignItems: "center",
}

export const ViewProductScreen = observer(function ViewProductScreen({ route }) {
  // Pull in one of our MST stores
  const { user, products, cart } = useStores()
  // OR
  // const rootStore = useStores()
  const [keyword, setKeyword] = useState("")
  const [product, setProduct] = useState<ProductData>()
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [User, setUser] = useState([])
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [cartData, setCartData] = useState([])
  const [quantity, setQuantity] = useState(0)
  const [details, setDetails] = useState("")
  const [question, setQuestion] = useState("")

  // Pull in navigation via hook
  const navigation = useNavigation()

  interface ProductData {
    createdAt: string
    deleted: boolean
    description: string
    flag: []
    images: []
    price: number
    review_user: []
    reviews: []
    tags: []
    title: string
    updatedAt: string
    user: []
    user_id: string
    weight: string
    _id: string
  }

  useEffect(() => {
    console.log(route, " route params")
    let data = route.params.product.data[0]
    setProduct(data)
    setImages(data.images)
    setTitle(data.title)
    setUser(data.user)
    setDescription(data.description)
    setPrice(data.price)
    setDetails(data.details)
    getCart()
    async function getCart() {
      let cart_Data = await cart.getCartItems(user.user_id)
      console.log(cart_Data)
      setCartData(cart_Data.data)
      setQuantity(cart_Data.data.length)
    }
  }, [route])

  const addToCart = async () => {
    let obj = {
      tokken: user.token,
      user_id: user.user_id,
      product_id: route.params.product.data[0]._id,
      quantity: 1,
    }
    console.log(obj,"OO")
    const res = await cart.addToCart(obj)
    console.log(res, "pv")
    setQuantity(res.data.quantity)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <ScrollView style={ROOT}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={head}>
            <Icon icon="chevron_left" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("cart")} style={head}>
            <Icon icon="carte" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "red",
            position: "absolute",
            top: 3,
            right: 3,
            elevation: 10,
            zIndex: 100,
            padding: 5,
            borderRadius: 15,
            height: 25,
            width: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            text={quantity.toString()}
            style={{ color: "white", fontSize: 12, textAlign: "center" }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          {images.length > 0 ? (
            <View>
              <SliderBox
                ImageComponent={FastImage}
                images={images}
                sliderBoxHeight={200}
                onCurrentImagePressed={(index: any) => console.warn(`image ${index} pressed`)}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={20}
                autoplay
                circleLoop
                resizeMethod={"resize"}
                resizeMode={"cover"}
                paginationBoxStyle={{
                  position: "absolute",
                  bottom: 0,
                  padding: 0,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  paddingVertical: 10,
                }}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: "rgba(128, 128, 128, 0.92)",
                }}
                ImageComponentStyle={{ borderRadius: 15, width: "97%", marginTop: 5 }}
                imageLoadingColor="#2196F3"
              />
            </View>
          ) : (
              <Image
                source={require("../../../assets/dummyProduct.png")}
                style={{ width: wp("90%"), height: 250, alignSelf: "center" }}
                resizeMode="contain"
              />
            )}
        </View>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={{ padding: 10, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
        >
          <View style={{ height: 190 }}>
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <Image
                source={
                  User.length > 0 && User[0].profile_picture
                    ? { uri: User[0].profile_picture }
                    : require("../../../assets/avatar.png")
                }
                style={{ height: 50, width: 50, borderRadius: 30 }}
                resizeMode="cover"
              />
              <View style={{ left: 10 }}>
                <Text
                  text={User.length > 0 ? User[0].first_name + " " + User[0].last_name : "John Doe"}
                />
                <Text text="2 weeks ago" style={{ color: "#7F7F7F", fontSize: 10 }} />
              </View>
            </View>
            <View>
              <Text
                text={title.length > 0 ? title : ""}
                style={{ fontSize: 24, fontWeight: "bold" }}
              />
              {/* <Text
                text="New Android Cell Phone US Version  |
                128GB of Storage | Fingerprint ID and 
                Facial Recognition."
              /> */}
              <Text text="0 Ratings | 0 Answered Questions" style={{ top: 10, fontSize: 12 }} />
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            bottom: 40,
          }}
        >
          <View style={{ justifyContent: "space-evenly", padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
              }}
            >
              <Text text="PRICE: " style={{ color: "#000000", margin: 10, fontSize: 18 }} />
              {
                user.user_id === route.params.product.data[0].user_id ?
                  null :
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("chat", {
                        sender_id: product.user_id,
                        avatar: product.user[0].profile_picture,
                        username: product.user[0].username,
                      })
                    }
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "white",
                      elevation: 10,
                      height: 40,
                      width: 100,
                      padding: 10,
                      borderRadius: 20,
                      shadowColor: "#C5C5C5",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 12,
                      right: Platform.OS === "android" ? 10 : 15,
                    }}
                  >
                    <Icon icon="chatBubble" />
                    <Text text="Chat" style={{ color: "black", left: 10 }} />
                  </TouchableOpacity>
              }
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottomColor: color.palette.offWhite,
                borderBottomWidth: 3,
                padding: 10,
              }}
            >
              <Text
                text={price > 0 ? "$" + " " + price.toString() : "Not Available"}
                style={{ fontSize: 24, fontWeight: "bold", color: "#000000", bottom: 30 }}
              />
              {/* <Text
                text={price > 0 ? price.toString() : "$104.5"}
                style={{
                  textDecorationLine: "line-through",
                  textDecorationColor: "red",
                  color: "#C5C5C5",
                  marginRight: 30,
                }}
              /> */}
              {
                user.user_id === route.params.product.data[0].user_id ?
                  null :
                  <LinearGradient
                    start={{ x: 0.5, y: 0.0 }}
                    end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5]}
                    colors={["#4B6CB7", "#182848"]}
                    style={{ padding: 10, borderRadius: 10, width: 140, bottom: 5 }}
                  >
                    <TouchableOpacity
                      onPress={() => addToCart()}
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon icon="bag" />
                      <Text text="Add to Cart" style={{ left: 10, fontWeight: "bold" }} />
                    </TouchableOpacity>
                  </LinearGradient>
              }
            </View>
          </View>
          <View>
            <Text
              text="Details"
              style={{ color: "#000000", margin: 10, fontSize: 18, fontWeight: "bold" }}
            />
            <View
              style={{
                borderBottomColor: color.palette.offWhite,
                borderBottomWidth: 3,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  padding: 10,
                  width: "90%",
                }}
              >
                <Text text={"\u2B24"} style={{ color: "black" }} />
                <Text text={details} style={{ color: "#000000", left: 10, textAlign: "justify" }} />
              </View>
            </View>
          </View>
          <View>
            <Text text="ABOUT THIS ITEM" style={{ color: "#182848", margin: 10, fontSize: 18 }} />
            <View
              style={{
                borderBottomColor: color.palette.offWhite,
                borderBottomWidth: 3,
                padding: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  padding: 10,
                  width: "90%",
                }}
              >
                <Text text={"\u2B24"} style={{ color: "black" }} />
                <Text
                  text={
                    description.length > 0
                      ? description
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's bstandard dummy text ever since the 1500s."
                  }
                  style={{ color: "#000000", left: 10, textAlign: "justify" }}
                />
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  padding: 10,
                  width: "90%",
                }}
              >
                <Text text={"\u2B24"} style={{ color: "#C5C5C5" }} />
                <Text
                  text={
                    description.length > 0
                      ? description
                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's bstandard dummy text ever since the 1500s."
                  }
                  style={{ color: "#000000", left: 10, textAlign: "justify" }}
                />
              </View> */}
            </View>
          </View>
          <View>
            <Text
              text="CUSTOMER QUESTIONS"
              style={{ color: "#182848", margin: 10, fontSize: 18 }}
            />
            <View
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                alignItems: "center",
                width: "80%",
                alignSelf: "center",
                height: 40,
                borderRadius: 50,
                elevation: 10,
                marginVertical: 10,
              }}
            >
              <View style={{ padding: 10 }}>
                <Icon icon="search" />
              </View>
              <TextInput
                placeholder="Have a question? Search For Answers"
                value={keyword}
                onChangeText={(e) => setKeyword(e)}
                style={{ width: "80%", height: 35, fontSize: 12 }}
              />
            </View>
            <View
              style={{
                borderBottomColor: color.palette.offWhite,
                borderBottomWidth: 3,
                padding: 10,
              }}
            >
              <View
                style={{ padding: 10, borderWidth: 1, borderColor: "#707070", borderRadius: 10 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    padding: 10,
                    width: "90%",
                  }}
                >
                  <Text text={"q:"} style={{ color: "black", fontWeight: "bold" }} />
                  <Text
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's bstandard dummy text ever since the 1500s."
                    style={{ color: "#000000", left: 10, textAlign: "justify", fontWeight: "bold" }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    padding: 10,
                    width: "90%",
                  }}
                >
                  <Text text={"a:"} style={{ color: "black", fontWeight: "bold" }} />
                  <Text
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's bstandard dummy text ever since the 1500s."
                    style={{ color: "#C5C5C5", left: 10, textAlign: "justify" }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    padding: 10,
                    width: "90%",
                  }}
                >
                  <Text text={"q:"} style={{ color: "black", fontWeight: "bold" }} />
                  <Text
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's bstandard dummy text ever since the 1500s."
                    style={{ color: "#000000", left: 10, textAlign: "justify", fontWeight: "bold" }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    padding: 10,
                    width: "90%",
                  }}
                >
                  <Text text={"a:"} style={{ color: "black", fontWeight: "bold" }} />
                  <Text
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's bstandard dummy text ever since the 1500s."
                    style={{ color: "#C5C5C5", left: 10, textAlign: "justify" }}
                  />
                </View>
              </View>
              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: wp("90%"),
                  alignSelf: "center",
                  justifyContent: "center",
                  // elevation: 10,
                  bottom: 0,
                  // backgroundColor: "white",
                  position: "absolute",
                  paddingVertical: 10,
                  marginVertical: 10
                }}
              >{user.myProfile.profile_picture ?
                <Image source={{ uri: user.myProfile.profile_picture }} style={{ height: 40, width: 40, borderRadius: 20 }} />
                : null
                }
                <View style={{ left: 10 }}>
                  <TextInput
                    placeholder="Ask a Question"
                    value={question}
                    onChangeText={(e) => setQuestion(e)}
                    onSubmitEditing={handleClick}
                    clearButtonMode="while-editing"
                    returnKeyType="done"
                    style={{
                      width: wp("65%"),
                      borderRadius: 20,
                      elevation: 4,
                      height: 40,
                      backgroundColor: "white",
                    }}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  )
})
