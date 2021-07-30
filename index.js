// This is the first file that ReactNative will run when it starts up.
//
// We jump out of here immediately and into our main entry point instead.
//
// It is possible to have React Native load our main module first, but we'd have to
// change that in both AppDelegate.m and MainApplication.java.  This would have the
// side effect of breaking other tooling like mobile-center and react-native-rename.
//
// It's easier just to leave it here.
import App from "./app/app.tsx"
import { AppRegistry } from "react-native"
import { gestureHandlerRootHOC } from "react-native-gesture-handler"
import messaging from "@react-native-firebase/messaging"
import inAppMessaging from '@react-native-firebase/in-app-messaging';

messaging().onNotificationOpenedApp((remoteMessage) => {
  if (Object.keys(remoteMessage.data)[0] == "product") {
    props.navigation.navigate("FavouriteProduct", {
      product: remoteMessage.data.product,
    })
  }
})
messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (remoteMessage) {
      if (Object.keys(remoteMessage.data) && Object.keys(remoteMessage.data)[0] == "product") {
        props.navigation.navigate("favourites", {
          product: JSON.parse(remoteMessage.data.product),
        })
      } else if (Object.keys(remoteMessage.data) && Object.keys(remoteMessage.data)[0] == "video") {
        props.navigation.navigate("favourites", {
          video: JSON.parse(remoteMessage.data.video),
        })
      } else if (
        Object.keys(remoteMessage.data) &&
        Object.keys(remoteMessage.data)[0] == "advertise"
      ) {
        props.navigation.navigate("favourites", {
          classified: JSON.parse(remoteMessage.data.advertise),
        })
      } else if (
        Object.keys(remoteMessage.data) &&
        Object.keys(remoteMessage.data).includes("sender_id")
      ) {
        remoteMessage.data.deleted = "false"
        props.navigation.navigate("chat", remoteMessage.data)
      } else return
    }
  })

messaging().onMessage(async (notification) => {
  console.log(notification, "new")
  await inAppMessaging().setMessagesDisplaySuppressed(true);
})

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("background", remoteMessage)
})

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "Hope Up"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

let RootComponent = App
if (__DEV__ && SHOW_STORYBOOK) {
  // Only include Storybook if we're in dev mode
  const { StorybookUIRoot } = require("./storybook")
  RootComponent = StorybookUIRoot
}

AppRegistry.registerComponent(APP_NAME, () => gestureHandlerRootHOC(RootComponent))
