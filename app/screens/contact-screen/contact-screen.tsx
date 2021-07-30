import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const text: TextStyle = {
  color: "#000000",
  textAlign: "center",
  fontSize: 18,
  marginVertical: 10,
}
const email: TextStyle = {
  color: "#0022FF",
  fontSize: 18,
  textAlign: "center",
}

export const ContactScreen = observer(function ContactScreen() {
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
        headerText="CONTACT"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <View style={{ justifyContent: "center", alignItems: "center", padding: 20, height: "70%" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, elevation: 10 }}>
          <Text text="For general Questions and concerns contact" style={text} />
          <Text text="Customer.care@hopeup.net" style={email} />
          {/* <Text text="For Questions regarding returns or refunds contact" style={text} />
          <Text text="Returns.refunds@hopeup.net" style={email} />
          <Text text="Help make HopeUp better" style={text} />
          <Text text="help.hope@hopeup.net" style={email} /> */}
        </View>
      </View>
    </Screen>
  )
})
