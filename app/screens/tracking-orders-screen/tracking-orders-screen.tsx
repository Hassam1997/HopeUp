import React, { useState, useCallback, useRef } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Image, TouchableOpacity, View, ViewStyle, StyleSheet } from "react-native"
import { Screen, Text, Header, Icon } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import StepIndicator from "react-native-step-indicator"
import { palette } from "../../theme/palette"
import Delivery from "../../../assets/Delivery.svg"
import Processed from "../../../assets/Order_Processed.svg"
import Confirmed from "../../../assets/Order_Confirmed.svg"
import Shipped from "../../../assets/shipped.svg"
import Placed from "../../../assets/Order_Placed.svg"
import { ScrollView } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const stepIndicator: ViewStyle = {
  marginVertical: 50,
  paddingHorizontal: 20,
}

export const TrackingOrdersScreen = observer(function TrackingOrdersScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [vieworder, setVieworder] = useState(false)
  const [currentPosition, setPosition] = useState<number>(2)
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 40 }).current

  // Pull in navigation via hook
  const navigation = useNavigation()

  const customStyles = {
    stepIndicatorSize: 45,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 0,
    // currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#E0AE36",
    // stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#11961B",
    stepStrokeUnFinishedColor: "#C5C5C5",
    separatorFinishedColor: "#11961B",
    separatorUnFinishedColor: "#C5C5C5",
    stepIndicatorFinishedColor: "#11961B",
    stepIndicatorUnFinishedColor: "#C5C5C5",
    stepIndicatorCurrentColor: "#E0AE36",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#ffffff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#C5C5C5",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#000000",
  }
  const SerialStyles = {
    // stepIndicatorSize: 100,
    //currentStepIndicatorSize: 20,
    // separatorStrokeWidth: 2,
    // currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: "#E0AE36",
    //  stepStrokeWidth: 3,
    stepStrokeFinishedColor: "#11961B",
    stepStrokeUnFinishedColor: "#C5C5C5",
    separatorFinishedColor: "#11961B",
    separatorUnFinishedColor: "#C5C5C5",
    stepIndicatorFinishedColor: "#11961B",
    stepIndicatorUnFinishedColor: "#C5C5C5",
    stepIndicatorCurrentColor: "#E0AE36",
    // stepIndicatorLabelFontSize: 13,
    // currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#ffffff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#C5C5C5",
    labelColor: "#999999",
    //   labelSize: 13,
    currentStepLabelColor: "#000000",
  }

  const TitleStyles = {
    stepIndicatorSize: 15,
    currentStepIndicatorSize: 100,
    separatorStrokeWidth: 0,
    currentStepStrokeWidth: 0,
    stepStrokeCurrentColor: "#E0AE36",
    stepStrokeWidth: 30,
    stepStrokeFinishedColor: "#11961B",
    stepStrokeUnFinishedColor: "#C5C5C5",
    separatorFinishedColor: "#11961B",
    separatorUnFinishedColor: "#C5C5C5",
    stepIndicatorFinishedColor: "#11961B",
    stepIndicatorUnFinishedColor: "#C5C5C5",
    stepIndicatorCurrentColor: "#E0AE36",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#ffffff",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#C5C5C5",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#000000",
  }

  const renderPage = (rowData: any) => {
    const item = rowData.item
    return (
      <View style={styles.rowItem}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
      </View>
    )
  }

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleItemsCount = viewableItems.length
    if (visibleItemsCount !== 0) {
      setPosition(viewableItems[visibleItemsCount - 1].index)
    }
  }, [])

  const renderStepIndicator = (params: any) => {
    switch (params.position) {
      case 0:
        return <Placed />
      case 1:
        return <Confirmed />
      case 2:
        return <Processed />
      case 3:
        return <Shipped />
      case 4:
        return <Delivery />
      default:
        return <Placed />
    }
  }

  const array = [
    {
      title: "Order Placed",
      body: "We have received your orderon 09-April-2021",
    },
    {
      title: "Order Confirmed",
      body: "We have Confirmed your orderon 10-April-2021",
    },
    {
      title: "Order Processed",
      body: "We are preparing your order",
    },
    {
      title: "Ready to Ship",
      body: "Your order is ready for shipping",
    },
    {
      title: "Out for Delivery",
      body: "Your order is Out  for Delivery",
    },
  ]

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="TRACKING ORDERS"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View style={{ padding: 10 }}>
        <Text text="Track Orders" style={{ color: "#182848", fontSize: 22, fontWeight: "bold" }} />
        <View style={{ backgroundColor: "white", borderRadius: 10, marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View>
              <Text text="Aelfrice Eden,yellow mobile ... " style={{ color: "#000000" }} />
              <Text text="$104.5" style={{ color: "#000000", fontWeight: "bold" }} />
            </View>
            <View>
              <Image source={require("../../../assets/redT.png")} />
            </View>
          </View>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderTopColor: "#C5C5C5",
              borderTopWidth: 1,
            }}
          >
            <Text
              text="Track Order"
              style={{ color: "#182848", fontSize: 18, fontWeight: "bold" }}
            />
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setVieworder(!vieworder)}>
              <Icon icon="down" />
            </TouchableOpacity>
          </View>
          {vieworder ? (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                height: 400,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <StepIndicator
                  customStyles={SerialStyles}
                  currentPosition={currentPosition}
                  direction="vertical"
                  stepCount={5}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  flex: 5,
                  alignItems: "flex-start",
                  paddingLeft: 10,
                }}
              >
                <StepIndicator
                  customStyles={customStyles}
                  currentPosition={currentPosition}
                  renderStepIndicator={renderStepIndicator}
                  labels={array.map((item) => item.title)}
                  direction="vertical"
                  stepCount={5}
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  stepIndicator: {
    marginVertical: 50,
    paddingHorizontal: 20,
  },
  rowItem: {
    flex: 3,
    paddingVertical: 20,
  },
  title: {
    flex: 1,
    fontSize: 20,
    color: "#333333",
    paddingVertical: 16,
    fontWeight: "600",
  },
  body: {
    flex: 1,
    fontSize: 15,
    color: "#606060",
    lineHeight: 24,
    marginRight: 8,
  },
})
