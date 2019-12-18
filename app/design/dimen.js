import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
const winby2 = window.width/2;

export const button = {
    btnWidth: winby2,
    btnPostWidth:  winby2/1.2,
    btnLeftPadding: winby2/6,

}

export const shareButton = {
    btnWidth: window.width/1.8,
    txtmargin: window.width/15,

}



export const widths = {
    by2: window.width/2,
    by2p2: window.width/2.2,
    by1p4: window.width/1.4,
    by2p6: window.width/2.6,
    by2p9: window.width/2.9,
    by3: window.width/3,
    by3p25: window.width/3.25,
    by3p5: window.width/3.5,
    by4: window.width/4,
    by4p3: window.width/4.3,
    by4p55: window.width/4.55,
    by5: window.width/5,
    by5p5: window.width/5.5,
    by6:window.width/6,
    by8: window.width/8,
    by7: window.width/7,
    by10: window.width/10,
    by12: window.width/12,
    by15: window.width/15,
    by20: window.width/20,
    by25: window.width/25,
    by30: window.width/30,
    by40: window.width/40,
    by45: window.width/45,
    by50: window.width/50,
    by60: window.width/60,
    nintyper: window.width * 0.90,
    eigtyFivePer: window.width * 0.85,
    eigtySevenFivePer: window.width * 0.875,
    eigtyper: window.width * 0.80,
    seventyper: window.width * 0.70,
    dp12: window.width * 0.030,
    dp14: window.width * 0.035,
    dp15:window.width * 0.037,
    dp16: window.width * 0.040,
    dp17: window.width * 0.048,
    dp18: window.width * 0.055,
    dp20: window.width * 0.060,
    dp10: window.width * 0.024,
    dp8: window.width * 0.020,
    dp5: window.width * 0.012,
    dp3: window.width * 0.007,
    dp2: window.width * 0.005
}

export const heights = {
    by5: window.height/5,
    by5half: window.height/5.5,
    by6: window.height/6,
    by4half: window.height/4.5,
    by4: window.height/4,
    by3: window.height/3,
    by2: window.height/2,
    by2half: window.height/2.5,
    by6: window.height/6,
    by1half: window.height/1.5,
    by7: window.height/7,
    by8: window.height/8,
    by10: window.height/10,
    by11: window.height/11,
    by12: window.height/12,
    by13: window.height/13,
    by15: window.height/15,
    by25: window.height/20,
    by25: window.height/25,
    by30: window.height/30,
    by35: window.height/35,
    by40: window.height/40,
    by50: window.height/50,
    by60: window.height/60,
    eightyper: window.height * 0.80,
    dp16: window.height * 0.040,
    dp17: window.height * 0.048,
    dp18: window.height * 0.055,
    dp14: window.height * 0.032,
    dp12: window.height * 0.028,
    dp10: window.height * 0.025,
    dp9: window.height * 0.022,
    dp8: window.height * 0.020,
    dp5: window.height * 0.012,
    dp2: window.height * 0.005
}


export const IMAGE_HEIGHT = window.width / 2.5;
export const IMAGE_HEIGHT_SMALL = window.width /6;
export const HEADER_SIZE = window.width*0.12;


export default window;