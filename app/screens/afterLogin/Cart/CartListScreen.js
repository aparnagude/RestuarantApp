import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView, Text, View,StyleSheet,TouchableOpacity,Image,Platform,ImageBackground,StatusBar,FlatList} from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import string from '../../../design/strings';
import color from '../../../design/colors';
import AsyncStorage from '@react-native-community/async-storage';
import window, { heights, widths } from '../../../design/dimen';
import baseStyle from '../../../design/styles';
import BottomBar from '../../../components/BootomBar';

class CartListScreen extends Component {
constructor(props){
    super(props);
    this.state={
        counter: [],
     count:0,
     btprice:[],
     totalprice:0,
     productsList:[],
     visible:false,
     userId:'',
    }
}


async componentWillMount(){
     console.warn('----->',this.props.navigation.state.params.cartList);
    const user = await AsyncStorage.getItem('user');
        const userdet=JSON.parse(user);
        console.warn(userdet.userId);
        this.setState({userId:userdet.userId});
       let b=this.state.counter.slice();
       let t=this.state.totalprice;
      
           for(i=0;i<this.props.navigation.state.params.cartList.length;i++){
             b[i]=this.props.navigation.state.params.cartList[i].counter;
             t=this.props.navigation.state.params.cartList[i].totalAmount
             
             
           }
           this.setState({counter:b,productsList:this.props.navigation.state.params.cartList,totalprice:t});
let count=0;
           for(i=0;i<this.state.productsList.length;i++){
            
              if(this.state.counter[i]>0){
                count=this.state.counter[i]+count;
                console.warn('000000',count)
               
             }
            
               
              }
              this.setState({count:count});
              if(count>0){
                this.setState({visible:true});
              }
            
        }


        incrementFunc(index, price){

  
          let variable=`${index}`;
          let b=this.state.btprice.slice();
         
         
          let integer=0;
          let counter = {...this.state.counter}
          counter[index] = counter[index] || 0;
          counter[index] += 1;
 
          for(i=0;i<this.state.productsList.length;i++){
            const values = Object.values(counter)[i];
            integer=this.state.productsList[i].price*values;
            b[i]=integer;
          }
        
        this.setState({counter:counter,btprice:b});
         setTimeout(()=>{
        

        
         
            
         
         this.renderBottom(index,price);
    
        
         },500);
        }
        decrementFunc(index, price){
          let variable=`${index}`;
          let b=this.state.btprice.slice();
          let counter = {...this.state.counter}
          let integer=0;
          counter[index] = counter[index] || 0;
          counter[index] -= 1;

          for(i=0;i<this.state.productsList.length;i++){
            const values = Object.values(counter)[i];
            integer=this.state.productsList[i].price*values;
            b[i]=integer;
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
    
          for(i=0;i<this.state.productsList.length;i++){

          if(this.state.counter[i]>0){
            count=this.state.counter[i]+count;
            for(i=0;i<this.state.btprice.length;i++){
              if(this.state.btprice[i]!=null){
                integer=this.state.btprice[i]+integer;
              }
              
          
            }
         }
        
           
          }
        
        
          if(count>0){
            setTimeout(()=>{
        
              this.setState({count:count,totalprice:integer});
              this.setState({ visible: true });
            },500);
           
          }
          else{
            this.setState({ visible: false,totalprice:0 });
          }
        }



render(){
    return(
        <View style={{flex:1,backgroundColor:color.light}}>
        <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,backgroundColor:color.white,width:'100%',paddingVertical:10,marginVertical:20}}>
        <Text style={{color:color.black,fontFamily:string.fontLato,fontSize:18,alignSelf:'flex-start',marginHorizontal:10,marginVertical:10}}>Product Details</Text>
        <View style={{width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>

        <FlatList
    
    data={this.state.productsList}
    extraData={this.state.counter}

    renderItem={({ item,index }) =>  (
      <View style={{width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between',}}>
           <Text  numberOfLines={2} style={{color:color.primary,fontFamily:string.fontLatoSemi,fontSize:15,alignSelf:'center',}}>{item.name+' ( '+item.itemType+' )'}</Text>
           <View style={{alignItems:'center',alignSelf:'flex-end',flexDirection:'row',marginHorizontal:10,marginBottom:10}}>
           {
            this.state.counter[index]==0 ?
           <TouchableOpacity 
         style={{alignSelf:'center',padding:10,borderRadius:2,borderWidth:1,borderColor:color.secondaryColor,alignSelf:'flex-end'}}
         onPress={()=>this.incrementFunc(index,item.price)}>
          <Text style={{color:color.primary,alignSelf:'center',paddingHorizontal:10}}>ADD </Text>
         </TouchableOpacity>
         :
           <View style={{alignSelf:'center',padding:10,borderRadius:2,borderWidth:1,borderColor:color.secondaryColor,flexDirection:'row',alignSelf:'flex-end'}}>
         <TouchableOpacity onPress={()=>this.decrementFunc(index,item.price)}> 
        <Icon3 name="minus" size={20} color={color.primary} /> 
        </TouchableOpacity>
         <Text style={{color:color.primary,alignSelf:'center',paddingHorizontal:10}}>{this.state.counter[index]}</Text>
         
        <TouchableOpacity onPress={()=>this.incrementFunc(index,item.price)}>
        <Icon3 name="plus" size={20} color={color.primary} />
        </TouchableOpacity>
       </View>
           }
          
             <Text style={{color:color.primary,fontFamily:string.fontLatoSemi,fontSize:15,alignSelf:'center',paddingHorizontal:10}}>{'\u20B9 '+item.price}</Text>


           </View>
           </View>

          

)}

keyExtractor={item => item.id}
/>
</View>
        </View>


        <View style={{flexDirection:'column',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10,backgroundColor:color.white,width:'100%',paddingVertical:10,marginVertical:10}}>
        <Text style={{color:color.black,fontFamily:string.fontLato,fontSize:18,alignSelf:'flex-start',marginHorizontal:10,marginVertical:10}}>Bill Details</Text>

        <View style={{width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>

           <Text style={{color:color.primary,fontFamily:string.fontLatoSemi,fontSize:15,alignSelf:'center',marginHorizontal:10}}>Item total</Text>
           <View style={{alignItems:'center',alignSelf:'flex-end',flexDirection:'row',marginHorizontal:10}}>
          
        <Text style={{color:color.primary,fontFamily:string.fontLatoSemi,fontSize:15,alignSelf:'center',paddingHorizontal:10}}>{'\u20B9 '+this.state.totalprice}</Text>

           </View>
           </View>
           <View style={{width:'100%',alignItems:'center',flexDirection:'row',justifyContent:'space-between'}}>

<Text style={{color:color.primary,fontFamily:string.fontLatoSemi,fontSize:15,alignSelf:'center',marginHorizontal:10}}>To pay</Text>
<View style={{alignItems:'center',alignSelf:'flex-end',flexDirection:'row',marginHorizontal:10}}>

<Text style={{color:color.primary,fontFamily:string.fontLatoSemi,fontSize:15,alignSelf:'center',paddingHorizontal:10,marginVertical:10}}>{'\u20B9 '+this.state.totalprice}</Text>

</View>
</View>
        </View>
{

this.state.visible?

          <View style={{position:'absolute',bottom:0,backgroundColor:color.primaryColor,width:'100%',height:50,justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingHorizontal:10}}>
    
      <Text style={{color:color.white,fontFamily:string.fontLatoMed,}}> {'Price    '+'\u20B9 '+this.state.totalprice}</Text>
     
   
   <TouchableOpacity onPress={() => {this.setState({ paymentDialog: true });}}>
   <Text style={{color:color.white,fontFamily:string.fontLatoMed,}}>Pay Now</Text>
     </TouchableOpacity> 

   </View>
   :null
}



      </View>
    );
}
}

export default CartListScreen;

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


  cardContainer2:{
    backgroundColor:color.white,
    width:170,
    marginHorizontal:5,
    borderRadius:5,
    elevation:5,
    height:230,
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