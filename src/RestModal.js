import React, { Component } from 'react';
import { Text } from 'react-native';

export default class RestModal extends Component {
  render() {
    return (
      <Text>{this.props.place.name}</Text>
      <Text>{this.props.place.rating}</Text>
      <Text>{this.props.place.display_phone}</Text>
      <Text>{this.props.place.address}</Text>
    );
  }
}
