import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import {
  Colors
} from '../../utils';

class loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
      }}>
        <ActivityIndicator color={Colors.primaryColor} size="large" animating />
      </View>
    );
  }
}

export default loading;
