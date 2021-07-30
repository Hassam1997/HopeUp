import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  tabView: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontSize: 10,
    color: "black",
  },
  bottomTab: {
    position: "absolute",
    elevation: 0,
    height: 60,
  },
  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  buttonViewFront: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "blue",
  },
  buttonViewBack: {
    bottom: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    elevation: 0,
    // position:'absolute',
    zIndex: 100,
    // marginBottom: 30
  },
})
