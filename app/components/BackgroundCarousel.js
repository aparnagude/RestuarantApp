import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image } from "react-native";
import window, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL,widths,heights, HEADER_SIZE } from '../design/dimen';
import color from "../design/colors";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const DEVICE_WIDTH = Dimensions.get("window").width;

class BackgroundCarousel extends React.Component {
  scrollRef = React.createRef();
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount = () => {
    setInterval(() => {
      this.setState(
        prev => ({
          selectedIndex:
            prev.selectedIndex === this.props.images.length - 1
              ? 0
              : prev.selectedIndex + 1
        }),
        () => {
          this.scrollRef.current.scrollTo({
            animated: true,
            x: DEVICE_WIDTH * this.state.selectedIndex,
            y: 0
          });
        }
      );
    }, 3000);
  };

  setSelectedIndex = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    const selectedIndex = Math.floor(contentOffset.x / viewSize.width);
    this.setState({ selectedIndex });
  };

  render() {
    const { images } = this.props;
    const { selectedIndex } = this.state;
    return (
      <View style={{ height: hp('30%'),width:wp('100%'),}}>
        
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={this.setSelectedIndex}
          ref={this.scrollRef}
          contentContainerStyle={{alignItems: 'center'}}
        >
          {images.map(image => (
           

         
            <Image
              style={styles.backgroundImage}
              source={image}
              key={image}
             resizeMode='cover'
            />
              
          ))}
        </ScrollView>
        <View style={styles.circleDiv}>
          {images.map((image, i) => (
            <View
              style={[
                styles.whiteCircle,
                { opacity: i === selectedIndex ? 0.5 : 1 }
              ]}
              key={image}
              active={i === selectedIndex}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
 height:hp('25%'),
 width: wp('100%'),
 borderRadius:5,
 
 
  
   
  
  },
  circleDiv: {
    position: "absolute",
    bottom: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 10,
   
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: color.primaryColor
  }
});

export default BackgroundCarousel ;