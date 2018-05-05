import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation'
import NeighborhoodList from './src/NeighborhoodList.js';
import MapSelect from './src/MapSelect.js';

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
    const { params } = this.props.navigation.state;
    const otherParam = params ? params.neighborhood : null;

    return (
      <View style={styles.container}>
        <MapSelect neighborhood={otherParam}/>
      </View>)
  }
}
class ModalScreen extends Component {
  render() {
    const { params } = this.props.navigation.state;
    const otherParam = params ? params.restaurant : null;
    console.log(otherParam);
    return (
      <View style={styles.container}>
        <Text>{otherParam.name}</Text>
      </View>)
  }
}

const RootStack = StackNavigator(
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
const ModalStack = StackNavigator({
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
