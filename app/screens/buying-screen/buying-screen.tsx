import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextInput, View, ViewStyle, ScrollView, Image, TouchableOpacity } from "react-native"
import { Screen, Text, Header } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { color } from "../../theme"
import Visa from "../../../assets/VISA.svg"
import LinearGradient from "react-native-linear-gradient"
import AsyncStorage from "@react-native-async-storage/async-storage"
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

export const BuyingScreen = observer(function BuyingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  const [YourEmail, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [date, setDate] = useState("")
  const [cvv, setCVV] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    getData()
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("Payment_Details")
        const parseData = JSON.parse(data)
        console.log("Data", parseData)
        if (parseData !== null) {
          setUserName(parseData.userName)
          setEmail(parseData.YourEmail)
          setPayment(parseData.payment)
          setZipcode(parseData.zipcode)
          setCity(parseData.city)
          setAddress(parseData.address)
          setState(parseData.state)
          setDate(parseData.date)
          setCVV(parseData.cvv)
        }
      } catch (err) {
        console.log(err, "err")
      }
    }
  }, [])

  const storeData = async () => {
    try {
      let data = {
        name: userName,
        email: YourEmail,
        address: {
          line1: address,
          postal_code: zipcode,
          city: city,
          state: state,
          country: "USA",
        },
        card: {
          card_number: payment,
          expiry_date: date,
          cvc_code: cvv,
        },
      }
      // const Storage = await AsyncStorage.setItem("Payment_Details", data)
      const response = await axios.post("http://3.14.145.118:4000/api/stripe/create-card", data)
      console.log(response, "RCARDS")
      setAddress("")
      setCVV("")
      setCity("")
      setDate("")
      setEmail("")
      setState("")
      setUserName("")
      setPayment("")
      setZipcode("")
      navigation.navigate("home")
    } catch (error) {
      console.log(error)
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        onLeftPress={() => navigation.goBack()}
        leftIcon="back"
        headerText="BUY AND SELLING"
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
                value={userName}
                onChangeText={(e: any) => setUserName(e)}
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
                value={YourEmail}
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
            <Text
              text="State"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
            <View style={input}>
              <TextInput
                placeholder="State Name"
                style={subInput}
                value={state}
                onChangeText={(e: any) => setState(e)}
              />
            </View>
            <Text
              text="Zip Code"
              style={{
                color: "#010101",
                fontSize: 12,
                fontWeight: "bold",
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
                value={payment}
                onChangeText={(e: any) => setPayment(e)}
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
                onChangeText={(e: any) => setDate(e)}
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
            <TouchableOpacity
              onPress={() => {
                storeData()
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </Screen>
  )
})
