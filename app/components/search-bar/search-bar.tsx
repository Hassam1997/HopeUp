import React, { useEffect } from "react"
import { TextStyle, View, ViewStyle, TextInput } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text, Icon } from "../"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.primary,
}

export interface SearchBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle

  keyword?: string

  setKeyword?: (e: any) => any

  ApiResponse?: () => any

  setFlag?: (e: any) => any

  isResponse?: () => any
}

/**
 * Describe your component here
 */
export const SearchBar = observer(function SearchBar(props: SearchBarProps) {
  const { style, keyword, setKeyword, ApiResponse, setFlag, isResponse } = props

  const handleClick = () => {
    ApiResponse()
  }

  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        alignSelf: "center",
        height: 40,
        borderRadius: 50,
        elevation: 10,
        marginVertical: 10,
        shadowColor: "#C5C5C5",
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12,
      }}
    >
      <View style={{ padding: 10 }}>
        <Icon icon="search" />
      </View>
      <TextInput
        placeholder="Search"
        value={keyword}
        onChangeText={(e) => setKeyword(e)}
        style={{ width: "80%" }}
        onKeyPress={handleClick}
      />
    </View>
  )
})
