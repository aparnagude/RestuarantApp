import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
// import PropTypes from 'prop-types';
import {ScrollView, Text, View,StyleSheet,TouchableOpacity,Image,Platform,ImageBackground,StatusBar,FlatList} from 'react-native';
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

class NonVeg extends Component {
constructor(props){
    super(props);
    this.state={
        ItemList:[
            {"id":"1","name":"Chicken Biriyani","image":require('../../../assets/tanduri_chicken.jpg'),"price":"250"},
            {"id":"2","name":"Cooked dish on gray bowl","image":require('../../../assets/main_background.jpg'),"price":"450"},
            {"id":"3","name":"Fish Fry","image":require('../../../assets/fish_fry.jpg'),"price":"250"},
            {"id":"4","name":"Grilled steak with vegetables on white ceramic plate","image":require('../../../assets/food_image2.jpg'),"price":"250"},
            {"id":"5","name":"Cooked dish on gray bowl","image":require('../../../assets/main_background.jpg'),"price":"450"},
            {"id":"6","name":"Fish Fry","image":require('../../../assets/fish_fry.jpg'),"price":"250"},

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
    }
}

navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    console.warn(route);
    
      this.props.navigation.dispatch(navigateAction);
   
    
  }


render(){
    return(
             <View style={styles.MainContainer}>
                <StatusBar backgroundColor={color.primary} barStyle="default"/>
                <View style={{marginBottom:20,backgroundColor:color.white}}>
               {/* TopBar  */}
                 <View style={styles.topbarContainer}>
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
                 </View>

               {/* List */}
               <ScrollView style={{marginVertical:20,marginBottom:70,}}>
                   
                <Text style={styles.headingText}>RECOMMENDED DISHES</Text>
                <FlatList
                    data={this.state.ItemList}
                
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({ item }) => 
                    <View style={styles.cardContainer2}>
                        <ImageBackground style={styles.Background} source={item.image}>
                        <View style={styles.overlay} /> 
                        </ImageBackground>
                        <View style={styles.columnContainer}>
                            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                            <View style={styles.rowContainer2}>
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
               </ScrollView>

               </View>
               <View style={styles.bottomContainer}>
                 <BottomBar 
                
                onPressDetails={(key) =>this.navigateToScreen(key)} 
      
                  bottomList={this.state.bottomList}/>
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