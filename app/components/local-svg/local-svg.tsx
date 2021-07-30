import * as React from "react"
import { TextStyle, View, ViewStyle, Dimensions } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../"

const { height, width } = Dimensions.get('screen')

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface LocalSvgProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  Component?: any

  heighted?: any

  widthed?: any
}

/**
 * Describe your component here
 */
export function LocalSvg(props: LocalSvgProps) {
  const { style, Component, heighted, widthed } = props

  return (
    <View style={[CONTAINER, style]}>
      <Component height={heighted && heighted > 0 ? heighted : height * 0.2} width={widthed && widthed > 0 ? widthed : width * 0.45} />
    </View>
  )
}
