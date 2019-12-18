import React, {Component} from 'react';
import {View} from 'react-native';
import {commonStyles} from '../../theme';
import Navigation from '../../navigation';

class MainScreen extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <Navigation />
      </View>
    );
  }
}

export default MainScreen;
