import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import {withNavigation} from 'react-navigation';

class NeighborhoodList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    // this._onPressItem = this._onPressItem.bind(this)
  }

  componentDidMount() {
    //Get NeighborhoodList from heroku api
    return fetch('https://ancient-eyrie-84751.herokuapp.com/neighborhoods').then((response) => response.json()).then((responseJson) => {
      this.setState({
        dataSource: responseJson.neighborhoods,
        isLoading: false
      }, function() {})
    }).catch((error) => {
      console.error(error);
    })
  }
//awits fetch function to return json and set the loading  frpm true to false
    render() {
    if (this.state.isLoading) {
      //loading screen
      return (<SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>);
    }
    //list view once fetch function completes
    // TODO: add slug to neighborhood api to use instead of name
    return (<SafeAreaView style={styles.listContainer}>
      <FlatList data={this.state.dataSource} renderItem={({item}) =>
        <View style={styles.card}>
        //onpress uses name to fetch from api
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MapSelect', {neighborhood: item.name})}>
            <View style={styles.imageTitle}>
              <ImageBackground style={styles.image} source={{
                  uri: item.image_url
                }}>
                <View style={styles.opacityFilter}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>}/>
    </SafeAreaView>)
  }
}
export default withNavigation(NeighborhoodList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#312F2F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F0F7F4'
  },
  title: {
    color: '#fff',
    flex: 2,
    fontSize: 22,
    padding: 12,
    fontFamily: 'KaushanScript-Regular',
  },
  deck: {
    color: '#001011',
    fontSize: 14,
    padding: 12,
    flex: 3
  },
  image: {
    flex: 2,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageTitle: {
    flex: 1,
    height: 125,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  opacityFilter: {
    flex: 1,
    alignItems: 'stretch',
    // backgroundColor: 'rgba(204, 204, 204, 0.9)'
  }
});
