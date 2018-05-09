import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Users = [
  { id: "1", uri: require("../assets/deck_one.jpeg") },
  { id: "2", uri: require("../assets/deck_two.jpeg") },
  { id: "3", uri: require("../assets/deck_three.jpeg") },
  { id: "4", uri: require("../assets/deck_four.jpeg") },
  { id: "5", uri: require("../assets/deck_five.jpeg") }
];

class MainApp extends Component {
  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0
    };

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "-10deg"],
      extrapolate: "clamp"
    });

    this.rotateAndTranslate = {
      transform: [
        {
          rotate: this.rotate
        },
        ...this.position.getTranslateTransform()
      ]
    };
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({
          x: gestureState.dx,
          y: gestureState.dy
        });
      },
      onPanResponderRelease: (evt, gestureState) => {}
    });
  }

  renderUsers = () => {
    return Users.map((item, i) => {
      if (i < this.state.currentIndex) {
        return null;
      } else if (i === this.state.currentIndex) {
        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id}
            style={[
              this.rotateAndTranslate,
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10,
                position: "absolute"
              }
            ]}
          >
            <Animated.View
              style={{
                position: "absolute",
                top: 50,
                left: 40,
                zIndex: 1000
              }}
            >
              <Text
                style={{
                  transform: [{ rotate: "-30deg" }],
                  borderWidth: 1,
                  color: "#e74c3c",
                  borderColor: "#e74c3c",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                PASS
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                position: "absolute",
                top: 50,
                right: 40,
                zIndex: 1000
              }}
            >
              <Text
                style={{
                  transform: [{ rotate: "30deg" }],
                  borderWidth: 1,
                  color: "#3498db",
                  borderColor: "#3498db",
                  fontSize: 32,
                  fontWeight: "800",
                  padding: 10
                }}
              >
                LIKE
              </Text>
            </Animated.View>

            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={item.uri}
            />
          </Animated.View>
        );
      } else {
        <Animated.View
          key={item.id}
          style={[
            {
              height: SCREEN_HEIGHT - 120,
              width: SCREEN_WIDTH,
              padding: 10,
              position: "absolute"
            }
          ]}
        >
          <Image
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: "cover",
              borderRadius: 20
            }}
            source={item.uri}
          />
        </Animated.View>;
      }
    }).reverse();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }} />
        <View style={{ flex: 1 }}>{this.renderUsers()}</View>
        <View style={{ height: 60 }} />
      </View>
    );
  }
}

export default MainApp;
