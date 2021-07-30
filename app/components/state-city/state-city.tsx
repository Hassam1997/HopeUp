import * as React from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity, FlatList } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text, Icon } from "../"
import { UsStatesWithCities } from "../../screens/classifieds-screen/usstates.js"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface StateCityProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  data?: string

  index?: any

  onSelect?: (e: any, data: string, index: any) => any
}

/**
 * Describe your component here
 */
export const StateCity = observer(function StateCity(props: StateCityProps) {
  const { style, data, onSelect, index } = props

  return (
    <View style={[CONTAINER, style]}>
      <View style={{ padding: 10 }}>
        <FlatList
          data={data === "State" ? UsStatesWithCities : UsStatesWithCities[index].cities}
          ListFooterComponent={<View style={{ width: "100%", height: 300 }} />}
          renderItem={(itm: any) => {
            return (
              <TouchableOpacity
                key={itm.index.toString()}
                onPress={() =>
                  onSelect(data === "State" ? itm.item.state : itm.item, data, itm.index)
                }
                style={{ padding: 3, backgroundColor: "white" }}
              >
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#707070",
                    padding: 10,
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Text
                    text={data === "State" ? itm.item.state : itm.item}
                    style={{ color: "#49669E", fontWeight: "bold", textAlignVertical: "top" }}
                  />
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </View>
  )
})
