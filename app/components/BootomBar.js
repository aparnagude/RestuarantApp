import React,{Component} from 'react';
import {Text,TouchableOpacity,Image,View,StyleSheet} from 'react-native';
import color from '../design/colors';
import string from '../design/strings';


export default class BottomBar extends Component {
    state = {
		value: null,
	};

render(){
    const { bottomList } = this.props;
		const { value } = this.state;

    return(

        <View style={{flexDirection:'row',}}>

				{bottomList.map(item => {
					return ( 
						<TouchableOpacity style={styles.buttonConatiner} key={item.id} value={item.id} 
                        onPress={() => {
                            this.props.onPressDetails(item.id)
                            this.setState({
                                value: item.id,
                            });
                        }}>
							<Image source={item.image} style={value!=item.id?styles.image:[styles.image]}/>
       <Text style={value!=item.id?styles.text:[styles.text]}>{item.name}</Text>
							
                               
						
						</TouchableOpacity>
					 ); 
				 })} 
			</View>





    //     <View style={{flexDirection:'row',}}>
    //   <TouchableOpacity style={styles.buttonConatiner} onPress={this.props.onPress}
    //   value='veg'>
    //    <Image source={require('../assets/veg.png')} style={styles.image}/>
    //    <Text style={styles.text}>Veg</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.buttonConatiner} onPress={this.props.onPress}
    //   value='nonVeg'>
    //    <Image source={require('../assets/non_Veg.png')} style={styles.image}/>
    //    <Text style={styles.text}>Non Veg</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.buttonConatiner} onPress={this.props.onPress}
    //   value='starter'>
    //    <Image source={require('../assets/veg.png')} style={styles.image}/>
    //    <Text style={styles.text}>Starters</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity style={styles.buttonConatiner} onPress={this.props.onPress}
    //   value='dessert'>
    //    <Image source={require('../assets/dessert.png')} style={styles.image}/>
    //    <Text style={styles.text}>Desserts</Text>
    //   </TouchableOpacity>
    //   </View>
    );
}

}
 const styles=StyleSheet.create({
     buttonConatiner:{
         flexGrow:2,
         alignSelf:'center',
         marginHorizontal:5,
         marginVertical:10
     },
     image:{
         width:30,
         height:30,
         alignSelf:'center'
     },
     text:{
         fontFamily:string.fontLatoSemi,
         fontSize:14,
         alignSelf:'center',
         marginTop:10
     }
 })