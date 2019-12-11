import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform
} from 'react-native';
//import basic react native components
// import { Card} from 'react-native-elements'
import baseStyle from './../../../design/styles';
import color from './../../../design/colors';
import string from './../../../design/strings';

import Icon from 'react-native-vector-icons/AntDesign';
import Iconn from 'react-native-vector-icons/FontAwesome';
import { window, widths, heights, HEADER_SIZE } from './../../../design/dimen';

export default class ExpandableKitComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }
 
  render() {
    return (
      <View >
        {/*Header of the Expandable List Item*/}
        <View  style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={{flex:1}}>
          <Text style={styles.cardHeading}>{this.props.item.day} - {this.props.item.orderedDate}</Text>
        </TouchableOpacity>

      
       </View>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.items.map((item, key) => (
           

      <View style={styles.cardContainer}>
      <View style={{flex:1,flexDirection:'row' }}>
      <View style={{ width: widths.by6,  
    height:  widths.by6,     
    borderRadius:  widths.by6,              
    backgroundColor: color.white,     
    borderWidth:1.5,     
    borderColor: color.green, alignItems:'center'}}>
      <Image style={{width:widths.by8,height:widths.by8,alignSelf:'center',marginTop:5}}  resizeMode='contain' source={{uri: "https://tech-public.s3.ap-south-1.amazonaws.com/otg/Gardenkit/"+item.image+".png"}}/>   

      </View>
        <Text style={[styles.cardHeading,{alignSelf:'center',color:color.primary}]}>{item.itemName}</Text>

 
  
      </View>
      {/* <View style={styles.modeBar}></View> */}

      <View style={{flexDirection:'row', alignContent:'center', alignItems:'center'}}>
        
      <Text style={styles.kitDescTxt}>{item.price}</Text>
        
        </View>





</View> 



           ))} 
        </View>
      </View>
    );
  }
}
 


const styles = StyleSheet.create({
  
 linkBtnContainer : {
  flexDirection:'row', 
  alignSelf:'center', 
  alignItems:'center', 
 },
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#F5FCFF',
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20,
  },
  header: {
    flex:1,
    paddingHorizontal:widths.dp16,
    paddingVertical:widths.dp5,
    flexDirection: 'row',
  },
  headerText: {
    flex:1,
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#606070',
    padding: 10,
  },
  content: {
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  loadingStyle:{
width: 50, 
height: 50, 
borderRadius: 50/2, 
backgroundColor: color.primary,

paddingVertical:5,
paddingHorizontal:5,  
marginTop:20, 
justifyContent:'center',
alignSelf:'center', 
alignItems:'center', 
},
Flex1: {
flex: 1,
marginTop: 0,
width: '100%'
},
GridViewBlockStyle: {


flex:1,


margin: 5,
backgroundColor: color.appSecondry,
flexGrow:2,
borderRadius:5

},

cardsView:{
  flexDirection: 'row',  
  justifyContent: 'space-between', 
  alignItems: 'center',
  backgroundColor:color.white
},
cardsView2:{
  flexDirection: 'row',  
  justifyContent: 'space-between', 
  alignItems: 'center',
  backgroundColor:color.appSecondry
},


GridViewInsideTextItemStyle: {

 color: color.white,
 padding: 10,
 fontSize: 18,
 justifyContent: 'center',
 
},
cardImage: {
width: widths.by6, 
height: widths.by6, 
justifyContent: 'center',
marginTop:10
},
selectHeadingWhite:{
fontWeight:'900', 
letterSpacing: 0.67,
fontSize:widths.dp17, 
color: color.accent,
fontFamily: 'overpass-regular',
flex:1
},
addPlantView: { 
width:'50%',
justifyContent: 'flex-end',
alignItems: 'center', 
backgroundColor: "#566b82",
alignSelf:'flex-end',
marginRight:10,
borderRadius:5,
padding:5,
marginTop:20
},
addPlantText: {
fontFamily: "overpass-bold",
fontSize: 16,
fontWeight: "900",
fontStyle: "normal",

letterSpacing: 1.87,
textAlign: "left",
color: color.white
},
availableSpace: {
fontFamily: "overpass-bold",
fontSize: 20,
fontWeight: "900",
fontStyle: "normal",

letterSpacing: 1.87,
textAlign: "left",
color: color.cardtext,
margin:15
},


container: {
flex:1,
justifyContent: 'center',
flexDirection: 'column',
paddingHorizontal: 10,

},
cardContainer: {
flex:1,
flexDirection: 'column',
backgroundColor: color.white, 
borderRadius:heights.dp2,
borderColor: color.green,
borderWidth: StyleSheet.hairlineWidth,
marginVertical:widths.dp12,
marginHorizontal:widths.dp12,
elevation:10

},
cardContainer2: {
flex:1,
flexDirection: 'column',
backgroundColor: '#EBE1DF', 
borderRadius:heights.by40,



},
modeBar: {
width: "100%",
flexDirection: "row",
justifyContent: "space-around",
alignItems: "center",
borderColor: color.green,
borderWidth: StyleSheet.hairlineWidth,
marginTop:5,
marginBottom:10,


},
cardHeading: {
flex: 1,
fontSize:widths.dp16, 
letterSpacing: 0.67,
fontFamily: 'overpass-heavy',
color: color.accent,


marginHorizontal:10
//textAlign:'center'
},
cardHeading2: {
flex: 1, 
fontSize:widths.dp16, 
color: color.accent,
letterSpacing: 0.67,
fontFamily: 'overpass-regular',
textAlign: 'center'
},
areaHeading: {
flex: 1, 
fontSize:15, 
color: color.cardtext,
letterSpacing: 0.67,
fontFamily: 'overpass-semibold',
textAlign: 'center'
},
WelcomeHeading: {
flex: 1,
fontSize:15, 
color: color.cardtext,
letterSpacing: 0.67,
fontFamily: 'overpass-semibold',
},
btnContainer: {
marginTop:10,

alignSelf:'flex-end',
},
scheduleBtn: { 
alignItems:'center',
marginBottom:-15,
flexDirection: 'row',
justifyContent: 'center',
backgroundColor: color.primary,
borderRadius: 5,
paddingHorizontal:7,
paddingVertical:7

},
input: {
flex: 1,
height: 25,
padding: 0,
marginVertical: 2,
borderColor: color.appPrimary,
borderWidth: StyleSheet.hairlineWidth,
textAlign: 'center',
color: color.primary
},

stageName:{
flexDirection:'row',
backgroundColor: "#94d8f3",
paddingVertical:5,
paddingHorizontal:15,
marginTop:20,
alignItems:'center',
borderRadius:20,
justifyContent: 'center',
alignSelf: 'baseline'
},

linkBtnText : {
fontSize: widths.dp14, 
color: color.primary, 
alignSelf: 'flex-end',
fontFamily: 'overpass-regular' 
},
kitDescTxt : {
  flex:1,
  fontSize: widths.dp15, 
  color: color.black, 
  alignSelf:'center',
  fontFamily: 'overpass-regular',

},



});
 
