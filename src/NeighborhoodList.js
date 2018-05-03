import React, {Component} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ImageBackground,
  SafeAreaView,
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
    return fetch('https://ancient-eyrie-84751.herokuapp.com/neighborhoods').then((response) => response.json()).then((responseJson) => {
      this.setState({
        dataSource: responseJson.neighborhoods,
        isLoading: false
      }, function() {})
    }).catch((error) => {
      console.error(error);
    })
  }

  render() {
    if (this.state.isLoading) {
      return (<SafeAreaView>
        <Text>Loading</Text>
      </SafeAreaView>);
    }
    return (<SafeAreaView style={styles.listContainer}>
      <FlatList data={this.state.dataSource} renderItem={({item}) => <View style={styles.card}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('MapSelect', {neighborhood: item.name})}>
            <View style={styles.imageTitle}>
              <ImageBackground style={styles.image} source={{
                  uri: item.image_url
                }}>
                <Text style={styles.title}>{item.name}</Text>
              </ImageBackground>
            </View>
            <Text style={styles.deck}>{item.deck}</Text>
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
    backgroundColor: '#FFFFFF'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F0F7F4'
  },
  title: {
    color: '#fff',
    fontSize: 14,
    padding: 12
  },
  deck: {
    color: '#001011',
    fontSize: 14,
    padding: 12,
    flex: 3
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.9)',
  },
  imageTitle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  }
});
