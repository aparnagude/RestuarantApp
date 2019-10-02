import React, {Component} from 'react';
import {Text,View, StatusBar,Image,ScrollView,StyleSheet,TouchableOpacity,FlatList} from 'react-native';
import color from '../../design/colors';
import string from '../../design/strings';
import baseStyle from '../../design/styles'

class Filter extends Component {
    constructor(props){
      super(props);
      this.state={
          mealTypes:[
              {"id":"1","name":"Biriyani"},
              {"id":"2","name":"Fried Rice"},
              {"id":"3","name":"Noodles"},
              {"id":"3","name":"Noodles"},
              {"id":"3","name":"Noodles"},
          ],
          prefTypes:[
            {"id":"1","name":"Chicken"},
            {"id":"2","name":"Mutton"},
            {"id":"3","name":"Prawn"},
            {"id":"3","name":"Fish"},
            
        ],
        selectedItems:[],
        selected:false,
      }
    }

selectItem(item){
    console.warn(item);


}

    render(){
        return(
            <View style={styles.MainContainer}>
               
                    
<Text style={[styles.text,{fontSize:16,marginHorizontal:20,marginTop:10,textTransform:'uppercase',lineHeight:18}]} >Meal Types</Text>
<View style={styles.tagView}>
    <FlatList 
       
        data={this.state.mealTypes} 
     numColumns={3}
        renderItem={({ item }) => (
           <TouchableOpacity style={styles.tag} onPress={()=>this.selectItem(item)}>
               <Text style={styles.text}>{item.name}</Text>
           </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
       
    />

</View>

                    
                    <Text style={[styles.text,{fontSize:16,marginHorizontal:20,marginTop:40,textTransform:'uppercase',lineHeight:18}]} >Preference type</Text>
                    <View style={styles.tagView}>
                        <FlatList 
                           
                            data={this.state.prefTypes} 
                         numColumns={3}
                            renderItem={({ item }) => (
                               <TouchableOpacity style={styles.tag}>
                                   <Text style={styles.text}>{item.name}</Text>
                               </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index}
                           
                        />
                    </View>
                   
                   <TouchableOpacity style={styles.bottomContainer}>
                   <Text style={baseStyle.buttonText}>DONE</Text>
                   </TouchableOpacity>
            </View>
        );
    }
}
 export default Filter;

 const styles=StyleSheet.create({
     buttonConatiner:{
         borderRadius:5,
         borderColor:color.primary,
         padding:10,
         
     },
     MainContainer:{
         flex:1,
         backgroundColor:color.white
     },
     tagView: {
      
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:'space-between',
       
        marginHorizontal:10
    },
    tag: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: color.primary,
        backgroundColor: color.white,
        padding: 10,
        marginTop: 10,
        marginHorizontal:5
    },
    text:{
        fontFamily:string.fontLatoMed,
        color:color.primary,
        fontSize:14,
      
    },
    bottomContainer:{
     position:'absolute',
     bottom:20,
     left:0,
     right:0,
     borderRadius:5,
     marginHorizontal:15,
     padding:10,
     backgroundColor:color.primaryColor
    }
 })