import React, {Component} from 'react';
import {View, Text,StatusBar,FlatList,TextInput,Image,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import color from '../../design/colors';
import string from '../../design/strings';
import window, { heights, widths } from '../../design/dimen';
import {  ScrollView } from 'react-native-gesture-handler';
import BackgroundCarousel from '../../components/BackgroundCarousel';
import BottomBar from '../../components/BootomBar';
import serverConfig from '../../config/serverConfig';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/Entypo'
import Message from '../../components/Message';
import Dialog, { DialogTitle,DialogButton, DialogContent ,DialogFooter,ScaleAnimation} from 'react-native-popup-dialog'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
class Home extends Component {


    constructor(props){
        super(props);
        Obj = new Message();
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
            popularList:[],
            loader:false,
            userId:'',
            restId:'',
            tableArray:[],
            tableDialog:false,
            tableNo:''
        }
this.tableData=this.tableData.bind(this);
    }
  

   async componentDidMount(){

    const userToken = await AsyncStorage.getItem('auth');
    const tableId = await AsyncStorage.getItem('tableNo');

    const user = await AsyncStorage.getItem('user');
    const userdet=JSON.parse(user);
    console.warn(userdet.userId);
    this.setState({token:userToken,userId:userdet.userId,restId:userdet.restId,tableNo:tableId});
    this.tableList();
    this.recomDishes();
    this.props.navigation.setParams({ 
      headerSubTitle: this.state.tableNo,
  onPressSyncButton:this.tableData
    });
  //  this.apply_Sky_Blue();

    }
    tableData() {
      this.setState({
          tableDialog: true
      })
    }
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
     
      return {
      headerRight:<TouchableOpacity  onPress={ () => params.onPressSyncButton() }>
      <Text style={{fontFamily:string.fontLato,color:color.black,marginRight:20}}>{"Table "+params.headerSubTitle}</Text>

      </TouchableOpacity> 
      

         
      };
  };
componentDidAppear(){
  this.recomDishes();
}

  tableList() {
    _this=this;
  

var url = serverConfig.baseUrl+'api/tables/'+_this.state.restId;
   console.warn('table',url)
_this.setState({loader:true})
    
  fetch(url, {
  method: 'GET',
  headers:{
  'Content-Type': 'application/json',
  'Authorization': _this.state.token,
  'userid':_this.state.userId,
  // 'uniqueId':this.state.user.uniqueId
  }
  }).then( function(response) {

    _this.setState({loader:false});

    if(response.status === 200){
     
      response.json().then(function(responseJson) {

       console.warn('tables',responseJson);
       _this.setState({
       //   tableDialog: true,
          tableArray:responseJson,
          });
     
        
       
      });
      
    } else {
      response.json().then(function(data) {
        
       Obj.displayAlert(data.error+" "+data.message);
      });
      
     
       
     
    }
  })
  .catch(error => console.warn('Error:', error));

    
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
          "image":this.state.ItemList[i].image,
     
           
           }
     
           fArray.push(obj);
        }
      }
    console.warn(fArray);
       this.props.navigation.navigate('CartListScreen',{cartList:fArray});
     
     
     }



    
    recomDishes = ()  => {
     
          this.setState({loader:true});
            
              var url = serverConfig.baseUrl+'api/items';
             
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
                _this.setState({loader:false});
                if (response.status == 200) {
                 
                
                    response.json().then(function(data) {
                      console.warn(data);
                   
                    var cropList =data;
     
  
                    for(i=0;i<cropList.length;i++){
                     let count=_this.state.counter;
                     count[i]=0;
                     
                      _this.setState({counter:count});
                    }
                   
                      _this.setState({ItemList:data,popularList:data});
                    });
                  
                
                 
                } else {
                  response.json().then(function(data) {
                    _this.setState({loader:false});
                  Obj.displayAlert(data.message);
                });
                 }
                 console.warn("response: "+JSON.stringify(response));
                // Examine the text in the response
               
              })
               .catch((error) => {
                _this.setState({loader:false});
                   console.warn('Error:', error);
                    
                  });
           
                   
                   }
  

    _bootstrap = async () => {
     

        await AsyncStorage.clear();
        this.props.navigation.navigate('Login');
    }

    navigatetoScreen(route){
      this.props.navigation.navigate(route)
    }

    // navigatetoScreen (route) {
    //   console.warn(route)
    // if(route=='Veg'){
    //   this.props.navigation.navigate('NonVeg',{itemType:'VEG',title:'Vegetarian'});

    // }
    // else  if(route=='NonVeg'){
    //   this.props.navigation.navigate('NonVeg',{itemType:'NONVEG',title:'NonVegetarian'});

    // }
    // else  if(route=='Starter'){
    //   this.props.navigation.navigate('NonVeg',{itemType:'STARTER',title:'Starters'});

    // }
    // else  if(route=='Dessert'){
    //   this.props.navigation.navigate('NonVeg',{itemType:'DESSERT',title:'Desserts'});

    // }
      
    // }
    selectTable = (item) => {
      // alert(item);
      console.warn(item);

       this.setState({
         tableDialog: false,
         tableNo:item
         });
       
         this.props.navigation.setParams({ 
          headerSubTitle: item,
      onPressSyncButton:this.tableData
        });
        AsyncStorage.setItem('tableNo',item);
   }
    render(){
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
              
{
this.state.loader?

<ActivityIndicator color={color.primaryColor} size='large' style={{justifyContent:'center',alignSelf:'center'}}/> 

:
               <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:50}}>
                   <View style={styles.rowContainer2}>
                   <Icon name='search' size={30} style={{alignSelf:'center',padding:10,color:color.linecolor}}/>
                <TextInput 
                style={styles.textInput}
                 placeholder='Search for Product' 
                // onChangeText={text => this.searchFilterFunction(text)}
                 placeholderTextColor={color.linecolor}/>   
            
               
               
              </View>
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

                <View style={{flex:1,backgroundColor:color.white,marginHorizontal:4,marginVertical:4,flexDirection:'column'}}>
                  
                  <View style={{position:'absolute',top:10,elevation:3,width:wp('40%'),height:hp('15%'),borderRadius:5,alignSelf:'center'}}>
                  {
                  item.image===''||item.image===null?
                  <Image style={{width:wp('40%'),height:hp('15%'),borderRadius:10}} source={require('../../assets/food_image.jpg')}/>
                :
                <Image style={{width:wp('40%'),height:hp('15%'),borderRadius:10}} source={{uri:item.image}}/>

                }                 
                 </View>
                   <View style={{ width: wp('50%'),height: hp('18%'),elevation:2,marginTop:heights.by10,borderRadius:10,backgroundColor:color.white}}>
                  <View style={{flexDirection:'column',marginTop:widths.by10,}}>
                   <Text style={{fontFamily:string.fontLatoSemi,fontSize:hp('2.8%'),color:color.black,alignSelf:'flex-start',marginTop:10,marginHorizontal:10}} numberOfLines={2}>{item.itemName}</Text>
                   <View style={styles.rowContainer}>
                   <TouchableOpacity style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5,width:wp('17%')}}>
                    <Text style={{fontFamily:string.fontLatoSemi,fontSize:hp('2%'),color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD</Text>
                </TouchableOpacity>
            <Text style={{fontFamily:string.fontLatoSemi,fontSize: hp('2.8%') ,color:color.black,}}>{'\u20B9'+item.price}</Text>
               
                 </View>
                 </View>
                     </View>
                  </View>














        // <View style={styles.cardContainer}>
        //      <ImageBackground style={styles.Background} source={require('../../assets/food_image.jpg')}>
        //     <View style={styles.overlay} /> 
        //     </ImageBackground>
        //     <View style={styles.columnContainer}>
        //         <Text style={styles.name} numberOfLines={2}>{item.itemName}</Text>
        //         <View style={styles.rowContainer}>
        //         <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.primaryColor,}}>{'\u20B9'+item.price}</Text>
        //        <TouchableOpacity style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5,}}>
        //            <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD</Text>
        //        </TouchableOpacity>
        //         </View>
        //         </View>
        //     </View>
       
    }
        keyExtractor={item => item.id}
      />



<Text style={styles.headingText}>RECOMMENDED DISHES</Text>
                <FlatList
        data={this.state.ItemList}
      //  columnWrapperStyle={styles.row}
        showsHorizontalScrollIndicator={false}
        
        contentContainerStyle={this.state.visible==true?{marginBottom:50}:{marginBottom:0}}
       numColumns={2}
        renderItem={({ item,index }) => 


        <View style={{marginHorizontal:4,marginVertical:4,flexDirection:'column'}}>
                  
                  <View style={{position:'absolute',top:10,elevation:3,width:wp('40%'),height:hp('15%'),borderRadius:5,alignSelf:'center'}}>
                {
                  item.image===''||item.image===null?
                  <Image style={{width:wp('40%'),height:hp('15%'),borderRadius:10}} source={require('../../assets/food_image.jpg')}/>
                :
                <Image style={{width:wp('40%'),height:hp('15%'),borderRadius:10}} source={{uri:item.image}}/>

                }
                  </View>
                   <View style={{ width: wp('45%'),height: hp('18%'),elevation:2,marginTop:heights.by10,borderRadius:10,backgroundColor:color.white}}>
                  <View style={{flexDirection:'column',marginTop:widths.by10,}}>
                   <Text style={{fontFamily:string.fontLatoSemi,fontSize:hp('2.5%'),color:color.black,alignSelf:'flex-start',marginTop:10,marginHorizontal:10}} numberOfLines={2}>{item.itemName}</Text>
                   <View style={styles.rowContainer}>

         {
                      this.state.counter[index]==0?

                      <TouchableOpacity style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5,width:wp('17%')}}
                      onPress={()=>this.incrementFunc(index,item.price)}>
                      <Text style={{fontFamily:string.fontLatoSemi,fontSize:hp('2%'),color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD</Text>
                  </TouchableOpacity>
                  
                   :
                   <View style={{backgroundColor:color.primaryColor,borderRadius:5,padding:5,width:wp('21%'),
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


        
  <Text style={{fontFamily:string.fontLatoSemi,fontSize: hp('2.5%') ,color:color.black,}}>{'\u20B9'+item.price}</Text>
     
       </View>
       </View>
           </View>
        </View>







        // <View style={styles.cardContainer2}>
        //      <ImageBackground style={styles.Background} source={require('../../assets/food_image.jpg')}>
        //     <View style={styles.overlay} /> 
        //     </ImageBackground>
        //     <View style={styles.columnContainer}>
        //         <Text style={styles.name} numberOfLines={2}>{item.itemName}</Text>
        //         <View style={styles.rowContainer}>
        //         <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.primaryColor,}}>{'\u20B9'+item.price}</Text>
              
        //         {
        //               this.state.counter[index]==0?
        //              <TouchableOpacity 
        //            style={{backgroundColor:color.primaryColor,padding:5,alignSelf:'center', borderRadius:2,  }}
        //            onPress={()=>this.incrementFunc(index,item.price)}>
        //             <Text style={{fontFamily:string.fontLatoSemi,fontSize:14,color:color.white,alignSelf:'center',paddingHorizontal:10}}>ADD </Text>
        //            </TouchableOpacity>
        //            :
        //            <View style={{backgroundColor:color.primaryColor,padding:5,alignSelf:'center', borderRadius:2,
        //             flexDirection:'row',justifyContent:'space-between'}}>
        //            <TouchableOpacity onPress={()=>this.decrementFunc(index,item.price)}> 
        //           <Icon3 name="minus" size={20} color={color.white} /> 
        //           </TouchableOpacity>
        //            <Text style={{color:color.white,alignSelf:'center',paddingHorizontal:10}}>{this.state.counter[index]}</Text>
                   
        //           <TouchableOpacity onPress={()=>this.incrementFunc(index,item.price)}>
        //           <Icon3 name="plus" size={20} color={color.white} />
        //           </TouchableOpacity>


        //           </View>
        //            }
              
              
              
            
            //     </View>
            //     </View>
            // </View>
          }
        keyExtractor={item => item.id}
      />
</View>

              
                </ScrollView>

           

  }

<Dialog
       visible={this.state.tableDialog}
       width={widths.nintyper}
       style={{backgroundColor:color.white}}
       dialogTitle={<DialogTitle textStyle={{color: color.primaryColor,fontSize: heights.dp12, fontFamily: string.fontLato}} title="Select Table" />}
       footer={
        <DialogFooter> 
          <DialogButton
          text="Cancel"
          textStyle={{color: color.black,fontSize: widths.by25, fontFamily: string.fontLatoMed}}
          onPress={() => {
          this.setState({ tableDialog: false });
          }}
          key="cancelBtn"
          />
          </DialogFooter>
     
          }
       onTouchOutside={() => {
         this.setState({ tableDialog: false });
       }}
       onHardwareBackPress={() => {
         this.setState({ tableDialog: false });
        }}
     >
       <DialogContent>
      <FlatList
       data={this.state.tableArray}
       ItemSeparatorComponent={this.renderSeparator}
       renderItem={({ item }) => (
   <TouchableOpacity key={`${item.id}`} onPress={() => this.selectTable(item.tableId)} style={{padding:10}}>
   
        <Text style={{fontSize:16, color: color.primary, fontFamily: string.fontLatoMed}}>{`${'Table '+item.tableId}`}</Text>
       
   </TouchableOpacity>
   
          )}
       />
      
       </DialogContent>
     </Dialog>

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
                   <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10,marginVertical:10}}>
                   <TouchableOpacity style={styles.buttonConatiner}  
                        onPress={() => this.navigatetoScreen('Home')}>
                <Icon2 name="home" size={25} color={color.white} style={{padding:10,marginBottom:5,}}/>
						</TouchableOpacity>
            <TouchableOpacity style={[styles.buttonConatiner,{backgroundColor:color.white} ]}  
                        onPress={() => this.navigatetoScreen('NonVeg')}>
                <Icon2 name="grid" size={25} color={color.primary} style={{padding:10,marginBottom:5,}}/>
						</TouchableOpacity>
            <TouchableOpacity style={[styles.buttonConatiner,{backgroundColor:color.white} ]} 
                         onPress={()=>this.nextScreen()}>
                <Icon name="cart" size={35} color={color.primary} style={{padding:10,marginBottom:5,}}/>
						</TouchableOpacity>
            <TouchableOpacity style={[styles.buttonConatiner,{backgroundColor:color.white} ]}
                        onPress={() => this.navigatetoScreen('EditProfile')}>
                <Icon2 name="user" size={25} color={color.primary} style={{padding:10,marginBottom:5,}}/>
						</TouchableOpacity>
                   </View>
                 {/* <BottomBar 
                
                onPressDetails={(key) =>this.navigatetoScreen(key)} 
      
                  bottomList={this.state.bottomList}/> */}
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
      backgroundColor: color.white,
      justifyContent:'center',
      marginHorizontal:10
     },
     buttonConatiner:{
     backgroundColor:color.primaryColor,
     borderTopLeftRadius:25,
     borderTopRightRadius:25,
      alignSelf:'center',
      marginBottom:-10
     
    
  },
  rowContainer2:{
    flexDirection:'row',
    marginHorizontal:20,
    
    borderRadius:20,
   elevation:5,
    alignSelf:'center',
  marginVertical:10,
    alignItems:'center',
    backgroundColor:color.white,
    width:wp('90%')
  },
  textInput:{
    alignSelf:'center',
  padding:10,
  fontSize:hp('2.5%'),
  marginRight:10,
 
  color:color.black,
  width:'80%',
  alignContent:'center',
  justifyContent:'center',
  fontFamily:string.fontLatoMed
  
  
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
  fontSize:hp('2.5%'),
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
  elevation:3,
//  height:230,
  marginVertical:10
},
cardContainer2:{
  backgroundColor:color.white,
  width:widths.by2p2,
  marginHorizontal:5,
  borderRadius:5,
   elevation:2,
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
  fontSize:hp('2%'),
  color:color.black,
  alignSelf:'flex-start',
  marginTop:10

},
row: {
  flex: 1,
  justifyContent: "space-between"
},
rowContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginVertical:10,
  marginHorizontal:10
},
bottomContainer:{
  position:'absolute',
  bottom:0,
  left:-10,
  right:-10,
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
  
 