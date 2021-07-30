import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ScrollView, TextStyle, TextInput, TouchableOpacity } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, typography } from "../../theme"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import ReactChipsInput from "react-native-chips"
import LinearGradient from "react-native-linear-gradient"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 15,
  color: "#49669E",
  paddingLeft: 4,
  fontWeight: "bold",
}

const gradient: ViewStyle = {
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  height: 45,
  width: wp("90%"),
  alignSelf: "center",
  borderRadius: 10,
}

export const RepostClassifiedScreen = observer(function RepostClassifiedScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState([])

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <View style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}>
        <Header onLeftPress={() => navigation.goBack()} leftIcon="back" headerText="Repost AD" />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View
            style={{
              width: wp("80%"),
              alignSelf: "center",
            }}
          >
            <Text style={[TEXT]}>Title</Text>
          </View>

          <View>
            <TextInput
              placeholder={"Title"}
              value={title}
              onChangeText={(e: any) => setTitle(e)}
              placeholderTextColor="#707070"
              style={{
                width: wp("80%"),
                alignSelf: "center",
                fontSize: 15,
                height: 40,
                borderBottomWidth: 1,
                borderBottomColor: "#707070",
              }}
            />
          </View>
          <View
            style={{
              width: wp("80%"),
              alignSelf: "center",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              height: 40,
            }}
          >
            <Text style={[TEXT]}>Description</Text>
          </View>

          <View>
            <TextInput
              placeholder={"Description"}
              value={description}
              onChangeText={(e: any) => setDescription(e)}
              placeholderTextColor="#707070"
              style={{
                width: wp("80%"),
                alignSelf: "center",
                fontSize: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#707070",
              }}
            />
          </View>
          <View
            style={{
              width: wp("80%"),
              alignSelf: "center",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              height: 40,
            }}
          >
            <Text style={[TEXT]}>Tags</Text>
          </View>

          <View style={{ width: wp("85%"), alignSelf: "center" }}>
            <ReactChipsInput
              label="Tags"
              initialChips={tags}
              onChangeChips={(chips: any) => setTags(chips)}
              alertRequired={true}
              chipStyle={{ borderColor: "blue", backgroundColor: "grey" }}
              inputStyle={{ fontSize: 16 }}
              labelStyle={{
                color: "#707070",
                fontSize: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#000000",
                width: wp("80%"),
                alignSelf: "center",
              }}
              labelOnBlur={{ color: "#666" }}
            />
          </View>
          <View>
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.5]}
              colors={["#4B6CB7", "#182848"]}
              style={gradient}
            >
              <TouchableOpacity onPress={() => {}}>
                <Text text={`Total $5.00`} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Screen>
  )
})
