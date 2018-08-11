import React, {Component} from "react";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Button
} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {withNavigation} from 'react-navigation';

const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = width - 75;

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
    this._showModal = this._showModal.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this.getResults = this.getResults.bind(this)
    this.getResults(this.props.neighborhood)
  }
  //set markers from api
  getResults(neighborhood) {
    return fetch(`http://www.chouxchoux.io/${neighborhood}`).then((response) => response.json()).then((responseJson) => {
      this.setState({
        markers: responseJson.payload,
      }, function() {
        //snap to first place after fetch request
        this.map.animateToRegion({
          ...responseJson.payload[0].coords,
          latitudeDelta: this.state.region.latitudeDelta * .05,
          longitudeDelta: this.state.region.longitudeDelta * .05
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
  }

  //carousel card render item
  _renderItem({item, index}) {
    return (
      <TouchableOpacity onPress={ () => this._showModal(item)} key={item.name}>
        <Image
        source={{uri: item.image_url}}
        style={styles.cardImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.title}>{item.rating}/5</Text>
        </View>
    </TouchableOpacity>);
  }
  //Center map to pin when onSnap
  _centerMapOnMarker (markerIndex) {
    const markerData = this.state.markers[markerIndex];
    this.map.animateToRegion({
        latitude: markerData.coords.latitude,
        longitude: markerData.coords.longitude,
    });
}
//fired when card _renderItem is pressed
  _showModal(item) {
    console.log("modal fired");
    console.log("modal item Object");
    console.log(item);
    console.log("modal item Object");
    this.props.navigation.navigate('Modal', {restaurantItem: item})
  }

  render() {
    console.log('render cards Carousel');
    console.log('render cards Carousel');
    if (this.state.isLoading) {

    } else {
      return (
      <View style={styles.container}>
        <MapView ref={map => this.map = map} initialRegion={this.state.region} style={styles.container} mapType="mutedStandard">
          {this.state.markers.map(marker => (
          <Marker
            coordinate={marker.coords}
            key= {marker.id}
            title={marker.name}
            />))}
        </MapView>
        <Button
          stlye={styles.refreshButton}
          onPress={()=> this.getResults(this.props.neighborhood)}
          title="Learn More"
          color="#841584"/>
        <View style={styles.carousel}>
        <Carousel
          data={this.state.markers}
          renderItem={this._renderItem}
          sliderWidth={CARD_WIDTH+15}
          itemWidth={CARD_WIDTH-5}
          onSnapToItem={(index, marker) => this._centerMapOnMarker(index)}
          />
      </View>
      </View>);
    }
}
}

export default withNavigation(screens);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  carousel: {
    position: "absolute",
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: 30
  },
  card: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'visible'
  },
  cardImage: {
    width: CARD_WIDTH* .85,
    height: CARD_HEIGHT* .85,
    flex: 1,
    alignSelf: "center",
    right: CARD_HEIGHT* .1,
    borderRadius: 10,
  },
  textContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#312F2F',
  },
  title: {
    padding: 5,
    fontSize: 14,
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
  refreshButton: {
    width: 8,
    height: 8,
    borderRadius: 4,
    color: "rgba(130,4,150, 0.9)"
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    width: CARD_WIDTH* .80,
    elevation: 3,
    position: 'relative',
    right: -CARD_HEIGHT* .33,
    top: -10,
    backgroundColor: '#312F2F',
    overflow: 'visible',
    borderRadius: 10,
  }
});
