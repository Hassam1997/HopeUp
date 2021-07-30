import React, { useState, useEffect } from "react"
import {
  TextStyle,
  View,
  ViewStyle,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { color, typography } from "../../theme"
import { Text, Icon, LocalSvg } from "../"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useNavigation } from "@react-navigation/native"
import date from "date-and-time"
import User from '../../../assets/User.svg'

const CONTAINER: ViewStyle = {
  flex: 1,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface CommentProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  keyword?: string

  setKeyword?: (e: any) => any

  ApiComment?: () => any

  UserReview?: []

  showComment?: []

  isproductId?: string

  User?: []
}

/**
 * Describe your component here
 */
export const Comment = observer(function Comment(props: CommentProps) {
  const { style, keyword, setKeyword, ApiComment, UserReview, showComment, User } = props

  const [isUser, setUser] = useState([])
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)

  const { user } = useStores()

  useEffect(() => {
    console.log(" c")
    const matchedItemsArray = []
    console.log(UserReview, showComment)
    if (UserReview.length > 0 && showComment.length > 0) {
      UserReview.map((item) => {
        showComment.map((item1) => {
          if (item1.user_id === item._id) {
            matchedItemsArray.push({
              first_name: item.first_name,
              createdAt: item1.createdAt,
              profile_picture: item.profile_picture,
              review: item1.review,
            })
            console.log("End", matchedItemsArray)
            setUser(matchedItemsArray)
          }
        })
      })
    } else {
      setUser([])
    }
  }, [props])

  const handleClick = () => {
    const Comment = []
    User.map((item) => {
      console.log("Log", item)
      Comment.push({
        first_name: item.first_name,
        profile_picture: item.profile_picture,
        createdAt: "2-days ago",
        review: keyword,
      })
    })
    setUser([...isUser, ...Comment])
    ApiComment()
  }

  return (
    <View style={[CONTAINER, style]}>
      <FlatList
        data={isUser}
        ListFooterComponent={<View style={{ height: 90 }} />}
        renderItem={(itm: any) => {
          const _date = new Date(itm.item.createdAt)
          return (
            <>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  width: "90%",
                  borderBottomColor: "lightgray",
                  borderBottomWidth: 1,
                  alignSelf: "center",
                }}
              >
                <View>
                  <Image
                    source={{ uri: itm.item.profile_picture }}
                    style={{ height: 40, width: 40, borderRadius: 20 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text
                    text={itm.item.first_name + " - " + date.format(_date, "ddd, MMM DD YYYY")}
                    style={{ color: "grey", left: 10 }}
                  />
                  <Text text={itm.item.review} style={{ color: "black", left: 10, fontSize: 12 }} />
                  {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => setLikes(likes + 1)} style={{ padding: 10 }}>
                      <Icon icon="likec" />
                    </TouchableOpacity>
                    <Text text={likes.toString()} style={{ color: "black", fontSize: 14 }} />
                    <TouchableOpacity
                      onPress={() => setDislikes(dislikes + 1)}
                      style={{ padding: 10 }}
                    >
                      <Icon icon="dislike" />
                    </TouchableOpacity>
                    <Text text={dislikes.toString()} style={{ color: "black", fontSize: 14 }} />
                    <TouchableOpacity style={{ padding: 10 }}>
                      <Icon icon="reply" />
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
            </>
          )
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: wp("100%"),
          alignSelf: "center",
          justifyContent: "center",
          elevation: 10,
          bottom: 0,
          backgroundColor: "white",
          position: "absolute",
          paddingVertical: 10,
        }}
      >
        {user.myProfile.profile_picture ? (
          <Image
            source={{ uri: user.myProfile.profile_picture }}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
        ) : <LocalSvg Component={User} heighted={40} widthed={40} />}
        <View style={{ left: 10 }}>
          <TextInput
            placeholder="Add a Public Comment"
            value={keyword}
            onChangeText={(e) => setKeyword(e)}
            onSubmitEditing={handleClick}
            clearButtonMode="while-editing"
            returnKeyType="done"
            style={{
              width: wp("82%"),
              borderRadius: 20,
              elevation: 4,
              height: 40,
              backgroundColor: "white",
            }}
          />
        </View>
      </View>
    </View>
  )
})
