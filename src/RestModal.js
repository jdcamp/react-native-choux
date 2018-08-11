import React, { Component } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList, Dimensions, ScrollView} from 'react-native';
const {width, height} = Dimensions.get("window");

const MODAL_WIDTH = width;

export default class RestModal extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.infoHeader}>
      <Text style={styles.title}>{this.props.place.name}</Text>
      <Text style={styles.infoText}>{this.props.place.address}</Text>
      <Text style={styles.infoText}>Yelp {this.props.place.rating}</Text>
      <Text style={styles.infoText}>Phone: {this.props.place.display_phone}</Text>
    </View>
    <View style={styles.body}>
      <View>
        {this._renderKeywords(this.props.place.general_users)}
      </View>
    <View>
      {this._renderReviewCategory('Taste',this.props.place.general_users.taste)}
      {this._renderReviewCategory('Price',this.props.place.general_users.price)}
      {this._renderReviewCategory('Service',this.props.place.general_users.service)}
      {this._renderReviewCategory('Ambiance',this.props.place.general_users.ambiance)}
      {this._renderReviewCategory('Wait',this.props.place.general_users.wait)}
    </View>
    </View>
  </ScrollView>
    </SafeAreaView>
    );
  }
  _renderReviewCategory = (title, item) => {
    let posReviews = item.pos ? <FlatList data={item.pos} bounces={false} renderItem={({item, index}) => <Text key={index}>{item}</Text>}/> : null;
    let negReviews = item.neg ? <FlatList data={item.neg} bounces={false} renderItem={({item, index}) => <Text key={index}>{item}</Text>}/> : null;
    title = (item.pos || item.neg) ? <Text style={styles.reviewTitle}>{title}</Text> : null
    return (
      <View>
        {title}
      <View>
        {posReviews}
        <View>
        </View>
        {negReviews}
      </View>
      </View>
    )
  }
  _renderKeywords = (item) => {
    let topMentions = item.top_mention ? <FlatList data={item.top_mention} bounces={false} renderItem={({item, index}) => <Text key={index}>#{item}</Text>}/> : null;
    let unique = item.unique ? <FlatList data={item.unique} bounces={false} renderItem={({item, index}) => <Text key={index}>#{item}</Text>}/> : null;
    let mentionTitle = item.top_mention ? <Text style={styles.keywordsTitle}>Top Mentions</Text> : null
    let uniqueTitle = item.unique ? <Text style={styles.keywordsTitle}>Unique Mentions</Text> : null
    return (
      <View style={styles.keywords}>
        <View>
          {mentionTitle}
          {topMentions}
        </View>
        <View>
        {uniqueTitle}
        {unique}
        </View>
      </View>
    )
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
    fontFamily: 'VarelaRound-Regular',

  },
  body: {
    fontFamily: 'VarelaRound-Regular',
    backgroundColor: '#F9B352',
    width: MODAL_WIDTH,
  },
  reviewTitle: {
    fontSize: 20
  },
  keywords: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  keywordsTitle: {
    fontSize: 16,
  }
});
