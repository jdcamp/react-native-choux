import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigator} from 'react-navigation'
import NeighborhoodList from './src/NeighborhoodList.js';
import MapSelect from './src/MapSelect.js';

class NeighborhoodListScreen extends Component {
  render() {
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
  }
)
export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
