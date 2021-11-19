import React from 'react';
import {
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';
import {FONTS,COLORS} from '../Constants/theme'

const CustomButton = (props) => {
    return (
        <Pressable
            onPress={props.onPressFunction}
            hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
            android_ripple={{ color: '#00000050' }}
            style={({ pressed }) => [
                { backgroundColor: pressed ? '#dddddd' : props.color },
                styles.button,
                { ...props.style }
            ]} >

    <Text style={styles.text}>
        {props.title}
        </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    text: {
        color: COLORS.white,
        ...FONTS.appFontSemiBold,
        margin: 10,
        textAlign: 'center',
    },
    button: {
        width: 150,
        height: 50,
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
    },
})

export default CustomButton;