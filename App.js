import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {createStackNavigator} from 'react-navigation'
import NeighborhoodList from './src/NeighborhoodList.js';
import MapSelect from './src/MapSelect.js';
import RestModal from './src/RestModal.js';

class NeighborhoodListScreen extends Component {
  static navigationOptions = {
  title: 'ChouxChoux',
  headerStyle: {
      backgroundColor: '#F9B352',
      height:20
    },
};
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <NeighborhoodList />
      </View>
    )
  }

}
class MapSelectScreen extends Component {
  render() {
    console.log('nav');
    console.log(this.props.navigation);
    console.log('nav');
    const { params } = this.props.navigation.state;
    console.log(params);
    const otherParam = params ? params.neighborhood : null;

    return (
      <View style={styles.container}>
        <MapSelect neighborhood={otherParam} navItem={this.props.navigation}/>
      </View>)
  }
}
class ModalScreen extends Component {
  render() {
    const { params } = this.props.navigation.state;
    const restaurantItem = params ? params.restaurantItem : null;
    console.log(params);
    return (
      <SafeAreaView>
        <RestModal place={restaurantItem} />
      </SafeAreaView>
      )
  }
}

const RootStack = createStackNavigator(
  {
    NeighborhoodList: {
      screen: NeighborhoodListScreen,
    },
    MapSelect: {
      screen: MapSelectScreen,
    },
  },
  {
    initialRouteName: 'NeighborhoodList'
  },
)
// Modal-Style Navigator
const ModalStack = createStackNavigator({
  Home: { screen: RootStack },
  Modal: { screen: ModalScreen },
}, {
  mode: 'modal',
  headerMode: 'none',
});
export default class App extends Component {
  render() {
    return <ModalStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
