import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {scale} from 'react-native-size-matters';
import posed from 'react-native-pose';

import {AppColorPallete} from '../../theme';

/**
 * @example
 * {
 * 	iconName: 'home',
 * 	iconSource: require(''),
 *  isSelected: true
 * }
 */

const spotlightBase = scale(60);

const SpotLight = posed.View({
  route0: {
    x: 0,
    transition: {x: {type: 'spring'}},
  },
  route1: {
    x: spotlightBase,
    transition: {x: {type: 'spring'}},
  },
  route2: {
    x: spotlightBase * 2,
    transition: {x: {type: 'spring'}},
  },
  route3: {
    x: spotlightBase * 3,
    transition: {x: {type: 'spring'}},
  },
  route4: {
    x: spotlightBase * 4,
    transition: {x: {type: 'spring'}},
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale(60),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {},
  sportLight: {
    width: scale(60),
    height: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});

export class InfoPicker extends PureComponent {
  renderIcon = (item, index) => {
    const {onIconPress} = this.props;
    const tintColor = item.isSelected
      ? AppColorPallete.light.primary
      : '#c3c3c3c3';
    return (
      <TouchableOpacity
        onPress={() => {
          onIconPress(item, index);
        }}>
        <View style={styles.icon}>
          <Text>
            <Icon color={tintColor} size={scale(24)} name={item.iconName} />
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderIconImage = (item, index) => {
    const {onIconPress} = this.props;
    const tintColor = item.isSelected
      ? AppColorPallete.light.primary
      : '#c3c3c3c3';
    return (
      <TouchableOpacity
        onPress={() => {
          onIconPress(item, index);
        }}>
        <View style={styles.icon}>
          <Image
            style={{tintColor: tintColor}}
            source={item.iconSource}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  renderIcons = (icons, useIconName) => {
    return icons.map((item, index) => {
      return useIconName
        ? this.renderIcon(item, index)
        : this.renderIconImage(item, index);
    });
  };

  render() {
    const {icons, useIconName} = this.props;
    const activeRouteIndex = icons.indexOf(icons.find(icon => icon.isSelected));
    return (
      <View style={styles.container}>
        <View style={StyleSheet.absoluteFillObject}>
          <SpotLight
            style={[
              styles.sportLight,
              {backgroundColor: AppColorPallete.light.activeBottomTabBar},
            ]}
            pose={`route${activeRouteIndex}`}
          />
        </View>
        {this.renderIcons(icons, useIconName)}
      </View>
    );
  }
}

export default InfoPicker;
