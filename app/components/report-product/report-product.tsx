import React, { useState } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity, FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { Modal } from "react-native-paper"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import LinearGradient from "react-native-linear-gradient"
import Report from "../../../assets/report.svg"
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

const gradient: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  height: 45,
  width: wp("90%"),
  alignSelf: "center",
}

const buttongradient: ViewStyle = {
  backgroundColor: "#113394",
  width: 100,
  height: 30,
  borderRadius: 20,
  justifyContent: "center",
  marginTop: 20,
  bottom: 10,
}

export interface ReportProductProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  setModel?: boolean

  closeModel?: (e: any) => any

  ishide?: () => any
}

/**
 * Describe your component here
 */
export const ReportProduct = observer(function ReportProduct(props: ReportProductProps) {
  const [category, setCategory] = useState(0)
  const { style, setModel, closeModel, ishide } = props
  const hideModal = () => {
    closeModel(category)
  }

  const isHide = () => {
    ishide()
  }

  const radioItem = [
    { label: "Violent or repulsive content", value: 1 },
    { label: "Hateful or abusive content", value: 2 },
    { label: "Harmful or dangerous acts", value: 3 },
    { label: "Spam or misleading", value: 4 },
  ]

  return (
    <Modal visible={setModel}>
      <View
        style={{
          backgroundColor: "white",
          height: "auto",
          width: wp("90%"),
          justifyContent: "center",
          borderRadius: 20,
          borderColor: "transparent",
          overflow: "hidden",
          alignSelf: "center",
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          colors={["#4B6CB7", "#182848"]}
          style={gradient}
        >
          <TouchableOpacity>
            <Text text="Report" />
          </TouchableOpacity>
        </LinearGradient>
        {/* <FlatList
          data={radioItem}
          renderItem={(item: any) => {
            return (
              <View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    height: 40,
                    alignItems: "center",
                    width: "90%",
                    alignSelf: "center",
                    elevation: 10,
                  }}
                  onPress={() => setCategory(item.item.value)}
                >
                  <Text
                    style={{
                      color: "black",
                    }}
                  >
                    {item.item.label}
                  </Text>
                  <Report padding={10} />
                </TouchableOpacity>
              </View>
            )
          }}
        /> */}
        <View style={{ alignItems: "flex-start", padding: 10 }}>
          <RadioForm
            animation={true}
            radio_props={radioItem}
            initial={0}
            onPress={(value: any) => setCategory(value)}
            labelStyle={{ left: 10, letterSpacing: 1.2, lineHeight: 17 }}
          />
        </View>
        <View
          style={{
            width: wp("90%"),
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "flex-end",
            right: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              width: 100,
              height: 30,
              borderRadius: 20,
              justifyContent: "center",
              marginTop: 20,
              bottom: 10,
              right: 10,
            }}
            onPress={() => {
              isHide()
            }}
          >
            <Text
              style={{
                fontSize: 12,
                padding: 10,
                fontWeight: "bold",
                color: "gray",
                textAlign: "center",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5]}
            colors={["#4B6CB7", "#182848"]}
            style={buttongradient}
          >
            <TouchableOpacity
              disabled={category === 0 ? true : false}
              onPress={() => {
                hideModal()
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  padding: 10,
                  fontWeight: "bold",
                  color: category === 0 ? "grey" : "white",
                  textAlign: "center",
                }}
              >
                Report
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  )
})
