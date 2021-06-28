// 'use strict';

// import React, { Component } from 'react';

// import {StyleSheet} from 'react-native';

// import {
//   ViroARScene,
//   ViroDirectionalLight,
//   ViroBox,
//   ViroConstants,
//   ViroARTrackingTargets,
//   ViroMaterials,
//   ViroText,
//   ViroImage,
//   ViroFlexView,
//   ViroARImageMarker,
//   ViroARObjectMarker,
//   ViroAmbientLight,
//   ViroARPlane,
//   ViroAnimatedImage,
//   ViroAnimations,
//   ViroNode,
//   Viro3DObject,
//   ViroQuad
// } from 'react-viro';

// export class HelloWorldSceneAR extends Component {

//   state = {
//     isTracking: false,
//     initialized: false,
//     runAnimation: false
//   }

//   getNoTrackingUI(){
//     const { isTracking, initialized } = this.state;
//     return (
//       <ViroText text={
//         initialized ? 'Initializing AR...'
//           : "No Tracking"
//       }/>
//     )
//   }



//   getARScene() {
//     return (
//       <ViroNode>
//         <ViroARImageMarker target={"businessCard"}
//           onAnchorFound={
//             () => this.setState({
//                 runAnimation: true
//             })}
//         >
//           <ViroNode key="card">
//             <ViroNode
//               opacity={0} position={[0, -0.02, 0]}
//               animation={{
//                 name:'animateImage',
//                 run: this.state.runAnimation
//                 }}
//             >
//               <ViroFlexView
//                   rotation={[-90, 0, 0]}
//                   height={0.03}
//                   width={0.05}
//                   style={styles.card}
//               >
//                 <ViroFlexView
//                   style={styles.cardWrapper}
//                 >
                  
//                   <ViroText
//                     textClipMode="None"
//                     text="Maggie"
//                     scale={[.015, .015, .015]}
//                     style={styles.textStyle}
//                   />
//                 </ViroFlexView>
//                 <ViroFlexView
//                   onTouch={() => alert("twitter")}
//                   style={styles.subText}
//                 >
//                   <ViroText
//                     width={0.01}
//                     height={0.01}
//                     textAlign="left"
//                     textClipMode="None"
//                     text="Noodles"
//                     scale={[.01, .01, .01]}
//                     style={styles.textStyle}
//                   />
                  
//                 </ViroFlexView>
//               </ViroFlexView>
//             </ViroNode>
//             <ViroNode opacity={0} position={[0, 0, 0]}
//               animation={{
//                 name:'animateViro',
//                 run: this.state.runAnimation
//               }}
//             >
//               <ViroText text="https://www.maggi.in/our-range/"
//                 rotation={[-90, 0, 0]}
//                 scale={[.01, .01, .01]}
//                 style={styles.textStyle}
//               />
//             </ViroNode>
//           </ViroNode>
//         </ViroARImageMarker>
//       </ViroNode>
//     )
//   }

//   render() {
//     return (
//       <ViroARScene onTrackingUpdated={this._onInitialized} >
//         { this.state.isTracking ? this.getNoTrackingUI() : this.getARScene() }
//       </ViroARScene>
//     );
//   }

//   _onInitialized = (state, reason) => {
//     if (state == ViroConstants.TRACKING_NORMAL) {
//       isTracking: true
//     } else if (state == ViroConstants.TRACKING_NONE) {
//       isTracking: false
//     }
//   }
// }

// var styles = StyleSheet.create({
//   textStyle: {
//     flex: .5,
//     fontFamily: 'Roboto',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'top',
//     textAlign: 'left',
//     fontWeight: 'bold',
//   },
//   card: {
//     flexDirection: 'column'
//   },
//   cardWrapper: {
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//     padding: 0.001,
//     flex: .5
//   },
//   subText: {
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-start',
//     flex: .5
//   }
// });

// ViroARTrackingTargets.createTargets({
//   "businessCard" : {
//     source : require('./res/maggie1.jpg'),
//     orientation : "Up",
//     physicalWidth : 0.10 // real world width in meters
//   }
// });

// ViroMaterials.createMaterials({
//   imagePlaceholder: {
//     diffuseColor: "rgba(255,255,255,1)"
//   },
//   quad: {
//     diffuseColor: "rgba(0,0,0,0.5)"
//   }
// });

// ViroAnimations.registerAnimations({
//   animateImage:{
//     properties:{
//       positionX: 0.05,
//       opacity: 1.0
//     },
//       easing:"Bounce",
//       duration: 500
//   },
//   animateViro: {
//     properties: {
//       positionZ: 0.02,
//       opacity: 1.0,
//     },
//     easing:"Bounce",
//     duration: 500
//   }
// });

// module.exports = HelloWorldSceneAR;
'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  // ViroMaterials,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        {/* <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

// ViroMaterials.createMaterials({
//   grid: {
//     // diffuseTexture: require('./res/grid_bg.jpg'),
//   },
// });

module.exports = HelloWorldSceneAR;