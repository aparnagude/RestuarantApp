import React, {Component} from 'react';
import {View, Text,StatusBar,FlatList,ImageBackground,Image,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import string from '../../design/strings';
import window, { heights, widths } from '../../design/dimen';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import BackgroundCarousel from '../../components/BackgroundCarousel';
import BottomBar from '../../components/BootomBar';
import serverConfig from '../../config/serverConfig';
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
        }
    }

   async componentWillMount(){

    const userToken = await AsyncStorage.getItem('auth');
    this.setState({token:userToken});
    this.recomDishes();

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
                      _this.setState({ItemList:data});
                      
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
        data={this.state.ItemList}
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
        numColumns={2}
        renderItem={({ item }) => 
        <View style={styles.cardContainer2}>
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
</View>

              
                </ScrollView>
                <View style={styles.bottomContainer}>
                 <BottomBar 
                
                onPressDetails={(key) =>this.navigatetoScreen(key)} 
      
                  bottomList={this.state.bottomList}/>
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
  elevation:5
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
  
 