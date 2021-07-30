import React, { useState, useRef, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  Image,
  ScrollView,
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  ToastAndroid,
} from "react-native"
import { Screen, Text, Header, Icon, States } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import LinearGradient from "react-native-linear-gradient"
import RBSheet from "react-native-raw-bottom-sheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import Visa from "../../../assets/VISA.svg"
import axios from "axios"

const ROOT: ViewStyle = {
  backgroundColor: "#EFEFEF",
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

export const CheckoutScreen = observer(function CheckoutScreen({ route }) {
  // Pull in one of our MST stores
  const { user } = useStores()
  // OR
  // const rootStore = useStores()
  const [isEnabled, setIsEnabled] = useState(false)
  const refRBSheet = useRef(undefined)
  const [loading, setLoading] = useState(true)
  const [fullName, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [subTotal, setSubTotal] = useState(0)
  const [shipping, setShipping] = useState(0)
  const [totalPrice, setTotalPrice] = useState("0")

  const [YourEmail, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [payment, setPayment] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState(null)
  const [date, setDate] = useState("")
  const [cvv, setCVV] = useState("")
  const [userName, setUserName] = useState("")
  const [country, setCountry] = useState("USA")
  const [showStates, setShowStates] = useState(false)
  const [index, setIndex] = useState(undefined)
  const [stateCode, setStateCode] = useState("")
  // const [] = useState()

  // Pull in navigation via hook
  const navigation = useNavigation()

  useEffect(() => {
    console.log(route)
    setSubTotal(route.params.data)

    const getData = async () => {
      console.log("1")
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
    getData()
  }, [route])

  const toggleSwitch = async (previousState: any) => {
    setIsEnabled((previousState) => !previousState)
    console.log("State", previousState)
    if (previousState === true) {
      let data = JSON.stringify({
        userName: userName,
        YourEmail: YourEmail,
        address: address,
        payment: payment,
        zipcode: zipcode,
        city: city,
        state: state,
        date: date,
        cvv: cvv,
      })
      try {
        const Storage = await AsyncStorage.setItem("Payment_Details", data)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const setPrice = () => {
    if (zipcode === "" || address === "" || state === "" || city === "" || YourEmail === "" || userName === "" || phoneNumber === "" || payment === "" || cvv === "" || date === "") {
      Alert.alert("Incomplete Form",
        "You are required to fill all the fields")
    } else {
      let obj = {
        destination_zip: zipcode,
        product_id: route.params.product,
        line1: address,
        city: city,
        state: stateCode
      }
      console.log(obj, "PAYLOAD")
      axios.post('http://3.14.145.118:4000/api/order/domestic-rates', obj,
        {
          headers: {
            Authorization: "Bearer " + user.token
          }
        }).then(res => {
          console.log(res)
          setShipping(res.data.total_price.toString())
          let price =
            parseInt(subTotal.toString()) +
            parseInt(((subTotal * 10) / 100).toFixed(2).toString())
          setTotalPrice(price.toString())
          refRBSheet.current.open()
        }).catch(err => {
          if (err.request) {
            console.log(err.request, "client never recieved a err response")
            let error = err.request;
            if (error.status === 400) {
              Alert.alert("Invalid Address", "Address Not Found, Please Provide a valid")
            }
          } else if (err.response) {
            console.log(err.response, "client received an error response")
          } else {
            console.log(err, "syntax error")
          }
        })
    }
  }

  const payNow = () => {
    let obj = {
      email: YourEmail,
      name: userName,
      phone: phoneNumber,
      address: {
        line1: address,
        postal_code: zipcode,
        city: city,
        state: stateCode,
        country: "USA",
      },
      amount: totalPrice,
      card: {
        card_number: payment,
        expiry_date: date,
        cvc_code: cvv,
      },
      user_id: user.user_id,
    }
    console.log(obj, "OO")
    axios
      .post("http://3.14.145.118:4000/api/stripe/order/pay", obj)
      .then((res) => {
        Alert.alert(
          "Want to track your order?",
          "your order has been created and can be tracked in orders",
          [
            {
              text: "Cancel",
              style: "destructive",
              onPress: () => setLoading(!loading),
            },
            {
              text: "Track Order",
              style: "default",
              onPress: () => navigation.navigate("orders"),
            },
          ],
        )
        setAddress("")
        setCVV("")
        setCity("")
        setCountry("")
        setDate("")
        setEmail("")
        setName("")
        setState("")
        setPayment("")
        setPhoneNumber("")
        setShowStates(false)
        setStateCode("")
        navigation.navigate("orders")
      })
      .catch((err) => {
        if (err.request) {
          console.log(err.request, "REQ")
        } else if (err.response) {
          console.log(err.response, "RES")
        } else {
          console.log(err, "res")
        }
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
      <Header leftIcon="back" onLeftPress={() => navigation.goBack()} headerText="CHECKOUT" />
      <ScrollView>
        <View
          style={{ justifyContent: "center", alignItems: "center", padding: 10, marginTop: 10 }}
        >
          <Image source={require("../../../assets/checkout.png")} />
          <Text
            text={`$${subTotal}`}
            style={{ color: "#182848", fontSize: 24, fontWeight: "bold" }}
          />
        </View>
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
                keyboardType="email-address"
              />
              <Image
                source={require("../../components/icon/icons/email.png")}
                style={{ height: 22, width: 28 }}
                resizeMode="cover"
              />
            </View>
            <Text
              text="Your Phone"
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
                placeholder="Your Phone Number"
                style={{
                  width: wp("70%"),
                }}
                value={phoneNumber}
                onChangeText={(e: any) => setPhoneNumber(e)}
                keyboardType='phone-pad'
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
                keyboardType='number-pad'
                returnKeyType='done'
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              width: wp("100%"),
            }}
          >
            <Text text="Save data for future payments" style={{ color: "#000000" }} />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#3B5795" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </ScrollView>
      <View>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.8]}
          colors={["#4B6CB7", "#182848"]}
          style={{
            height: 70,
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
              width: "100%",
            }}
          >
            <Text text="Summary" />
            <TouchableOpacity onPress={() => setPrice()} style={{ padding: 10 }}>
              <Icon icon="up" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "white",
          },
        }}
      >
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.5]}
          style={{
            height: loading ? 300 : 500,
            width: "100%",
            padding: 10,
            alignItems: "flex-start",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          colors={["#4B6CB7", "#182848"]}
        >
          {loading ? (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 10,
                  width: wp("100%"),
                }}
              >
                <View>
                  <Text text="Summary" style={{ fontWeight: "bold", fontSize: 18 }} />
                  <View style={{ padding: 10, left: 10 }}>
                    <Text text="Sub Total" />
                    <Text text="Shipping" />
                    <Text text="Hope Up (10%)" />
                    <Text text="Total" style={{ fontWeight: "bold", top: 20 }} />
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => refRBSheet.current.close()}
                    style={{ padding: 10, left: 10, width: 60, alignItems: "center" }}
                  >
                    <Icon icon="up" style={{ transform: [{ rotate: "180deg" }], height: 20, width: 20 }} />
                  </TouchableOpacity>
                  <View style={{ padding: 10, alignItems: "flex-end", right: 10 }}>
                    <Text text={`$${subTotal}`} style={{ fontWeight: "bold" }} />
                    <Text text={shipping.toString()} />
                    <Text text={"$" + ((subTotal * 10) / 100).toFixed(2)} />
                    <Text text={`$${totalPrice}`} style={{ fontWeight: "bold", top: 20 }} />
                  </View>
                </View>
              </View>
              <Text text={"Shipping fee should be paid at receiving order from usps, Thankyou."} style={{ fontSize: 8, textAlign: 'center', top: 5, right: 10 }} />
              <TouchableOpacity
                onPress={() => payNow()}
                style={{
                  width: 180,
                  height: 45,
                  borderRadius: 40,
                  alignSelf: "center",
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  text="Pay Now"
                  style={{ color: "#182848", fontWeight: "bold", fontSize: 18 }}
                />
              </TouchableOpacity>
            </View>
          ) : (
              <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Image source={require("../../../assets/success.png")} resizeMode="contain" />
                <Text text="Thank you for your order." style={{ fontSize: 24, fontWeight: "bold" }} />
                <Text
                  text="Your order will be delivered soon"
                  style={{ color: "#CCCCCC", fontSize: 12 }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setLoading(!loading),
                      refRBSheet.current.close(),
                      navigation.navigate("home", { screen: "store" })
                  }}
                  style={{
                    width: 230,
                    height: 55,
                    borderRadius: 40,
                    alignSelf: "center",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <Text
                    text="Continue Shopping"
                    style={{ color: "#182848", fontWeight: "bold", fontSize: 18 }}
                  />
                </TouchableOpacity>
              </View>
            )}
        </LinearGradient>
      </RBSheet>
    </Screen>
  )
})
