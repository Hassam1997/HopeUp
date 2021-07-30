import * as React from "react"
import { TextStyle, View, ViewStyle, FlatList, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { USSTATES } from '../../screens/classifieds-screen/usstates.js'

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface StatesProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  index?: any

  onSelect?: (e: any, index: any) => any
}

/**
 * Describe your component here
 */
export const States = observer(function States(props: StatesProps) {
  const { style, onSelect } = props

  return (
    <View style={[CONTAINER, style]}>
      <View style={{ padding: 10 }}>
        <FlatList
          data={USSTATES}
          ListFooterComponent={<View style={{ width: "100%", height: 300 }} />}
          renderItem={(itm: any) => {
            return (
              <TouchableOpacity
                key={itm.index.toString()}
                onPress={() =>
                  onSelect(itm.item, itm.index)
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
                    text={itm.item.name}
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
