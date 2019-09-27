import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, TextInput, Text, ScrollView, TouchableOpacity, Animated, DatePicker  } from 'react-native';
import color from '../design/colors';
import baseStyle from '../design/styles';
import string from '../design/strings'

class FloatingLabelInput extends Component {
    state = {
      isFocused: false,
    };

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });
  
    componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1)
      
     
    }

    onChangeText = () => {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1)
    }
  
    handleFocus = () => {
      this.setState({ isFocused: true });
     
    }
    
  
    componentDidUpdate() {
      Animated.timing(this._animatedIsFocused, {
        toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
        
        duration: 200,
      }).start();
    }
  
    render() {
      const { label, ...props } = this.props;
      const labelStyle = {
        position: 'absolute',
        left: 0,
        top: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 10],
        }),
        fontSize: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [15, 15],
        }),
        color: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [color.linecolor, color.linecolor],
        }),
        paddingLeft: 25,
        fontFamily: string.fontLatoMed, 
       
      };
      return (
        <View style={{ paddingTop: 25,   width:'100%', marginVertical:5}}>
          <Animated.Text style={labelStyle}>
            {label}
          </Animated.Text>
          <TextInput
          {...props}
            keyboardType={this.props.keyboardType}
            maxLength={this.props.maxLength}
            style={{  paddingVertical: 5,  fontSize: 16, color: color.black, fontFamily: string.fontLatoMed,  fontWeight: 'bold',paddingLeft: 25, justifyContent:'center' }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            editable={this.props.editable}
            blurOnSubmit
          />
          <View  style={{backgroundColor:color.linecolor,height:1,marginHorizontal:20}}/>
        </View>
      );
    }
  }


  export default FloatingLabelInput;