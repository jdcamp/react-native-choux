import React, { Component } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList} from 'react-native';

export default class RestModal extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoHeader}>
      <Text style={styles.title}>{this.props.place.name}</Text>
      <Text style={styles.infoText}>{this.props.place.address}</Text>
      <Text style={styles.infoText}> Yelp {this.props.place.rating}</Text>
      <Text style={styles.infoText}>Phone: {this.props.place.display_phone}</Text>
    </View>
    <View style={styles.body}>
      {this._renderReviewCategory(this.props.place.general_users.taste)}
    </View>
    </SafeAreaView>
    );
  }
  _renderReviewCategory = (item) => {
    let testsss = item.pos ? <FlatList data={item.pos} renderItem={({item}) => <Text>{item}</Text>}/> : null;
    return testsss
  }
}

const styles = StyleSheet.create({
  container: {
  },
  title: {
    color: 'white',
    backgroundColor: '#262626',
    justifyContent: 'center',
    fontSize: 26,
    padding: 15,
    fontFamily: 'KaushanScript-Regular',
  },
  infoHeader: {
    backgroundColor: '#262626',
    padding: 15
  },
  infoText: {
    color: 'white',
    backgroundColor: '#262626',

  },
  body: {
    backgroundColor: '#F9B352'
  }
});
