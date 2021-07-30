import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import {
  TextInput,
  View,
  ViewStyle,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native"
import { Screen, Text, Header, Icon, States } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { color } from "../../theme"
import Visa from "../../../assets/VISA.svg"
import LinearGradient from "react-native-linear-gradient"
import axios from "axios"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}

const input: ViewStyle = {
  width: wp("90%"),
  backgroundColor: "white",
  elevation: 10,
  borderRadius: 30,
  margin: 10,
  height: 40,
  shadowColor: "#C5C5C5",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  justifyContent: "center",
  alignSelf: "center",
}

const subInput: ViewStyle = {
  width: wp("80%"),
  alignSelf: "center",
}

const inputAddress: ViewStyle = {
  width: wp("90%"),
  backgroundColor: "white",
  elevation: 10,
  borderRadius: 30,
  margin: 10,
  height: 80,
  shadowColor: "#C5C5C5",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 12,
  justifyContent: "center",
  alignSelf: "center",
}

const buttongradient: ViewStyle = {
  backgroundColor: "#113394",
  width: 150,
  height: 40,
  borderRadius: 20,
  justifyContent: "center",
  bottom: 10,
}

export const PayNowScreen = observer(function PayNowScreen({ route }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [cardNum, setCardNum] = useState("")
  const [address, setAddress] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(null)
  const [stateCode, setStateCode] = useState("")
  const [country, setCountry] = useState("")
  const [date, setDate] = useState("")
  const [cvv, setCVV] = useState("")
  const [showStates, setShowStates] = useState(false)
  const [index, setIndex] = useState(undefined)
  const navigation = useNavigation()

  function postAd() {
    let obj = {
      email: email,
      name: name,
      address: {
        line1: address,
        postal_code: zipcode,
        city: city,
        state: stateCode,
        country: country,
      },
      amount: "5",
      card: {
        card_number: cardNum,
        expiry_date: date,
        cvc_code: cvv,
      },
      adv_id: route.params.adv_id,
    }
    axios
      .post("http://3.14.145.118:4000/api/stripe/adv/pay", obj)
      .then((res) => {
        console.log(res)
        Alert.alert(
          "Successfully Posted!",
          "You have successfully posted your ad this will be show up in classifieds for 3 weeks",
        )
        navigation.navigate("home", { screen: "home" })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const selectState = (state: string, index: any) => {
    setShowStates(false)
    setState(state.name)
    setIndex(index)
    setStateCode(state.abbreviation)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="Pay Now"
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notifications")}
      />
      <ScrollView>
        <View style={{ padding: 10 }}>
          <View style={{ padding: 10 }}>
            <Text
              text="Full Name"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View style={input}>
              <TextInput
                placeholder="Full Name"
                style={subInput}
                value={name}
                onChangeText={(e: any) => setName(e)}
              />
            </View>
            <Text
              text="Your E-mail"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View
              style={{
                width: wp("90%"),
                backgroundColor: "white",
                elevation: 10,
                borderRadius: 30,
                margin: 10,
                height: 40,
                shadowColor: "#C5C5C5",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 12,
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
              }}
            >
              <TextInput
                placeholder="Your E-mail"
                style={{
                  width: wp("70%"),
                }}
                value={email}
                onChangeText={(e: any) => setEmail(e)}
              />
              <Image
                source={require("../../components/icon/icons/email.png")}
                style={{ height: 22, width: 28 }}
                resizeMode="cover"
              />
            </View>
            <Text
              text="Address"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View style={inputAddress}>
              <TextInput
                placeholder="Address..."
                multiline={true}
                style={{
                  width: wp("80%"),
                  alignSelf: "center",
                  height: 70,
                  textAlignVertical: "top",
                }}
                value={address}
                onChangeText={(e: any) => setAddress(e)}
              />
            </View>
            <Text
              text="City"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View style={input}>
              <TextInput
                placeholder="City Name"
                style={subInput}
                value={city}
                onChangeText={(e: any) => setCity(e)}
              />
            </View>
            <View>
              <Text text="STATES" style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }} />
              <TouchableOpacity
                onPress={() => setShowStates(!showStates)}
                style={[input, {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  backgroundColor: "white",
                  elevation: 10,
                  // borderRadius: 10,
                  top: 10,
                  height: 40,
                }]}
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
                <States
                  index={index}
                  onSelect={(e: any, index: any) => selectState(e, index)}
                />
              ) : null}
            </View>
            {/* <Text
              text="Country"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View style={input}>
              <TextInput
                placeholder="Country Name"
                style={subInput}
                value={country}
                onChangeText={(e: any) => setCountry(e)}
              />
            </View> */}
            <Text
              text="Zip Code"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 10
              }}
            />
            <View style={input}>
              <TextInput
                placeholder="Code"
                style={subInput}
                value={zipcode}
                onChangeText={(e: any) => setZipcode(e)}
              />
            </View>
            <Text
              text="Payment Method"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View
              style={{
                width: wp("90%"),
                backgroundColor: "white",
                elevation: 10,
                borderRadius: 30,
                margin: 10,
                height: 40,
                shadowColor: "#C5C5C5",
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.5,
                shadowRadius: 12,
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "row",
                paddingHorizontal: 12,
              }}
            >
              <Visa />
              <TextInput
                placeholder="**** **** **** 1234"
                style={{
                  width: wp("70%"),
                }}
                value={cardNum}
                onChangeText={(e: any) => setCardNum(e)}
              />
            </View>
            <View
              style={{
                width: wp("90%"),
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="MM/YY"
                style={{
                  width: wp("40%"),
                  backgroundColor: "white",
                  elevation: 10,
                  borderRadius: 30,
                  height: 40,
                  shadowColor: "#C5C5C5",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 12,
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                  paddingHorizontal: 12,
                }}
                value={date}
                onChangeText={(text: any) => {
                  setDate(
                    text.length === 3 && !text.includes("/")
                      ? `${text.substring(0, 2)}/${text.substring(2)}`
                      : text
                  );
                }}
              />
              <TextInput
                placeholder="CVV"
                style={{
                  width: wp("40%"),
                  backgroundColor: "white",
                  elevation: 10,
                  borderRadius: 30,
                  margin: 10,
                  height: 40,
                  shadowColor: "#C5C5C5",
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 12,
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                  paddingHorizontal: 12,
                }}
                value={cvv}
                onChangeText={(e: any) => setCVV(e)}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            width: wp("100%"),
            alignItems: "flex-end",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 20,
          }}
        >
          <LinearGradient
            start={{ x: 0.5, y: 0.0 }}
            end={{ x: 0.5, y: 1.0 }}
            locations={[0, 0.5]}
            colors={["#4B6CB7", "#182848"]}
            style={buttongradient}
          >
            <TouchableOpacity onPress={() => postAd()}>
              <Text
                style={{
                  fontSize: 15,
                  padding: 10,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Proceed
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </Screen>
  )
})
