import React, {Component} from "react";
import { StyleSheet, Text, View, Button, FlatList, Image, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';


class NeighborhoodList extends Component {
  constructor(props){
    super(props);
    this.state = {isLoading: true};
    // this._onPressItem = this._onPressItem.bind(this)
  }

  componentDidMount(){
    return fetch('https://ancient-eyrie-84751.herokuapp.com/neighborhoods')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson.neighborhoods,
        isLoading: false,
      },function() {
      })
    })
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
    return(
      <SafeAreaView style={styles.listContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) =>
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('MapSelect', {
                  neighborhood: item,
                })}
                >
                <Text style={styles.title}>{item}</Text>
              </TouchableOpacity>
            </View>

       }
          />
      </SafeAreaView>
    )
  }
}
export default withNavigation(NeighborhoodList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#312F2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#000F00',
    margin: 10,
    overflow: 'hidden',
    backgroundColor: '#50514F'
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#5E5B52'
  },
  title: {
    color: '#fff',
    fontSize: 14,
    padding: 12
  }
});
