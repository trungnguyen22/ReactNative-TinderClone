import React from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  reloadImg: {
    width: 32,
    height: 32,
  },
});

const EmptyData = ({
  containerStyle,
  message,
  hideReloadButton,
  onReloadPress,
}) => (
  <View style={[styles.container, containerStyle]}>
    <Image
      style={styles.image}
      source={require('../../assets/images/ic_open_box_64.png')}
    />
    <Text style={styles.text}>{message}</Text>
    {!hideReloadButton ? (
      <TouchableOpacity onPress={onReloadPress}>
        <Image
          style={styles.reloadImg}
          source={require('../../assets/images/ic_reload_64.png')}
        />
      </TouchableOpacity>
    ) : null}
  </View>
);

export default EmptyData;
