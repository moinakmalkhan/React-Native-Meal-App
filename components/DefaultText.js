import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DefaultText = (props) => {
    return (
        <View>
            <Text style={style.defaultTextStyle} {...props}>{props.children}</Text>
        </View>
    )
}

export default DefaultText

const styles = StyleSheet.create({
    defaultTextStyle:{
        fontFamily:"open-sans"
    }
})
