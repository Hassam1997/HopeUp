import * as React from "react"
import { Image, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface UnderConstructionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
}

/**
 * Describe your component here
 */
export function UnderConstruction(props: UnderConstructionProps) {
  const { style } = props

  return (
    <View style={[CONTAINER, style]}>
      <Image
        source={require("../../../assets/UnderConstruction.png")}
        resizeMode="contain"
        style={{ height: 300, width: 350 }}
      />
    </View>
  )
}
