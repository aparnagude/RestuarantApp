import React, {Component} from 'react';
import {View, Text,StatusBar,FlatList,ImageBackground,Image,StyleSheet,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import string from '../../design/strings';
import window, { heights, widths } from '../../design/dimen';
import {  ScrollView } from 'react-native-gesture-handler';
import BackgroundCarousel from '../../components/BackgroundCarousel';
import BottomBar from '../../components/BootomBar';
import serverConfig from '../../config/serverConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Entypo';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            ItemList:[
                {"id":"1","name":"Chicken Biriyani","image":require('../../assets/tanduri_chicken.jpg'),"price":"250"},
                {"id":"2","name":"Cooked dish on gray bowl","image":require('../../assets/main_background.jpg'),"price":"450"},
                {"id":"3","name":"Fish Fry","image":require('../../assets/fish_fry.jpg'),"price":"250"},
                {"id":"4","name":"Grilled steak with vegetables on white ceramic plate","image":require('../../assets/food_image2.jpg'),"price":"250"},
                {"id":"5","name":"Cooked dish on gray bowl","image":require('../../assets/main_background.jpg'),"price":"450"},
                {"id":"6","name":"Fish Fry","image":require('../../assets/fish_fry.jpg'),"price":"250"},

            ],
            images:[
              require('../../assets/fish_fry.jpg'),
              require('../../assets/food_image.jpg'),
              require('../../assets/main_background.jpg'),
              require('../../assets/tanduri_chicken.jpg'),

            ],
            bottomList: [
              {
                id: 'Veg',
                name: 'Veg',
                image:require('../../assets/veg.png')
              },
              {
                id: 'NonVeg',
                name: 'Non Veg',
                image:require('../../assets/non_Veg.png')
              },
              {
                id: 'Starter',
                name: 'Starters',
                image:require('../../assets/veg.png')
              },
              {
                id: 'Dessert',
                name: 'Desserts',
                image:require('../../assets/dessert.png')
              },
              
            ],
            token:'',
            counter: [],
            count:0,
            visible:false,
            btprice:[],
            totalprice:0,
            popularList:[]
        }
    }

   async componentWillMount(){

    const userToken = await AsyncStorage.getItem('auth');
    this.setState({token:userToken});
    this.recomDishes();

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
        if(this.state.btprice[i]>0){
         let obj = {
           "id":this.state.ItemList[i].id,
           "name":this.state.ItemList[i].itemName,
           "totalprice":this.state.ItemList[i],
           
           "itemId":this.state.ItemList[i].itemId,
           
           "itemType":this.state.ItemList[i].itemType,
           "counter":this.state.counter[i],
           "totalAmount":this.state.totalprice,
           "price":this.state.ItemList[i].price,
          
     
           
           }
     
           fArray.push(obj);
        }
      }
     //console.warn(fArray);
       this.props.navigation.navigate('CartListScreen',{fArray});
     
     
     }



    
    recomDishes = ()  => {
     
          
            
              var url = serverConfig.baseUrl+'api/items';
             
              console.warn("url: "+url);
            
          
              _this = this;
             
              fetch(url, {
                method: 'GET',
                
                 headers:{
                 'Content-Type': 'application/json',
                  'Authorization':_this.state.token,
                 }
               }).then( function(response) {
               
                if (response.status == 200) {
                 
                
                    response.json().then(function(data) {
                      console.warn(data);
                    
                      var cropList =data;
     
  
                      for(i=0;i<cropList.length;i++){
                       let count=_this.state.counter;
                       count[i]=0;
                       
                        _this.setState({counter:count});
                        //console.warn(_this.state.counter);
                     
          
                        
                    
                      }
                      _this.setState({ItemList:data,popularList:data});
                    });
                   
                
                 
                } else {
                  response.json().then(function(data) {
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
                    
                  });
           
                   
                   }
  

    _bootstrap = async () => {
     

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    navigatetoScreen (route) {
      console.warn(route)
    
        this.props.navigation.navigate(route);
      
    }

    render(){
        return(
            <View style={styles.container}>
                <StatusBar backgroundColor={color.primary} barStyle="default"/>
               <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:50}}>
                <View style={styles.secondContainer}>
                <View style={{backgroundColor:color.white}}>
                <BackgroundCarousel images={this.state.images} />

                </View>


                    <Text style={styles.headingText}>POPULAR DISHES</Text>
                <FlatList
        data={this.state.popularList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}

        renderItem={({ item }) => 
        <View style={styles.cardContainer}>
             <ImageBackground style={styles.Background} source={require('../../assets/food_image.jpg')}>
            <View style={styles.overlay} /> 
            </ImageBackground>
            <View style={styles.columnContainer}>
                <Text style={styles.name} numberOfLines={2}>{item.itemName}</Text>
                <View style={styles.rowContainer}>
                <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.primaryColor,}}>{'\u20B9'+item.price}</Text>
               <TouchableOpacity style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5,}}>
                   <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD</Text>
               </TouchableOpacity>
                </View>
                </View>
            </View>
       
    }
        keyExtractor={item => item.id}
      />



<Text style={styles.headingText}>RECOMMENDED DISHES</Text>
                <FlatList
        data={this.state.ItemList}
        columnWrapperStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        
        contentContainerStyle={this.state.visible==true?{marginBottom:50}:{marginBottom:0}}
        numColumns={2}
        renderItem={({ item,index }) => 
        <View style={styles.cardContainer2}>
             <ImageBackground style={styles.Background} source={require('../../assets/food_image.jpg')}>
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
              
              
              
               {/* <TouchableOpacity style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5,}}>
                   <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD</Text>
               </TouchableOpacity> */}
                </View>
                </View>
            </View>
       
    }
        keyExtractor={item => item.id}
      />
</View>

              
                </ScrollView>


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
                 <View>
                 <BottomBar 
                
                onPressDetails={(key) =>this.navigatetoScreen(key)} 
      
                  bottomList={this.state.bottomList}/>
                  </View> 
                </View>
            </View>
        );
    }

}
export default Home;
const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      backgroundColor: "white"
     },
  
secondContainer:{
  flex:1,
  alignItems:'center',
  marginVertical:10,
  paddingBottom:20
},
headingText:{
  fontFamily:string.fontLato,
  color:color.black,
  fontSize:18,
  alignSelf:'flex-start',
  marginHorizontal:10,
marginTop:20,
  
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
  elevation:5,
//  height:230,
  marginVertical:10
},
cardContainer2:{
  backgroundColor:color.white,
  width:widths.by2p2,
  marginHorizontal:5,
  borderRadius:5,
  elevation:5,
  // height:230,
  marginVertical:5
},
columnContainer:{
  flexDirection:'column',
  justifyContent:'space-between',
  marginHorizontal:10
},
bottomBar:{
  position:'absolute',
  bottom:0,
  backgroundColor:color.secondaryColor,
  width:'100%',
  height:50,
justifyContent:'space-between',
alignItems:'center',
flexDirection:'row',
paddingHorizontal:10,
marginTop:20,
flex:3
},
name:{
  fontFamily:string.fontLatoSemi,
  fontSize:16,
  color:color.black,
  marginTop:10

},
row: {
  flex: 1,
  justifyContent: "space-between"
},
rowContainer:{
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
  elevation:5,
  flexDirection:'column'
},

    header: {
      alignSelf: Platform.OS === 'ios' ? 'flex-start' : 'center',
      justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'center',
    },
    Background: {
        height:heights.by6,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5
       
       
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(34,34,34,0.7)',
        borderRadius:5
      },

  
  
    
  
  
 
   
  });
  
 