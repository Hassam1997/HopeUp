import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ScrollView } from "react-native"
import { Header, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const BlockWatchScreen = observer(function BlockWatchScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Header
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        headerText={"BlockWatch"}
        rightIcon="bell"
        onRightPress={() => navigation.navigate("notification")}
      />
      <View style={{ backgroundColor: "#fff", width: "100%", height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "#fff", borderRadius: 26, paddingTop: 21 }}
        >
          <View style={{ marginHorizontal: 15 }}>
            {/* <View style={styles.backgroundVideo}>
            <Video
              videoUrl={'demo.xcieo.com/hopeupWeb/block.mp4'}
              borderRadius={true}
            />
          </View> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: color.themeColor,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                {"STEPS TO SETUP BLOCK WATCH CREATING SAFER COMMUNITES".toUpperCase()}
              </Text>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginVertical: 0 }}>
                <Text style={{ color: color.themeColor, width: "5%", fontWeight: "bold" }}>1.</Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Recruit and organize as many neighbors as possible
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Talk to your neighbors about crime and safety in the area
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Creating awareness among neighbors
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Collect all the information and form a strategy to protect the community
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  To help spread word try:
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Flyers
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Letters
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Emails
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 5 }}>
              <View style={{ flexDirection: "row", marginVertical: 0 }}>
                <Text style={{ color: color.themeColor, width: "5%", fontWeight: "bold" }}>2.</Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Contact your local law enforcement and schedule a meeting
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Meet with representatives of law enforcement to build a partnership
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  This will help resolve community issues
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Law enforcement agencies help formalize neighborhood watch groups
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  They provide Training, Literature and Information
                </Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", marginVertical: 0 }}>
                <Text style={{ color: color.themeColor, width: "5%", fontWeight: "bold" }}>3.</Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Discuss community concerns and develop action plans
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Meetings should cover and prioritize concerns, and issues facing the community
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Block Watch members and/or Law enforcement can implement crime reduction
                  strategies
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Prioritize concerns and turn Block Watch members attention to developing
                  strategies that address the community’s concerns and issues
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Make goals realistic and set milestones
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Develop a plan of action and implement the plan
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 5 }}>
              <View style={{ flexDirection: "row", marginVertical: 0 }}>
                <Text style={{ color: color.themeColor, width: "5%", fontWeight: "bold" }}>4.</Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Hold regular meetings
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  After Block Watch has been formed and goals have been determined, the group should
                  schedule meetings that focus on training, crime prevention and community policing
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Local law enforcement can provide training programs that will help citizens
                  protects themselves and their communities
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "10%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  For example:
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "12%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Neighborhood patrols
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "12%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Community clean up days
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "12%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Crime prevention seminars and meetings
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  After proper training, our neighborhoods and communities will improve
                </Text>
              </View>
            </View>

            <View style={{ marginVertical: 5, paddingBottom: 20 }}>
              <View style={{ flexDirection: "row", marginVertical: 0 }}>
                <Text style={{ color: color.themeColor, width: "5%", fontWeight: "bold" }}>5.</Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Implement a phone network and take-action steps
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Hold events such as:
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "12%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Block Watch kickoff event
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "12%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Start a community newsletter
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "12%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Anything to get the community together and engaged
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Remember to continue training
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Keep Block Watch group members active and enthusiastic
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: color.themeColor,
                    width: "7%",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  -
                </Text>
                <Text
                  style={{
                    color: color.themeColor,
                    flex: 1,
                    fontWeight: "bold",
                    lineHeight: 20,
                  }}
                >
                  Maintain communication with law enforcement liaison and Block Watch members
                </Text>
              </View>
            </View>
            <View style={{ height: 150 }} />
          </View>
        </ScrollView>
      </View>
    </Screen>
  )
})
