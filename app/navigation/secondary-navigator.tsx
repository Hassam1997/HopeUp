import React from "react"
import { ImageStyle, View, TouchableOpacity, ViewStyle, TextStyle, Image } from "react-native"
import { Icon, Text, AddComponent, UnderConstruction } from "../components"
import {
  HomeScreen,
  MyProductScreen,
  ContributeScreen,
  MyVideosScreen,
  BuyingScreen,
  MyAdsScreen,
  FavouritesScreen,
  ContactScreen,
  OrdersScreen,
  TrackingOrdersScreen,
  EditProductScreen,
  SellProductScreen,
  StoreScreen,
  ViewProductScreen,
  CartScreen,
  CheckoutScreen,
  ClassifiedsScreen,
  ViewVideoScreen,
  BlockWatchScreen,
  CreateAdScreen,
  ViewAdScreen,
  ViewCatagoryScreen,
  UploadVideoScreen,
  TermsandconditionsScreen,
  ChatScreen,
  VideoHomeScreen,
  ViewClassifiedsScreen,
  EditAdScreen,
  EditVideoScreen,
  ContributeFormScreen,
  OrderDetailsScreen,
  ReturnOrderScreen,
  ProductCommentScreen,
  RepostClassifiedScreen,
  MyProfileScreen,
  MessagesScreen,
  NotificationsScreen,
  PayNowScreen,
  FavouriteAdScreen,
  FavouriteProductScreen,
  FavouriteVideoScreen,
} from "../screens"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useStores } from "../models"
import LinearGradient from "react-native-linear-gradient"
import styles from "./styles.js"
import { RootNavigation } from "./navigation-utilities"
import * as Sentry from "@sentry/react-native"
import { PrimaryNavigator } from "./primary-navigator"

const routingInstrumentation = new Sentry.ReactNavigationV5Instrumentation()

Sentry.init({
  dsn: "https://cd97b7e874ac43ad9353644c108e0fc4@o807435.ingest.sentry.io/5808393",

  integrations: [
    new Sentry.ReactNativeTracing({
      routingInstrumentation,
      tracingOrigins: ["localhost", "3.14.145.118:4000", /^\//],
      beforeNavigate: (context) => {
        // Decide to not send a transaction by setting sampled = false
        if (context.data.route.name === "Do Not Send") {
          context.sampled = false
        }

        // Modify the transaction context
        context.name = context.name.toUpperCase()
        context.tags = {
          ...context.tags,
          customTag: "value",
        }

        return context
      },
    }),
  ],
  tracesSampleRate: __DEV__ ? 1 : 0.75,
  environment: __DEV__ ? "development" : "production",
})

const Drawer = createDrawerNavigator<PrimaryParamList>()
const Tab = createBottomTabNavigator<PrimaryParamList>()

export type PrimaryParamList = {
  home: undefined
  myProduct: undefined
  myVideos: undefined
  myAds: undefined
  contribute: undefined
  buynsell: undefined
  favourites: undefined
  favouriteAd: undefined
  favouriteProduct: undefined
  favouriteVideo: undefined
  contact: undefined
  under: undefined
  orders: undefined
  track_order: undefined
  create: undefined
  myProfile: undefined
  notifications: undefined
  messages: undefined
  editProduct: undefined
  editAd: undefined
  editVideo: undefined
  sellProduct: undefined
  store: undefined
  viewProduct: undefined
  cart: undefined
  checkout: undefined
  createAd: undefined
  viewad: undefined
  selectState: undefined
  viewVideo: undefined
  blockWatch: undefined
  viewcatagory: undefined
  uploadVideo: undefined
  terms: undefined
  chat: undefined
  videoHome: undefined
  classifiedsHome: undefined
  contributeformscreen: undefined
  orderdetails: undefined
  returnorder: undefined
  productcomment: undefined
  repostClassified: undefined
  auth: undefined
  paynowscreen: undefined
}

const iconSize: ImageStyle = {
  height: 30,
  width: 30,
}

const row: ViewStyle = { padding: 10, flexDirection: "row", alignItems: "center" }
const text: TextStyle = { color: "#505050", fontWeight: "bold", left: 10 }

export const CustomTabBarButton = ({ children, ...props }) => {
  return (
    <TouchableOpacity onPress={() => RootNavigation.navigate("create")} {...props}>
      <View style={styles.buttonViewBack}>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.8]}
          colors={["#4B6CB7", "#182848"]}
          style={styles.buttonViewFront}
        >
          {children}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  )
}
function HomeTabs() {
  const { classifieds } = useStores()

  return (
    <View style={styles.container}>
      <Tab.Navigator
        lazy={true}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: "green",
          style: { ...styles.bottomTab },
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TouchableOpacity
                onPress={() => RootNavigation.navigate("home")}
                style={styles.tabView}
              >
                <Icon icon={focused ? "homefill" : "home"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="videoHome"
          component={VideoHomeScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TouchableOpacity
                onPress={() => RootNavigation.navigate("videoHome")}
                style={styles.tabView}
              >
                <Icon icon={focused ? "videofill" : "videos"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="store"
          component={StoreScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TouchableOpacity
                onPress={() => RootNavigation.navigate("store")}
                style={styles.tabView}
              >
                <Icon icon={focused ? "storefill" : "store"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="create"
          component={AddComponent}
          options={{
            tabBarIcon: ({ color, size }) => <Icon icon="plusCircle" />,
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
            tabBarVisible: false,
          }}
        />
        <Tab.Screen
          name="selectState"
          component={ClassifiedsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TouchableOpacity
                onPress={() => {
                  classifieds.setAction("View"), RootNavigation.navigate("selectState")
                }}
                style={styles.tabView}
              >
                <Icon icon={focused ? "classifiedsfill" : "classifieds"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="blockWatch"
          component={BlockWatchScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TouchableOpacity
                onPress={() => RootNavigation.navigate("blockWatch")}
                style={styles.tabView}
              >
                <Icon icon={focused ? "blockfill" : "blockwatch"} />
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartScreen}
          options={{
            tabBarVisible: false,
            tabBarIcon: ({ color, size, focused }) => (
              <TouchableOpacity
                onPress={() => RootNavigation.navigate("cart")}
                style={styles.tabView}
              >
                <Icon icon={focused ? "cart" : "cartunfill"} />
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export function SecondaryNavigator(props: any) {
  const { user, cart } = useStores()

  const logout = () => {
    user.reset()
    cart.reset()
    props.navigation.navigate("auth", { screen: "landing" })
  }

  return (
    <Drawer.Navigator
      lazy={true}
      detachInactiveScreens={true}
      initialRouteName="home"
      drawerStyle={{ width: "70%" }}
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      drawerContent={(props) => {
        return (
          <View {...props} style={{ flex: 1 }}>
            <LinearGradient
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 1.0 }}
              locations={[0, 0.8]}
              colors={["#4B6CB7", "#182848"]}
              style={{
                height: 250,
                justifyContent: "center",
                alignItems: "center",
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
              }}
            >
              <TouchableOpacity style={{}} onPress={() => props.navigation.navigate("myProfile")}>
                <Image
                  source={
                    user.myProfile.profile_picture !== null
                      ? { uri: user.myProfile.profile_picture }
                      : require("../../assets/avatar2.png")
                  }
                  resizeMode="cover"
                  style={{ height: 100, width: 100, bottom: 10, borderRadius: 50 }}
                />
              </TouchableOpacity>

              <Text text={`${user.myProfile.first_name + " " + user.myProfile.last_name}`} />
              <Text text={`${user.email}`} />
            </LinearGradient>
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("home", { screen: "home" })}
                style={row}
              >
                <Icon icon="myProduct" style={iconSize} />
                <Text text="Home" style={text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("contact")} style={row}>
                <Icon icon="contact" style={iconSize} />
                <Text text="Contact" style={text} />
              </TouchableOpacity>
              {/* <TouchableOpacity style={row}>
                <Icon icon='settings' style={iconSize} />
                <Text text="Settings" style={text} />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => props.navigation.navigate("messages")} style={row}>
                <Icon icon="message" style={iconSize} />
                <Text text="Message" style={text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("favourites")} style={row}>
                <Icon icon="favourite" style={iconSize} />
                <Text text="Favorites" style={text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.navigation.navigate("terms")} style={row}>
                <Icon icon="terms" style={iconSize} />
                <Text text="Terms and Conditions" style={text} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logout()} style={row}>
                <Icon icon="logout" style={iconSize} />
                <Text text="Logout" style={text} />
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
    >
      <Drawer.Screen name="auth" component={PrimaryNavigator} />
      <Drawer.Screen name="home" component={HomeTabs} />
      <Drawer.Screen name="myProduct" component={MyProductScreen} />
      <Drawer.Screen name="editProduct" component={EditProductScreen} />
      <Drawer.Screen name="myVideos" component={MyVideosScreen} />
      <Drawer.Screen name="myAds" component={MyAdsScreen} />
      <Drawer.Screen name="contribute" component={ContributeScreen} />
      <Drawer.Screen name="buynsell" component={BuyingScreen} />
      <Drawer.Screen name="favourites" component={FavouritesScreen} />
      <Drawer.Screen name='favouriteAd' component={FavouriteAdScreen}/>
      <Drawer.Screen name='favouriteProduct' component={FavouriteProductScreen}/>
      <Drawer.Screen name='favouriteVideo' component={FavouriteVideoScreen}/>
      <Drawer.Screen name="contact" component={ContactScreen} />
      <Drawer.Screen name="under" component={UnderConstruction} />
      <Drawer.Screen name="orders" component={OrdersScreen} />
      <Drawer.Screen name="track_order" component={TrackingOrdersScreen} />
      <Drawer.Screen name="myProfile" component={MyProfileScreen} />
      <Drawer.Screen name="messages" component={MessagesScreen} />
      <Drawer.Screen name="notifications" component={NotificationsScreen} />
      <Drawer.Screen name="sellProduct" component={SellProductScreen} />
      <Drawer.Screen name="viewProduct" component={ViewProductScreen} />
      <Drawer.Screen name="cart" component={CartScreen} />
      <Drawer.Screen name="checkout" component={CheckoutScreen} />
      <Drawer.Screen name="createAd" component={CreateAdScreen} />
      <Drawer.Screen name="viewad" component={ViewAdScreen} />
      <Drawer.Screen name="selectState" component={ClassifiedsScreen} />
      <Drawer.Screen name="viewVideo" component={ViewVideoScreen} />
      <Drawer.Screen name="viewcatagory" component={ViewCatagoryScreen} />
      <Drawer.Screen name="uploadVideo" component={UploadVideoScreen} />
      <Drawer.Screen name="terms" component={TermsandconditionsScreen} />
      <Drawer.Screen name="chat" component={ChatScreen} />
      <Drawer.Screen name="videoHome" component={VideoHomeScreen} />
      <Drawer.Screen name="classifiedsHome" component={ViewClassifiedsScreen} />
      <Drawer.Screen name="editAd" component={EditAdScreen} />
      <Drawer.Screen name="editVideo" component={EditVideoScreen} />
      <Drawer.Screen name="contributeformscreen" component={ContributeFormScreen} />
      <Drawer.Screen name="orderdetails" component={OrderDetailsScreen} />
      <Drawer.Screen name="returnorder" component={ReturnOrderScreen} />
      <Drawer.Screen name="productcomment" component={ProductCommentScreen} />
      <Drawer.Screen name="repostClassified" component={RepostClassifiedScreen} />
      <Drawer.Screen name="paynowscreen" component={PayNowScreen} />
    </Drawer.Navigator>
  )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["home", "store", "videoHome", "selectState"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
