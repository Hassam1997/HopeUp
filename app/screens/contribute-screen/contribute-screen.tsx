import React from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import BusinessGrowth from "../../../assets/BusinessGrowthCon.svg"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const title: TextStyle = { fontSize: 24, fontWeight: "bold", right: 30 }

export const ContributeScreen = observer(function ContributeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="CONTRIBUTE"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BusinessGrowth alignItem={"center"} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("contributeformscreen")
          }}
        >
          <View
            style={{
              width: wp("80%"),
              backgroundColor: "white",
              alignItems: "center",
              elevation: 4,
              borderRadius: 10,
              marginTop: 10,
              height: 50,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#3F64A4",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              BUSINESS GROWTH
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  )
})
