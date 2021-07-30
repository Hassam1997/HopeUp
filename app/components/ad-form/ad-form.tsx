import React, { useState } from "react"
import { TextStyle, View, ViewStyle, TextInput, Image, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import LinearGradient from "react-native-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { color, typography } from "../../theme"
import { Text } from "../"
import ReactChipsInput from "react-native-chips"

const CONTAINER: ViewStyle = {
  height: 470,
  justifyContent: "center",
  elevation: 5,
  backgroundColor: "white",
  width: wp("90%"),
  borderRadius: 15,
  bottom: 25,
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
  borderBottomLeftRadius: 15,
  borderBottomRightRadius: 15,
}

export interface AdFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  btnTxt?: string

  description?: string

  setDescription?: (e: any) => any

  title?: string

  setTitle?: (e: any) => any

  price?: string

  setPrice?: (e: any) => any

  tags?: []

  setTags?: (e: []) => any

  uploadAd?: () => any
}

/**
 * Describe your component here
 */
export const AdForm = observer(function AdForm(props: AdFormProps) {
  const {
    style,
    btnTxt,
    title,
    setTitle,
    description,
    setDescription,
    tags,
    setTags,
    price,
    setPrice,
    uploadAd,
  } = props
  const navigation = useNavigation()

  return (
    <View style={[CONTAINER, style]}>
      <View
        style={{
          height: 450,
          backgroundColor: "white",
          width: wp("80%"),
          alignSelf: "center",
          marginTop: 20,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            width: wp("80%"),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={[TEXT]}>Title</Text>
          <Image
            source={require("../../components/icon/icons/Trash.png")}
            style={{ height: 25 }}
            resizeMode="contain"
          />
        </View>

        <View>
          <TextInput
            placeholder={"Title"}
            value={title}
            onChangeText={(e: any) => setTitle(e)}
            placeholderTextColor="#707070"
            style={{
              width: wp("80%"),
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
              fontSize: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#707070",
            }}
          />
        </View>
        <View
          style={{
            width: wp("80%"),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: 40,
          }}
        >
          <Text style={[TEXT]}>Pice</Text>
        </View>

        <View>
          <TextInput
            placeholder={"Price"}
            value={price}
            onChangeText={(e: any) => setPrice(e)}
            placeholderTextColor="#707070"
            style={{
              width: wp("80%"),
              fontSize: 15,
              borderBottomWidth: 1,
              borderBottomColor: "#707070",
            }}
          />
        </View>
        {/* <View
          style={{
            width: wp("80%"),
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: 40,
          }}
        >
          <Text style={[TEXT]}>Tags</Text>
        </View> */}

        <View style={{ width: wp("80%"), alignSelf: "center" }}>
          <ReactChipsInput
            label="Tags"
            initialChips={tags}
            onChangeChips={(chips: any) => setTags(chips)}
            alertRequired={true}
            chipStyle={{ borderColor: "black", backgroundColor: "grey" }}
            inputStyle={{ fontSize: 16 }}
            labelStyle={{
              fontFamily: typography.primary,
              fontSize: 15,
              color: "#49669E",
              paddingLeft: 4,
              fontWeight: "bold",
              borderBottomWidth: 1,
              borderBottomColor: "#000000",
              width: wp("80%"),
              alignSelf: "center",
            }}
            labelOnBlur={{ color: "#666" }}
          />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          zIndex: 999999999999,
        }}
      >
        <TouchableOpacity onPress={() => {}}>
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.7]}
            colors={["#4B6CB7", "#182848"]}
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={() => uploadAd()}>
              <Image
                source={require("../../components/icon/icons/Download.png")}
                style={{ height: 25 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.4,
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          position: "absolute",
          bottom: 0,
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={gradient}
        >
          <TouchableOpacity onPress={() => uploadAd()}>
            <Text text={btnTxt} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
})
