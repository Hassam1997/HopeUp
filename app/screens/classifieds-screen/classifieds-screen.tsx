import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  FlatList,
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Image,
  ScrollView,
} from "react-native"
import { Header, Icon, LocalSvg, Screen, StateCity, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { adsListExpand } from "../../utils/classified-categories"
import SvgUri from "react-native-svg-uri"
import Services from "../../../assets/Services.svg"
import Housing from "../../../assets/Housing.svg"
import Gigs from "../../../assets/Gigs.svg"
import ForSale from "../../../assets/ForSale.svg"
import LegalHelp from "../../../assets/LegalHelp.svg"
import Jobs from "../../../assets/Jobs.svg"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const Heading: TextStyle = {
  color: "#49669E",
  marginLeft: 10,
  marginTop: 10,
  fontWeight: "bold",
}

export const ClassifiedsScreen = observer(function ClassifiedsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [showStates, setShowStates] = useState(false)
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [showCities, setShowCities] = useState(false)
  const [index, setIndex] = useState(undefined)

  // Pull in navigation via hook
  const navigation = useNavigation()

  const selectState = (state: string, data: string, index: any) => {
    if (data === "State") {
      setShowStates(false)
      setState(state)
      setIndex(index)
    } else {
      setShowCities(false)
      setCity(state)
    }
  }

  function adNavigation(itm: any) {
    let data = {
      category: itm.item.title,
      state: state,
      city: city,
    }
    navigation.navigate("viewcatagory", { Item: data, Index: itm.index })
  }

  function goBack() {
    setShowStates(false)
    setState(null)
    setCity(null)
    setShowCities(false)
    setIndex(undefined)
    navigation.navigate('home', { screen: "home" })
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => goBack()}
        headerText="CLASSIFIEDS"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notofications")}
      />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <Text text="STATES" style={Heading} />
          <TouchableOpacity
            onPress={() => setShowStates(!showStates)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: "white",
              elevation: 10,
              borderRadius: 10,
              top: 10,
              height: 35,
            }}
          >
            <Text
              text={state !== null ? state : "Select States"}
              style={{
                color: state !== null ? "#182848" : "#585858",
                fontWeight: state !== null ? "bold" : "normal",
              }}
            />
            <TouchableOpacity style={{ padding: 10 }} onPress={() => setShowStates(!showStates)}>
              <Icon icon="downArrow" style={{ height: 12, width: 13, bottom: 5 }} />
            </TouchableOpacity>
          </TouchableOpacity>
          {showStates ? (
            <StateCity
              data={"State"}
              onSelect={(e: any, data: string, index: any) => selectState(e, data, index)}
            />
          ) : null}
        </View>
        {state !== null ? (
          <View style={{ padding: 10 }}>
            <Text text="CITIES" style={Heading} />
            <TouchableOpacity
              onPress={() => setShowCities(!showCities)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                backgroundColor: "white",
                elevation: 10,
                borderRadius: 10,
                top: 10,
                height: 35,
              }}
            >
              <Text text={city !== null ? city : "Select City"} style={{ color: "#585858" }} />
              <TouchableOpacity style={{ padding: 10 }} onPress={() => setShowCities(!showCities)}>
                <Icon icon="downArrow" style={{ height: 12, width: 13, bottom: 5 }} />
              </TouchableOpacity>
            </TouchableOpacity>
            {showCities ? (
              <StateCity
                data={"City"}
                index={index}
                onSelect={(e: any, data: string, index: any) => selectState(e, data, index)}
              />
            ) : null}
          </View>
        ) : null}
        {city !== null ? (
          <View>
            <Text text={"CATEGORIES"} style={[Heading, { left: 10, top: 10 }]} />
            <View style={{ padding: 10 }}>
              <FlatList
                data={adsListExpand}
                numColumns={2}
                ListFooterComponent={<View style={{ height: 50 }} />}
                columnWrapperStyle={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
                renderItem={(itm: any) => {
                  let SVG = Services
                  switch (itm.item.title) {
                    case "Services":
                      SVG = Services
                      break
                    case "Housing":
                      SVG = Housing
                      break
                    case "Gigs":
                      SVG = Gigs
                      break
                    case "ForSale":
                      SVG = ForSale
                      break
                    case "Jobs":
                      SVG = Jobs
                      break
                    case "LegalHelp":
                      SVG = LegalHelp
                      break
                    default:
                      SVG = Services
                  }
                  return (
                    <TouchableOpacity onPress={() => adNavigation(itm)} key={itm.index.toString()}>
                      <LocalSvg Component={SVG} />
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  )
})
