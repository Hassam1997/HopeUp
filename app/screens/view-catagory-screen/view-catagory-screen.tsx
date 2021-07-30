import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, FlatList, TouchableOpacity } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { useStores } from "../../models"
import { color } from "../../theme"
import { adsListExpand } from "../../utils/classified-categories"
import { ScrollView } from "react-native-gesture-handler"
import { Item } from "react-native-paper/lib/typescript/components/List/List"

const ROOT: ViewStyle = {
  backgroundColor: color.backgroundtheme,
  flex: 1,
}

export const ViewCatagoryScreen = observer(function ViewCatagoryScreen(props) {
  // Pull in one of our MST stores
  const { classifieds } = useStores()
  console.log(props)
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  function adNavigation(item: any) {
    let data = props.route.params.Item
    data.sub_category = item.id
    if (classifieds.acion === "add") {
      navigation.navigate("createAd", { data: data })
    } else {
      navigation.navigate("classifiedsHome", { data: data })
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText={props.route.params.Item.category}
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View
        style={{
          height: 50,
          backgroundColor: color.backgroundtheme,
          justifyContent: "center",
        }}
      >
        <Text
          text={props.route.params.Item.category}
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
            paddingLeft: 16,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView>
          <FlatList
            data={adsListExpand[props.route.params.Index].content}
            renderItem={({ item }) => {
              console.log(item, "i")
              return (
                <>
                  <TouchableOpacity
                    onPress={() => adNavigation(item)}
                    style={{
                      height: 50,
                      width: wp("90%"),
                      alignSelf: "center",
                      justifyContent: "center",
                      backgroundColor: "white",
                      marginBottom: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{
                        paddingLeft: 10,
                        fontSize: 18,
                        color: "black",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </>
              )
            }}
          />
        </ScrollView>
      </View>
      <Text></Text>
    </Screen>
  )
})
