'use strict';

import React, { Component, useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroDirectionalLight,
  ViroBox,
  ViroConstants,
  ViroARTrackingTargets,
  ViroMaterials,
  ViroText,
  ViroImage,
  ViroFlexView,
  ViroARImageMarker,
  ViroARObjectMarker,
  ViroAmbientLight,
  ViroARPlane,
  ViroAnimatedImage,
  ViroAnimations,
  ViroNode,
  Viro3DObject,
  ViroQuad
} from 'react-viro';

let targets = {

}
export class HelloWorldSceneAR extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
    products: []
  }

  getNoTrackingUI() {
    const { isTracking, initialized } = this.state;
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : "No Tracking"
      } />
    )
  }
  createImageTarget() {

  }


  getARScene() {

    return (
      <ViroNode>
        <ViroARImageMarker target={"businessCard"}
          onAnchorFound={
            (anchor) => {
              console.log(anchor);
              this.setState({
                runAnimation: true
              })
            }}
        >
          <ViroNode key="card">
            <ViroNode
              opacity={0} position={[0, 0, 0]}
              animation={{
                name: 'animateImage',
                run: this.state.runAnimation
              }}
            >
               <ViroFlexView style={styles.titleContainer}  rotation={[-90, 0, 0]} height={0.15} width={0.2}>
               <ViroText text="maggie"
               
                scale={[.05, .05, .05]}
                style={styles.prodTitleText}
              />
          </ViroFlexView>
            </ViroNode>
            <ViroNode opacity={0} position={[0, 0, 0]}
              animation={{
                name: 'animateViro',
                run: this.state.runAnimation
              }}
            >
              
              <ViroText text="https://www.maggi.in/our-range/"
                rotation={[-90, 0, 0]}
                scale={[.01, .01, .01]}
                style={styles.textStyle}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
        <ViroARImageMarker target={"maggie"}
          onAnchorFound={
            (anchor) => {
              console.log(anchor);
              this.setState({
                runAnimation: true
              })
            }}
        >
          <ViroNode key="card">
            <ViroNode
              opacity={0} position={[0, -0.02, 0]}
              animation={{
                name: 'animateImage',
                run: this.state.runAnimation
              }}
            >
              <ViroFlexView
                rotation={[-90, 0, 0]}
                height={0.03}
                width={0.05}
                style={styles.card}
              >
                <ViroFlexView
                  style={styles.cardWrapper}
                >

                  <ViroText
                    textClipMode="None"
                    text="Maggie 1"
                    scale={[.015, .015, .015]}
                    style={styles.textStyle}
                  />
                </ViroFlexView>
                <ViroFlexView
                  onTouch={() => alert("twitter")}
                  style={styles.subText}
                >
                  <ViroText
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text="Noodles"
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
                  />

                </ViroFlexView>
              </ViroFlexView>
            </ViroNode>
            <ViroNode opacity={0} position={[0, 0, 0]}
              animation={{
                name: 'animateViro',
                run: this.state.runAnimation
              }}
            >
              <ViroText text="https://www.maggi.in/our-range/"
                rotation={[-90, 0, 0]}
                scale={[.01, .01, .01]}
                style={styles.textStyle}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }
  componentDidMount() {
    fetch('http://127.0.0.1:8000/getProducts').then((data) => {
      // This in the other hand will cause additional rerender,
      // since fetch is async and state is set after request completes.
      console.log(data);
      this.setState({ products: data });
    })
    let array = [{
      name: "businessCard",
      source: { uri: 'http://ec2-52-56-96-88.eu-west-2.compute.amazonaws.com/api/download/3' },
      orientation: "Up",
      physicalWidth: 0.10 // real world width in meters
    },
    {
      name: "maggie",
      source: { uri: 'https://i0.wp.com/indiacanteen.tastyfix.com/wp-content/uploads/2018/11/1-2.png?zoom=1.25&fit=600%2C400&ssl=1' },
      orientation: "Up",
      physicalWidth: 0.10 // real world width in meters
    }];
    let targets1 = {};
    for (var i = 0; i < 2; i++) {

      targets1[array[i].name] = {
        source: array[i].source,
        orientation: array[i].orientation,
        physicalWidth: array[i].physicalWidth,
      }
    }
    console.log(targets1);

    ViroARTrackingTargets.createTargets(targets1);
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
  textStyle: {
    flex: .5,
    fontFamily: 'Roboto',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'top',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'column'
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0.001,
    flex: .5
  },
  subText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: .5
  },
  prodTitleText: {
    fontFamily: 'sans-serif-light',
    fontSize: 30,
    color: '#222222',
    textAlignVertical: 'top',
    textAlign: 'left',
  },
  priceText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#aa3c3c',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 4,
  },
  prodDescriptionText: {
    fontFamily: 'sans-serif-light',
    fontSize: 20,
    color: '#222222',
    textAlignVertical: 'center',
    textAlign: 'left',
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    backgroundColor: "#ffffffdd",
    padding: .2,
  },
});

// ViroARTrackingTargets.createTargets(targets);

ViroMaterials.createMaterials({
  imagePlaceholder: {
    diffuseColor: "rgba(255,255,255,1)"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.5)"
  }
});

ViroAnimations.registerAnimations({
  animateImage: {
    properties: {
      positionX: 0.05,
      opacity: 1.0
    },
    easing: "Bounce",
    duration: 500
  },
  animateViro: {
    properties: {
      positionZ: 0.02,
      opacity: 1.0,
    },
    easing: "Bounce",
    duration: 500
  }
});

module.exports = HelloWorldSceneAR;
// 'use strict';

// import React, { Component } from 'react';

// import {StyleSheet} from 'react-native';

// import {
//   ViroARScene,
//   ViroText,
//   ViroConstants,
//   ViroBox,
//   // ViroMaterials,
// } from 'react-viro';

// export default class HelloWorldSceneAR extends Component {

//   constructor() {
//     super();

//     // Set initial state here
//     this.state = {
//       text : "Initializing AR..."
//     };

//     // bind 'this' to functions
//     this._onInitialized = this._onInitialized.bind(this);
//   }

//   render() {
//     return (
//       <ViroARScene onTrackingUpdated={this._onInitialized} >
//         <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
//         {/* <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
//       </ViroARScene>
//     );
//   }

//   _onInitialized(state, reason) {
//     if (state == ViroConstants.TRACKING_NORMAL) {
//       this.setState({
//         text : "Hello World!"
//       });
//     } else if (state == ViroConstants.TRACKING_NONE) {
//       // Handle loss of tracking
//     }
//   }
// }

// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });

// // ViroMaterials.createMaterials({
// //   grid: {
// //     // diffuseTexture: require('./res/grid_bg.jpg'),
// //   },
// // });

// module.exports = HelloWorldSceneAR;