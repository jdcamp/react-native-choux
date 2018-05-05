import React, {Component} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal
} from "react-native";
import MapView from "react-native-maps";
import {withNavigation} from 'react-navigation';

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 50;

class screens extends Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [{coords: {latitude: 0, longitude: 0}}],
      region: {
        latitude: 37.770212,
        longitude: -122.445390,
        latitudeDelta: 0.04864195044303443 * 3.2,
        longitudeDelta: 0.040142817690068 * 3.2,
        modalVisable: false,
        isLoading: true,
      }
    }
    this.getResults(this.props.neighborhood)
    console.log(this.props.neighborhood);
  }
  //set markers from api
  getResults(neighborhood) {
    return fetch(`https://ancient-eyrie-84751.herokuapp.com/${neighborhood}`).then((response) => response.json()).then((responseJson) => {
      this.setState({
        markers: responseJson.payload,
      }, function() {
        //snap to first place after fetch request
        this.map.animateToRegion({
          ...responseJson.payload[0].coords,
          latitudeDelta: this.state.region.latitudeDelta * .15,
          longitudeDelta: this.state.region.longitudeDelta * .15
        }, 3500)

      })
    }).catch((error) => {
      console.error(error);
    })
  }
  componentWillMount() {
    // this.getResults('mockResults')
    this.index = 0;
    this.setState({latitude: this.state.markers[0].coords.latitude, longitude: this.state.markers[0].coords.longitude})
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({value}) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
      //debounce snap animation
      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const {coords} = this.state.markers[index];
          this.map.animateToRegion({
            ...coords,
            latitudeDelta: this.state.region.latitudeDelta * .15,
            longitudeDelta: this.state.region.longitudeDelta * .15
          }, 350);
        }
      }, 10);
    });
  }
  _renderItem({item, index}) {
    return (<View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
    </View>);
  }
  _showModal = () => {
    console.log("modal fired");
    console.log(marker);
    this.props.navigation.navigate('Modal', {restaurant: marker})
  }

  render() {
    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH)
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [
          1, 2.5, 1
        ],
        extrapolate: "clamp"
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [
          0.35, 1, 0.35
        ],
        extrapolate: "clamp"
      });
      return {scale, opacity};
    });
    if (this.state.isLoading) {

    } else {
      return (<View style={styles.container}>
        <MapView ref={map => this.map = map} initialRegion={this.state.region} style={styles.container}>
          {
            this.state.markers.map((marker, index) => {
              const scaleStyle = {
                transform: [
                  {
                    scale: interpolations[index].scale
                  }
                ]
              };
              const opacityStyle = {
                opacity: interpolations[index].opacity
              };
              return (<MapView.Marker key={index} coordinate={marker.coords}>
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]}/>
                  <View style={styles.marker}/>
                </Animated.View>
              </MapView.Marker>);
            })
          }
        </MapView>
        <Animated.ScrollView horizontal="horizontal" scrollEventThrottle={1} showsHorizontalScrollIndicator={false} snapToInterval={CARD_WIDTH + 15} onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: this.animation
                }
              }
            }
          ], {useNativeDriver: true})} style={styles.scrollView} contentContainerStyle={styles.endPadding}>
          {
            this.state.markers.map((marker, index) => (
            <TouchableOpacity activeOpacity={.82} onPress={this._showModal}>
            <View style={styles.card} key={index}>
              <Image source={{
                  uri: marker.image_url
                }} style={styles.cardImage} resizeMode="cover"/>
                <View style={styles.textContent}>
                  <Text style={styles.cardtitle}>{marker.name}</Text>
                  <Text style={styles.cardtitle}>{marker.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>))
          }
        </Animated.ScrollView>
      </View>);

    }
  }
}

export default withNavigation(screens);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    borderRadius: 4,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 25,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      x: 2,
      y: -2
    },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#312F2F'
  },
  cardtitle: {
    padding: 10,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
    color: 'white'
  },
  cardDescription: {
    fontSize: 12,
    color: "white"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center"
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)"
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)"
  }
});
