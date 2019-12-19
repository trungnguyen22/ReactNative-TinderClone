import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../Card';
import CircleImage from '../CircleImage';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  card: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export class UserCard extends PureComponent {
  onCardPress = () => {
    const {item, index, onCardPress} = this.props;
    onCardPress(item, index);
  };

  renderCardContent = item => {
    return (
      <View style={{alignItems: 'center'}}>
        <CircleImage
          containerStyle={{
            padding: 8,
            backgroundColor: 'white',
            borderWidth: 2,
            borderColor: '#e5dfdf',
            borderRadius: scale(100) + 8 / 2,
          }}
          imageSize={scale(100)}
          imageSource={{uri: item.avatarURL}}
        />
        <Text>{'Hello'}</Text>
      </View>
    );
  };

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={this.onCardPress}>
        <Card
          containerStyle={styles.card}
          child={this.renderCardContent(item)}
        />
      </TouchableOpacity>
    );
  }
}

export default UserCard;
