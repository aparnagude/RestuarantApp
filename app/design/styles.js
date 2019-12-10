import { StyleSheet, Platform } from 'react-native';
import window, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL, button, heights, widths } from './dimen';
import color from './colors';
import string from './strings';

 const baseStyle=StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor:color.white,
       
    },
    Background: {
        width:'100%',
        height:250,
       
    },
    ImageBackground: {
        width:'100%',
        height:250,
     
      
      
 },
 overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(34,34,34,0.4)',
  },
 CircleImage: {
     backgroundColor:color.primaryColor,
     width:widths.by3p5,
     height:widths.by3p5,
     borderRadius:widths.by3p5,
     position:'absolute',
     bottom:-40,
     alignSelf:'center'
 },

 logoImage:{
 width:widths.by5,
     height:widths.by5,
     alignSelf:'center',
     tintColor:color.white,
     justifyContent:'center',
     marginVertical:15,
    
 },
 SignUpButton:{
     backgroundColor:color.primaryColor,
     borderRadius:5,
     alignSelf:'center',
     marginVertical:15,
     marginHorizontal:10,
     padding:10,
     width:'90%',

 },
 text:{
    alignSelf:'center',
    fontFamily:string.fontSouceReg,
    fontSize:20
},
buttonText:{
   alignSelf:'center',
   fontFamily:string.fontLatoMed,
   fontSize:16,
   color:color.white
},
smallText:{
    alignSelf:'center',
    fontFamily:string.fontLatoMed,
    fontSize:16,
    color:color.textlight,
    marginHorizontal:15,
 },


    loadingStyle:{
        justifyContent:'center',
        alignSelf:'center', 
        alignItems:'center', 
       backgroundColor:color.primaryColor,
        width: 50, 
        height: 50, 
        borderRadius: 50/2, 
        },

 })

 export default baseStyle;