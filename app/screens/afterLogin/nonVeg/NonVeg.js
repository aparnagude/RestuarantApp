import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView, Text, View,StyleSheet,TouchableOpacity,Image,
  Platform,ImageBackground,StatusBar,FlatList,ActivityIndicator} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo'
import string from '../../../design/strings';
import color from '../../../design/colors';
import AsyncStorage from '@react-native-community/async-storage';
import window, { heights, widths } from '../../../design/dimen';
import baseStyle from '../../../design/styles';
import BottomBar from '../../../components/BootomBar';
import serverConfig from '../../../config/serverConfig';

class NonVeg extends Component {
constructor(props){
    super(props);
    this.state={
        ItemList:[
            // {"id":"1","name":"Chicken Biriyani","image":require('../../../assets/tanduri_chicken.jpg'),"price":"250"},
            // {"id":"2","name":"Cooked dish on gray bowl","image":require('../../../assets/main_background.jpg'),"price":"450"},
            // {"id":"3","name":"Fish Fry","image":require('../../../assets/fish_fry.jpg'),"price":"250"},
            // {"id":"4","name":"Grilled steak with vegetables on white ceramic plate","image":require('../../../assets/food_image2.jpg'),"price":"250"},
            // {"id":"5","name":"Cooked dish on gray bowl","image":require('../../../assets/main_background.jpg'),"price":"450"},
            // {"id":"6","name":"Fish Fry","image":require('../../../assets/fish_fry.jpg'),"price":"250"},

        ],
        bottomList: [
            {
              id: 'Veg',
              name: 'Veg',
              image:require('../../../assets/veg.png')
            },
            {
              id: 'NonVeg',
              name: 'Non Veg',
              image:require('../../../assets/non_Veg.png')
            },
            {
              id: 'Starter',
              name: 'Starters',
              image:require('../../../assets/veg.png')
            },
            {
              id: 'Dessert',
              name: 'Desserts',
              image:require('../../../assets/dessert.png')
            },
            
          ],
          token:'',
          userId:'',
          itemType:'',
          loading:false,
          counter: [],
          count:0,
          visible:false,
          btprice:[],
          totalprice:0,
         
    }
}


async componentWillMount(){

  const userToken = await AsyncStorage.getItem('auth');
  const user = await AsyncStorage.getItem('user');
  const userdet=JSON.parse(user);
  console.warn(userdet.userId);
  this.setState({token:userToken,userId:userdet.userId,itemType:this.props.navigation.state.params.itemType});
  this.allDishes();

  }

allDishes = ()  => {
     
          
       this.setState({loading:true});     
  var url = serverConfig.baseUrl+'api/items/'+this.state.itemType;
 
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
       _this.setState({loading:false});
    if (response.status == 200) {
     
    
        response.json().then(function(data) {
          console.warn(data);
          var cropList =data;
     
  
          for(i=0;i<cropList.length;i++){
           let count=_this.state.counter;
           count[i]=0;
           
            _this.setState({counter:count});
          }
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


       incrementFunc(index, price){

        console.warn(price);
            let variable=`${index}`;
            let b=this.state.btprice.slice();
           
           
            let integer=0;
            let counter = {...this.state.counter}
            counter[index] = counter[index] || 0;
            counter[index] += 1;
          
            if(Object.keys(counter).includes(variable)){
             
              const values = Object.values(counter)[variable];
              integer=price*values;
              b[variable]=integer;
              
            }
          
          this.setState({counter:counter,btprice:b});
           setTimeout(()=>{
          
          
          
          
           
              
           
           this.renderBottom(index,price);
          //console.warn(counter[index]);
          
           },500);
          }
          decrementFunc(index, price){
            let variable=`${index}`;
            let b=this.state.btprice.slice();
            let counter = {...this.state.counter}
            counter[index] = counter[index] || 0;
            counter[index] -= 1;
            if(Object.keys(counter).includes(variable)){
              const values = Object.values(counter)[variable];
              integer=price*values;
              b[variable]=integer;
              
            }
            this.setState({ counter,btprice:b },
              ()=>{
           
            })
            setTimeout(()=>{
             
              this.renderBottom(index,price);
             
              },500);
          }
          
          renderBottom(index,price){
            let count=0;
            let integer=0;
            
            for(i=0;i<this.state.ItemList.length;i++){
          //console.warn(counter[i]);
            if(this.state.counter[i]>0){
              count=this.state.counter[i]+count;
              
           }
          
             
            }
            for(i=0;i<this.state.btprice.length;i++){
              if(this.state.btprice[i]!=null){
                integer=this.state.btprice[i]+integer;
              }
              
          
            }
          
            if(count>0){
              setTimeout(()=>{
          
                this.setState({count:count,totalprice:integer});
                this.setState({ visible: true });
              },500);
             
            }
            else{
              this.setState({ visible: false });
            }
          }
      
      
      
          nextScreen(){
            // this._toggleBottomNavigationView();
           // this.setState({ visible: false });
            var fArray = new Array();
            for(i=0;i<this.state.ItemList.length;i++){
              console.warn(this.state.ItemList[i].itemName,this.state.ItemList[i].itemId,this.state.ItemList[i].itemType)
              if(this.state.btprice[i]>0){
               let obj = {
                 "id":this.state.ItemList[i].id,
                 "name":this.state.ItemList[i].itemName,
                //  "totalprice":this.state.ItemList[i],
                 
                 "itemId":this.state.ItemList[i].itemId,
                 
                 "itemType":this.state.ItemList[i].itemType,
                 "counter":this.state.counter[i],
                 "totalAmount":this.state.totalprice,
                 "price":this.state.ItemList[i].price,
                
           
                 
                 }
           
                 fArray.push(obj);
              }
            }
          console.warn(fArray);
             this.props.navigation.navigate('CartListScreen',{cartList:fArray});
           
           
           }
      
      
      



render(){
    return(
             <View style={styles.MainContainer}>
                <StatusBar backgroundColor={color.primary} barStyle="default"/>
                {
                   this.state.loading?
                   <ActivityIndicator color={color.primaryColor} size='large' style={{justifyContent:'center', alignItems:'center', alignSelf:'center',marginTop:100}}/> 
                   : 
                  
                <View style={{marginBottom:20,backgroundColor:color.white}}>
                  
                   
               {/* TopBar  */}
                 {/* <View style={styles.topbarContainer}>
                  <View style={styles.rowConatiner}>
                    <TouchableOpacity style={styles.rowContainer3}>
                      <Icon name='sort' size={25} style={{alignSelf:'center',color:color.primary}} />
                      <Text style={styles.topext}>Sort</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rowContainer3}
                    onPress={this.navigateToScreen('Filter')}>
                    <TouchableOpacity  onPress={this.navigateToScreen('Filter')}>   
                         <Icon2 name='filter-list' size={25} style={{alignSelf:'center',color:color.primary}} />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.navigateToScreen('Filter')}>
                    <Text style={styles.topext}>Filter</Text>
                        </TouchableOpacity>  
                    </TouchableOpacity>
                  </View>
                 </View> */}

               {/* List */}
               {
                     this.state.ItemList==''?
                     <Text style={{color:color.linecolor,fontFamily:string.fontLato,fontSize:18,alignSelf:'center',justifyContent:'center',marginTop:50}}>Items not available</Text>

                     :
               <ScrollView style={{marginBottom:70,}}>
                   
                <Text style={styles.headingText}>RECOMMENDED DISHES</Text>
                <FlatList
                    data={this.state.ItemList}
                
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={this.state.visible==true?{marginBottom:30}:{marginBottom:0}}
                    numColumns={2}
                    renderItem={({ item,index }) => 
                    <View style={styles.cardContainer2}>
                        <ImageBackground style={styles.Background} source={require('../../../assets/food_image.jpg')}>
                        <View style={styles.overlay} /> 
                        </ImageBackground>
                        <View style={styles.columnContainer}>
                <Text style={styles.name} numberOfLines={2}>{item.itemName}</Text>
                <View style={styles.rowContainer}>
                <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.primaryColor,}}>{'\u20B9'+item.price}</Text>
              
                {
                      this.state.counter[index]==0?
                     <TouchableOpacity 
                   style={{backgroundColor:color.primaryColor,padding:5,alignSelf:'center', borderRadius:2,  }}
                   onPress={()=>this.incrementFunc(index,item.price)}>
                    <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD </Text>
                   </TouchableOpacity>
                   :
                   <View style={{backgroundColor:color.primaryColor,padding:5,alignSelf:'center', borderRadius:2,
                    flexDirection:'row',justifyContent:'space-between'}}>
                   <TouchableOpacity onPress={()=>this.decrementFunc(index,item.price)}> 
                  <Icon3 name="minus" size={20} color={color.white} /> 
                  </TouchableOpacity>
                   <Text style={{color:color.white,alignSelf:'center',paddingHorizontal:10}}>{this.state.counter[index]}</Text>
                   
                  <TouchableOpacity onPress={()=>this.incrementFunc(index,item.price)}>
                  <Icon3 name="plus" size={20} color={color.white} />
                  </TouchableOpacity>

              
                  </View>
                   }
              
              
           
            
                </View>
                </View>
                    </View>
       
    }
        keyExtractor={item => item.id}
      />
               </ScrollView>
  }
               </View>
}
<View style={styles.bottomContainer}>
                  {
 this.state.visible?
                 
                  <View style={{flexDirection:'row',backgroundColor:color.primary,width:'100%',
  height:50,
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row',
paddingHorizontal:10,

flex:3}}>
                  <Text style={styles.bottomText}>{this.state.count+' Items'+' | '+'\u20B9 '+this.state.totalprice}</Text>
<TouchableOpacity onPress={()=>this.nextScreen()}>
    <Text style={styles.bottomText}>View Cart</Text>
     </TouchableOpacity> 
                  </View>
                  :null
 }
               
                </View>

             </View>
    );
}
}

export default NonVeg;

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
rowContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginVertical:10
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