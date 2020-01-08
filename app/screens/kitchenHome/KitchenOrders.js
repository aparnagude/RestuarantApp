import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView, Text, View,StyleSheet,TouchableOpacity,LayoutAnimation,
  Image,Platform,StatusBar,FlatList,ActivityIndicator,UIManager} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo'
import string from '../../design/strings';
import color from '../../design/colors';
import AsyncStorage from '@react-native-community/async-storage';
import window, { heights, widths } from '../../design/dimen';
import baseStyle from '../../design/styles';
import BottomBar from '../../components/BootomBar';
import serverConfig from '../../config/serverConfig';
import ExpandableKitComponent from './../afterLogin/myOrders/ExpandableKitComponent'


class KitchenOrders extends Component {
constructor(props){

    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state={
        ItemList:[],
     
          token:'',
          userId:'',
          itemType:'',
          restId:'',
          loading:false,
          tableNo:''
    }
}


async componentWillMount(){

  const userToken = await AsyncStorage.getItem('auth');
  const tableId = await AsyncStorage.getItem('tableNo');

  const user = await AsyncStorage.getItem('user');
  const userdet=JSON.parse(user);
  console.warn(userdet.userId);
  this.setState({token:userToken,userId:userdet.userId,restId:userdet.restId,tableNo:tableId});
  this.myOrders();

  }

  myOrders = ()  => {
     
        this.setState({loading:true});  
        if(this.state.tableNo=='0'){
          this.setState({tableNo:'1'});
        }   
  var url = serverConfig.baseUrl+'api/items/order/list/'+this.state.restId+'/'+this.state.tableNo;
 
  console.warn("url: "+url);


  _this = this;
 
  fetch(url, {
    method: 'GET',
    
     headers:{
     'Content-Type': 'application/json',
      'Authorization':_this.state.token,
      'userId':_this.state.userId
     }
   }).then( function(response) {
   
    if (response.status == 200) {
     
    
        response.json().then(function(data) {
          console.warn(data);
          _this.setState({loading:false});  

          _this.setState({ItemList:data})
  
        });
       
    
     
    } else {
      response.json().then(function(data) {
        _this.setState({loading:false});  

      if(Platform.OS === 'android'){
        ToastAndroid.show(data.message+"---"+JSON.stringify(data),  ToastAndroid.LONG);
      } else {
        alert(data.message)
      }
    });
     }
     console.warn("response: "+JSON.stringify(response));
    // Examine the text in the response
   
  })
   .catch((error) => {
       console.warn('Error:', error);
       _this.setState({loading:false});  

        
      });

       
       }

       updateLayout = index => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = this.state.ItemList;
        array.map((value, placeindex) =>
          placeindex === index
            ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
            : (array[placeindex]['isExpanded'] = false)
        );
        this.setState(() => {
          return {
            ItemList: array,
          };
        });
      };

render(){
    return(
             <View style={styles.MainContainer}>
                <StatusBar backgroundColor={color.primary} barStyle="default"/>
                {
                   this.state.loading?
                   <ActivityIndicator color={color.primaryColor} size='large' style={{justifyContent:'center', alignItems:'center', alignSelf:'center',marginTop:heights.by2half}}/> 
                   : 
                   <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20,marginTop:10,}} >

                    {this.state.ItemList.map((item, key) => (
                    <ExpandableKitComponent
                      key={item}
                      onClickFunction={this.updateLayout.bind(this, key)}
                      item={item}
                    />
                  ))}
                  </ScrollView>
               
               
//                 <FlatList
                 
//                 data={this.state.ItemList}
                
//                 renderItem={({ item,index }) =>  (
//                 <View style={{backgroundColor:color.white,flexDirection:'column',marginHorizontal:5,marginVertical:5}}>
//                 <View style={{backgroundColor:'white',elevation:3,flexDirection:'row',}}>
//                    <TouchableOpacity >
//                       <Image source={require('../../../assets/food_image.jpg')} style={{ height:heights.by6,width:heights.by6, resizeMode: 'stretch',borderBottomLeftRadius:4,borderTopLeftRadius:4,borderBottomRightRadius:4,borderTopRightRadius:4}} />
//                    </TouchableOpacity>

//                    <View style={{flexGrow: 3,flex: 1,marginLeft:10, alignContent:'center',justifyContent:'center',marginRight:10,marginTop:10,marginBottom:5 }}>
//                    <TouchableOpacity  >
//                       <Text numberOfLines = { 1} style={{fontSize: 16, fontFamily: string.fontSourceBold,color:'#04040d'}} >{item.itemName}</Text>
//                       <Text note style={{fontSize: 14, fontFamily: string.fontLatoSemi,marginTop:5,color:'#c0c0c0'}}>{"Quantity: "+item.quantity+" | "+item.itemType}</Text>
//                       <Text note numberOfLines = { 2} style={{fontSize: 14, fontFamily: string.fontLatoSemi,marginTop:5,color:'#c0c0c0'}}>{'\u20B9 '+item.price}</Text>
//   </TouchableOpacity>
                          
                       
//                    </View>
                  
//                  </View>
// </View>
//  )}
           
//  keyExtractor={item => item.sid}

// />
 }
             </View>
    );
}
}

export default KitchenOrders;

const styles=StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor:color.white
},
topbarContainer:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    backgroundColor:color.white,
    elevation:3,
  
},
bottomContainer:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor:color.white,
    elevation:5
  },
  
rowConatiner:{
    flexDirection:'row',
  
    justifyContent:'space-evenly'
   
    
},
rowContainer3:{
    flexDirection:'row',
  
  
    alignSelf:'center',
    padding:10,
  
},
topext:{
    fontSize:16,
    color:color.primary,
    fontFamily:string.fontLato,
    alignSelf:'center',
    marginHorizontal:10
},

bottomText:{
  color:color.white,
  fontFamily:string.fontLato,
  fontSize:16
},
cardContainer:{
  backgroundColor:color.white,
  width:widths.by2p2,
  marginHorizontal:5,
  borderRadius:5,
  elevation:3,
//  height:230,
  marginVertical:10
},
cardContainer2:{
  backgroundColor:color.white,
  width:widths.by2p2,
  marginHorizontal:5,
  borderRadius:5,
  elevation:3,
  // height:230,
  marginVertical:5
},
columnContainer:{
  flexDirection:'column',
  justifyContent:'space-between',
  marginHorizontal:10
},
  name:{
    fontFamily:string.fontLatoSemi,
    fontSize:16,
    color:color.black,
    marginTop:10
  
  },
  rowContainer2:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:10
  },
  bottomContainer:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    backgroundColor:color.white,
    elevation:5
  },
  headingText:{
    fontFamily:string.fontLato,
    color:color.black,
    fontSize:18,
    alignSelf:'flex-start',
    marginHorizontal:10,
  marginTop:40,
    
  },
  Background: {
    height:120,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
   
   
},
overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(34,34,34,0.7)',
  },


})