import { StyleSheet, Platform } from 'react-native';
import window, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL, button, heights, widths } from './dimen';
import color from './colors';

 const baseStyle=StyleSheet.create({
     MainContainer:{
         flex:1,
         backgroundColor:color.white
     }
 })

 export default baseStyle;