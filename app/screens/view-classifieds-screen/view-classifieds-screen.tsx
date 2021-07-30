import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TextInput, FlatList } from "react-native"
import { Header, Screen, Text, Icon, ListviewAd, SearchBar } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

export const ViewClassifiedsScreen = observer(function ViewClassifiedsScreen({ route }) {
  // Pull in one of our MST stores
  const { classifieds } = useStores()
  // OR
  // const rootStore = useStores()
  const [keyword, setKeyword] = useState("")
  const [adData, setData] = useState([])
  const [isFlag, isSetFlag] = useState([])

  useEffect(() => {
    console.log(route, "RRR")
    getData()
    async function getData() {
      const { city, state, category, sub_category } = route.params.data
      const response = await classifieds.getClassifieds(city, state, category, sub_category)
      console.log(response, "adadatarespoisne")
      setData(response.data)
    }
  }, [route])

  // Pull in navigation via hook
  const navigation = useNavigation()

  function renderAds(data: any) {
    console.log(data, "ITEMDATA")
    return <ListviewAd data={data} />
  }

  const apiResponse = async () => {
    if (keyword != "") {
      const { city, state, category, sub_category } = route.params.data
      const data = await classifieds.searchClassifieds(city, state, category, sub_category, keyword)
      isSetFlag(data.data)
      console.log("array", data)
    } else {
      isSetFlag([])
      console.log("array2", isFlag.length)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText="Ads"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View>
        <SearchBar
          keyword={keyword}
          setKeyword={(e: any) => setKeyword(e)}
          ApiResponse={apiResponse}
          setFlag={(e: any) => isSetFlag(e)}
        />
        <FlatList
          data={isFlag.length > 0 ? isFlag : adData}
          renderItem={(itm: any) => renderAds(itm)}
          ListFooterComponent={<View style={{ height: 150 }} />}
        />
      </View>
    </Screen>
  )
})
