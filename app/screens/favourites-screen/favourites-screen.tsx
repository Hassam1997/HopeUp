import React, { useState, useEffect, useCallback } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { Header, Icon, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

export const FavouritesScreen = observer(function FavouritesScreen() {
  // Pull in one of our MST stores
  const { products, user } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const [isFav, isSetFav] = useState({ adv: [], product: [], video: [] })
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await products.getMyFavourites(user.user_id)
    console.log(products.MyFavourite, "PFF")
    if (Object.values(products.MyFavourite).length > Object.values(isFav).length) {
      try {
        const { adv, video, product } = products.MyFavourite
        isSetFav({ adv: adv, video: video, product: product })
        setRefreshing(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const { adv, video, product } = products.MyFavourite
        isSetFav({ adv: adv, video: video, product: product })
        setRefreshing(false)
      } catch (error) {
        console.log(error)
      }
      ToastAndroid.show("No more new Favourites available", ToastAndroid.SHORT)
      setRefreshing(false)
    }
  }, [refreshing])

  useEffect(() => {
    products.getMyFavourites(user.user_id)
    if (Object.values(products.MyFavourite).length > 0) {
      console.log(products.MyFavourite, "MPF")
      const { adv, video, product } = products.MyFavourite
      isSetFav({ adv: adv, video: video, product: product })
    }
  }, [])

  const createfavourite = async (product_id: string, type: string) => {
    if (type === "product") {
      let product = {
        user_id: user.user_id,
        product_id: product_id,
        tokken: user.token,
        favourite_type: "product",
      }
      await products.createFavourite(product)
    } else if (type === "video") {
      let video = {
        user_id: user.user_id,
        video_id: product_id,
        tokken: user.token,
        favourite_type: "video",
      }
      await products.createFavourite(video)
    } else {
      let adv = {
        user_id: user.user_id,
        adv_id: product_id,
        tokken: user.token,
        favourite_type: "advertise",
      }
      await products.createFavourite(adv)
    }
    await onRefresh()
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="Favorites"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      {Object.values(isFav).length > 0 ? (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View>
            <Text text="Product"
              style={{
                color: "#010101",
                fontSize: 18,
                fontWeight: "bold",
                textShadowColor: "#7f7f7f",
                textShadowOffset: { width: 3, height: 2 },
                textShadowRadius: 4,
                left: 10
              }}
            />
            <FlatList
              data={isFav.product}
              ListEmptyComponent={<View style={{ padding: 10 }}><Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }} text="No Favourites Found" /></View>}
              renderItem={(itm: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('favouriteProduct', { data: itm })}
                    key={itm.index.toString()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      elevation: 10,
                      margin: 10,

                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={
                        itm.item.product_id.images.length > 0
                          ? { uri: itm.item.product_id.images[0] }
                          : require("../../../assets/redT.png")
                      }
                      resizeMode="contain"
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                    <View style={{ left: 10 }}>
                      <Text
                        text={itm.item.product_id.title.substr(0, 30)}
                        style={{ color: "#000000", fontSize: 15 }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Text style={{ color: "#000000" }}>$ {itm.item.product_id.price}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => createfavourite(itm.item.product_id._id, "product")}
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 10,
                        right: 10,
                        elevation: 10,
                      }}
                    >
                      <Icon icon="favouriter" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <View>
            <Text text="Videos"
              style={{
                color: "#010101",
                fontSize: 18,
                fontWeight: "bold",
                textShadowColor: "#7f7f7f",
                textShadowOffset: { width: 3, height: 2 },
                textShadowRadius: 4,
                left: 10
              }}
            />
            <FlatList
              data={isFav.video}
              // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListEmptyComponent={<View style={{ padding: 10 }}><Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }} text="No Favourites Found" /></View>}
              renderItem={(itm: any) => {
                console.log("fav", itm.item)
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('favouriteVideo', { data: itm })}
                    key={itm.index.toString()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      elevation: 10,
                      margin: 10,
                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 10,
                    }}
                  >
                    {/* <Image
                      source={
                        itm.item.product_id.images.length > 0
                          ? { uri: itm.item.product_id.images[0] }
                          : require("../../../assets/redT.png")
                      }
                      resizeMode="contain"
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    /> */}
                    <View style={{ left: 10 }}>
                      <Text
                        text={itm.item.video_id.title.substr(0, 30)}
                        style={{ color: "#000000", fontSize: 15 }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Text style={{ color: "#000000" }}>{itm.item.video_id.description}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => createfavourite(itm.item.video_id._id, "video")}
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 10,
                        right: 10,
                        elevation: 10,
                      }}
                    >
                      <Icon icon="favouriter" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <View>
            <Text text="Classifieds"
              style={{
                color: "#010101",
                fontSize: 18,
                fontWeight: "bold",
                textShadowColor: "#7f7f7f",
                textShadowOffset: { width: 3, height: 2 },
                textShadowRadius: 4,
                left: 10
              }}
            />
            <FlatList
              data={isFav.adv}
              // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListFooterComponent={<View style={{ height: 100 }} />}
              ListEmptyComponent={<View style={{ padding: 10 }}><Text style={{ fontSize: 18, color: 'black', textAlign: 'center' }} text="No Favourites Found" /></View>}
              renderItem={(itm: any) => {
                console.log("favd", itm.item)
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('favouriteAd', { data: itm })}
                    key={itm.index.toString()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      elevation: 10,
                      margin: 10,
                      padding: 10,
                      backgroundColor: "white",
                      borderRadius: 10,
                    }}
                  >
                    <Image
                      source={
                        itm.item.adv_id.images.length > 0
                          ? { uri: itm.item.adv_id.images[0] }
                          : require("../../../assets/redT.png")
                      }
                      resizeMode="contain"
                      style={{
                        width: 100,
                        height: 100,
                      }}
                    />
                    <View style={{ left: 10 }}>
                      <Text
                        text={itm.item.adv_id.title.substr(0, 30)}
                        style={{ color: "#000000", fontSize: 15 }}
                      />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Text style={{ color: "#000000" }}>$ {itm.item.adv_id.price.toString()}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => createfavourite(itm.item.adv_id._id, "advertise")}
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        borderRadius: 20,
                        height: 40,
                        width: 40,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        top: 10,
                        right: 10,
                        elevation: 10,
                      }}
                    >
                      <Icon icon="favouriter" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </ScrollView>
      ) : (
          <View
            style={{ justifyContent: "center", alignItems: "center", padding: 10, height: "80%" }}
          >
            <View
              style={{ justifyContent: "center", alignItems: "center", padding: 10, height: "60%" }}
            >
              <Image source={require("../../../assets/nofav.png")} />
              <Text text="No Favorites Yet" style={{ color: "#585858" }} />
              <Text text="Tip heart to add to your favourites" style={{ color: "#C5C5C5" }} />
              <Text text="Add Activities to your favorites, see them," style={{ color: "#C5C5C5" }} />
              <Text text="here at a glance." style={{ color: "#C5C5C5" }} />
            </View>
          </View>
        )}
    </Screen>
  )
})
