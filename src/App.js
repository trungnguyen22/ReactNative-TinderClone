/**
 * @author: Nguyen Quoc Trung
 */

import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import MainScreen from './screens/Root/MainScreen';
import {commonStyles} from './theme';

class App extends Component {
  render() {
    return (
      <View style={commonStyles.container}>
        <MainScreen />
      </View>
    );
  }
}

export default App;
