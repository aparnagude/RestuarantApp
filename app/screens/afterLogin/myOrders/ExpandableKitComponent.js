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

import baseStyle from './../../../design/styles';
import color from './../../../design/colors';
import string from './../../../design/strings';

import Icon from 'react-native-vector-icons/FontAwesome';
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
      <View style={{marginHorizontal:widths.dp12}}>
        {/*Header of the Expandable List Item*/}
        <View  style={styles.header}>
        <TouchableOpacity
          // activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:5}}>
          <Text style={styles.cardHeading}>{this.props.item.orderedDate} - {this.props.item.day}</Text>
          <Icon name="chevron-circle-down" size={20}  color={color.white}/>
        </TouchableOpacity>

      
       </View>
        <View
          style={{ height: this.state.layoutHeight,overflow: 'hidden',}}>
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.items.map((item, key) => (
           

      <View style={styles.cardContainer}>
          <View style={{backgroundColor:color.primaryColor,position:'absolute',right:0,top:0,borderRadius:4,elevation:1}}>
        <Text style={[{color:color.white,alignSelf:'center',padding:5,fontFamily:string.fontLatoSemi,fontSize:widths.dp16,backgroundColor:color.primary,borderRadius:4,}]}>{'Table '+item.tableNo}</Text>
 
        </View>
      <View style={{flexDirection:'row',marginHorizontal:widths.dp10 }}>
      <Image source={require('../../../assets/food_image.jpg')} style={{ height:heights.by6,width:heights.by6, resizeMode: 'contain',borderBottomLeftRadius:4,borderTopLeftRadius:4,borderBottomRightRadius:4,borderTopRightRadius:4}} />
        <View style={{flexDirection:'column',marginHorizontal:widths.dp10,alignSelf:'center'}}>
        <Text style={[{alignSelf:'flex-start',color:color.primaryColor,fontFamily:string.fontLato,fontSize:widths.dp18,fontWeight:'900',marginBottom:5}]}>{item.itemName}</Text>
        <Text style={[{alignSelf:'flex-start',color:color.black,fontFamily:string.fontLatoSemi,marginBottom:5,fontSize:widths.dp16}]}>{'\u20B9 '+item.price+' | Qty: '+item.quantity}</Text>
        <Text style={[{alignSelf:'flex-start',color:color.primary,fontFamily:string.fontLatoSemi,fontSize:widths.dp16}]}>{'Type: '+item.itemType}</Text>

        </View>
 
     
      </View>
   






</View> 
 ))} 
        </View>
      </View>
    );
  }
}
 


const styles = StyleSheet.create({

  header: {
    flexDirection:'row',
    backgroundColor: color.secondaryColor,
    paddingVertical:5,
    paddingHorizontal:15,
    marginTop:widths.dp8,
    alignItems:'center',
    borderRadius:15,
    justifyContent: 'center',
    alignSelf: 'baseline',
  },
cardContainer: {
position:'relative',
flexDirection: 'column',
 
 borderRadius:heights.dp2,
marginVertical:widths.dp12,
marginHorizontal:widths.dp12,
elevation:1,


},
modeBar: {
width: "100%",
flexDirection: "row",
justifyContent: "space-around",
alignItems: "center",

marginTop:5,
marginBottom:10,


},
cardHeading: {
flex: 1,
fontSize:widths.dp17, 
letterSpacing: 0.67,
fontFamily: string.fontLato,
color: color.white,


// marginHorizontal:10
//textAlign:'center'
},
kitDescTxt : {
  flex:1,
  fontSize: widths.dp15, 
  color: color.black, 
  alignSelf:'flex-start',
  fontFamily: string.fontLatoMed,

},



});
 
