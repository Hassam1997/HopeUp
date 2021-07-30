import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
  FlatList,
  TextInput,
  Platform,
} from "react-native"
import { Icon, Screen, Text, Comment } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Like from "../../../assets/bx-like-1.svg"
import Dislike from "../../../assets/bxlike.svg"
import Flag from "../../../assets/flag-.svg"
import Chat from "../../../assets/chat(1).svg"

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

export const ProductCommentScreen = observer(function ProductCommentScreen({ route }) {
  // Pull in one of our MST stores
  const { products, user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook

  const [keyword, setKeyword] = useState("")
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [User, setUser] = useState([])
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [cartData, setCartData] = useState([])
  const [isproductId, isSetProductId] = useState("")
  const [isuserId, isSetUserId] = useState("")
  const [showComment, setShowComment] = useState([])
  const [review, setReview] = useState([])
  const [reviewUser, setReviewUser] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    console.log(route.params.product.data[0], " route params")
    let data = route.params.product.data[0]
    const viewComment = async (product_id: any) => {
      const productData = await products.getSpecificProduct(product_id)
      console.log(productData, "PD")
      setReview(productData.data[0].reviews), setReviewUser(productData.data[0].review_user)
    }
    viewComment(data._id)
    setImages(data.images)
    setTitle(data.title)
    setDescription(data.description)
    setPrice(data.price)
    isSetProductId(data._id)
    isSetUserId(user.user_id)
    setUser(data.user)
    setShowComment([products.comment])
  }, [route])

  const commentProduct = async () => {
    let product = {
      tokken: user.token,
      product_id: isproductId,
      user_id: isuserId,
      review: keyword,
    }
    await products.productComment(product)
    const productData = await products.getSpecificProduct(isproductId)
    setReview(productData.data[0].reviews)
    setReviewUser(productData.data[0].review_user)
    setKeyword("")
  }

  function goBack() {
    setReview([])
    setReviewUser([])
    navigation.goBack()
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#EFEFEF",
          }}
        >
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity onPress={() => goBack()} style={head}>
              <Icon icon="chevron_left" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: wp("94%"),
              backgroundColor: "#C5C5C5",
              justifyContent: "center",
              borderRadius: 10,
              height: 280,
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Image
                source={
                  images.length > 0
                    ? { uri: images[0] }
                    : require("../../../assets/dummyProduct.png")
                }
                resizeMode="contain"
                style={{
                  width: 340,
                  alignSelf: "center",
                  height: 200,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp("94%"),
              justifyContent: "center",
              alignSelf: "center",
              top: 5,
            }}
          >
            <Text text={title} style={{ fontSize: 20, color: "black" }} />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: wp("94%"),
              justifyContent: "flex-start",
              alignSelf: "center",
              alignItems: "center",
              height: 30,
              top: 10,
            }}
          >
            <Image
              source={require("../../components/icon/icons/heart-red.png")}
              resizeMode="cover"
              style={{
                width: 20,
                alignSelf: "center",
                height: 18,
              }}
            />
            <Text text="940K Likes" style={{ color: "#000000", fontSize: 12, left: 10 }} />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 25,
              width: wp("94%"),
              alignSelf: "center",
              marginBottom: 5,
            }}
          >
            <Image
              source={
                User.length > 0 && User[0].profile_picture
                  ? { uri: User[0].profile_picture }
                  : require("../../../assets/avatar.png")
              }
              style={{ height: 50, width: 50, borderRadius: 30 }}
            />
            <View style={{ left: 10 }}>
              <Text
                text={User.length > 0 ? User[0].first_name + " " + User[0].last_name : "John Doe"}
                style={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 0.2,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#000000", fontSize: 14, left: 10 }}>
            Comments {review.length.toString()}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "flex-end",
            width: wp("100%"),
            flex: 1.5,
          }}
        >
          <Comment
            keyword={keyword}
            setKeyword={(e: any) => setKeyword(e)}
            ApiComment={commentProduct}
            UserReview={reviewUser}
            showComment={review}
            isproductId={isproductId}
            User={User}
          />
        </View>
      </View>
    </Screen>
  )
})
