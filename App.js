import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import NeighborhoodList from './src/NeighborhoodList.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
},
});

export default class App extends Component {
  render() {
    return (
      <View style ={styles.container}>
        <NeighborhoodList />
      </View>
    );
  }
}
