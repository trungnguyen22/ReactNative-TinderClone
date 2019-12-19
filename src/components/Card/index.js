import React, {Component, PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

import {SCREEN_HEIGHT} from '../../theme';

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    height: scale((SCREEN_HEIGHT * 2) / 3),
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    backgroundColor: 'white',
  },
});

class Card extends PureComponent {
  render() {
    return (
      <View style={styles.card}>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

export default Card;
