import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Card from '../Card';
import CircleImage from '../CircleImage';
import {scale} from 'react-native-size-matters';
import InfoPicker from './InfoPicker';

const iconType = {
  name: 'name',
  dob: 'dob',
  address: 'address',
  phone: 'phone',
  lock: 'lock',
};

const styles = StyleSheet.create({
  card: {
    paddingTop: scale(20),
    paddingBottom: scale(20),
  },
  circleImage: {
    padding: scale(4),
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e5dfdf',
    borderRadius: scale(100) + 8 / 2,
    marginBottom: scale(24),
  },
  userInfoTextContainer: {
    marginBottom: scale(16),
    alignItems: 'center',
  },
  backdrop: {
    width: '100%',
    height: scale(100),
    position: 'absolute',
    top: -scale(20),
    backgroundColor: '#f3f3f3',
    borderBottomWidth: 1,
    borderBottomColor: '#bbbbbb',
  },
});

export class UserCard extends PureComponent {
  constructor(props) {
    super(props);
    const {item} = props;
    this.state = {
      icons: [
        {
          iconType: iconType.name,
          iconName: 'user',
          isSelected: true,
        },
        {
          iconType: iconType.dob,
          iconName: 'calendar',
          isSelected: false,
        },
        {
          iconType: iconType.address,
          iconName: 'map',
          isSelected: false,
        },
        {
          iconType: iconType.phone,
          iconName: 'phone',
          isSelected: false,
        },
        {
          iconType: iconType.lock,
          iconName: 'lock',
          isSelected: false,
        },
      ],
      pickerLabel: 'Full Name',
      pickerValue: item.fullName,
    };
  }

  onCardPress = () => {
    const {item, index, onCardPress} = this.props;
    onCardPress(item, index);
  };

  onInfoPickerIconPress = (icon, index) => {
    const {item} = this.props;
    this.setState(prevState => {
      let pickerValue;
      let pickerLabel;
      switch (icon.iconType) {
        case iconType.name:
          pickerLabel = 'Full Name';
          pickerValue = item.fullName;
          break;
        case iconType.dob:
          pickerLabel = 'Date of birth';
          pickerValue = item.formattedDOB;
          break;
        case iconType.address:
          pickerLabel = 'My address is';
          pickerValue = item.address;
          break;
        case iconType.phone:
          pickerLabel = 'My phone number is';
          pickerValue = item.phone;
          break;
        case iconType.lock:
          pickerLabel = 'My ID is';
          pickerValue = item.SSN;
          break;
      }
      return {
        icons: [
          ...prevState.icons.map((item, itemIndex) => {
            const mappedItem = {...item};
            mappedItem.isSelected = index === itemIndex;
            return mappedItem;
          }),
        ],
        pickerValue: pickerValue,
        pickerLabel: pickerLabel,
      };
    });
  };

  renderUserInfoText = () => {
    const {pickerValue, pickerLabel} = this.state;
    return (
      <View style={styles.userInfoTextContainer}>
        <Text
          style={{
            fontSize: scale(16),
            color: '#cccccc',
            marginBottom: scale(8),
          }}>
          {pickerLabel}
        </Text>
        <Text style={{fontSize: scale(20)}}>{pickerValue}</Text>
      </View>
    );
  };

  renderCardContent = item => {
    const {icons} = this.state;
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.backdrop} />
        <CircleImage
          containerStyle={styles.circleImage}
          imageSize={scale(100)}
          imageSource={{uri: item.avatarURL}}
        />
        {this.renderUserInfoText()}
        <InfoPicker
          icons={icons}
          useIconName
          onIconPress={this.onInfoPickerIconPress}
        />
      </View>
    );
  };

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.onCardPress}>
        <Card
          containerStyle={styles.card}
          child={this.renderCardContent(item)}
        />
      </TouchableOpacity>
    );
  }
}

export default UserCard;
