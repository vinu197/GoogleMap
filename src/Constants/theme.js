import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window')

export const COLORS = {
  
    black: "#000",
    white: "#ffffff",
    golden: "#f7b918",
    yellow:"#EDA800",
    blue: "#0080ff",
}

export const FONTS = {

    appFontSemiBold: { fontFamily: 'Poppins-SemiBold.ttf', fontSize: 20 },
    appFontMedium: { fontFamily: 'Poppins-Medium.ttf', fontSize: 14 },
    appFontRegularsmall: { fontFamily: 'Poppins-Regular.ttf', fontSize: 12 },
    appFontRegular: { fontFamily: 'customFont.ttf', fontSize: 16 },
    appIconFont: { fontFamily: 'icomoon.ttf', fontSize: 25 },
}
export const GLOBALSTYLES = StyleSheet.create({})