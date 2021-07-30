import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Image } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const buttongradient: ViewStyle = {
  backgroundColor: "#113394",
  width: 180,
  height: 40,
  borderRadius: 10,
  justifyContent: "center",
  marginTop: 20,
  right: 20,
  flexDirection: "row",
}

export const OrderDetailsScreen = observer(function OrderDetailsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <>
        <Header
          onLeftPress={() => navigation.goBack()}
          leftIcon="back"
          headerText="ORDER DETAILS"
          rightIcon="bell"
          onRightPress={() => navigation.navigate("notifications")}
        />
        <View
          style={{
            padding: 10,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: wp("92%"),
              backgroundColor: "#C5C5C5",
              justifyContent: "center",
              borderRadius: 10,
              height: 300,
            }}
          >
            <TouchableOpacity
              //  key={itm.item._id}
              //  onPress={() => viewProduct(itm.item._id)}
              style={{ padding: 10, alignSelf: "center" }}
            >
              <Image
                source={require("../../../assets/redT.png")}
                resizeMode="contain"
                style={{
                  width: 300,
                  alignSelf: "center",
                  height: 250,
                  borderRadius: 15,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              alignSelf: "center",
              top: 10,
              marginBottom: 10,

              justifyContent: "flex-start",
              width: wp("90%"),
            }}
          >
            <View style={{}}>
              <Text style={{ color: "#000000", fontSize: 18, width: 350 }}>
                Bindas Collection Half Sleeves Printed Tshirt For Men
              </Text>

              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <Text style={{ color: "gray" }}>Delivered on 30 April 2021,Standard</Text>
                <Text
                  text={"$"}
                  style={{
                    color: "#000000",
                    left: 10,
                    width: wp("60%"),
                    textDecorationLine: "line-through",
                    textDecorationColor: "red",
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  top: 20,
                  color: "black",
                }}
              >
                $104.95
              </Text>

              <View
                style={{
                  width: wp("100%"),
                  alignItems: "flex-end",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("returnorder")
                  }}
                >
                  <LinearGradient
                    start={{ x: 0.5, y: 0.0 }}
                    end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5]}
                    colors={["#4B6CB7", "#182848"]}
                    style={buttongradient}
                  >
                    <Image
                      source={require("../../components/icon/icons/heart-red.png")}
                      resizeMode="cover"
                      style={{
                        width: 20,
                        alignSelf: "center",
                        height: 18,
                        right: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        padding: 10,
                        color: "white",
                        textAlign: "center",
                        left: 10,
                      }}
                    >
                      Initiate a Return
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    </Screen>
  )
})
