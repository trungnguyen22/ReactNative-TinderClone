import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import {SCREEN_STACK_ROUTE_NAME, BOTTOM_TAB_ROUTE_NAME} from './RouteNames';
import HomeScreen from '../screens/Home';
import FavoritesScreen from '../screens/Favorite';
import {AppColorPallete} from '../theme';

const HomeStackNavigator = createStackNavigator(
  {
    [SCREEN_STACK_ROUTE_NAME.Home]: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: SCREEN_STACK_ROUTE_NAME.Home,
    headerMode: 'screen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerBackTitle: null,
      };
    },
  },
);

const FavoriteStackNavigator = createStackNavigator(
  {
    [SCREEN_STACK_ROUTE_NAME.Favorites]: {
      screen: FavoritesScreen,
      navigationOptions: {
        headerTitle: 'Favorites',
      },
    },
  },
  {
    initialRouteName: SCREEN_STACK_ROUTE_NAME.Favorites,
    headerMode: 'screen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => {
      return {
        headerBackTitle: null,
      };
    },
  },
);

const BottomTabNavigator = createBottomTabNavigator(
  {
    [BOTTOM_TAB_ROUTE_NAME.HomeTab]: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarButtonComponent: TouchableBounce,
      },
    },
    [BOTTOM_TAB_ROUTE_NAME.FavoritesTab]: {
      screen: FavoriteStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarButtonComponent: TouchableBounce,
      },
    },
  },
  {
    initialRouteName: BOTTOM_TAB_ROUTE_NAME.HomeTab,
    tabBarOptions: {
      activeTintColor: AppColorPallete.light.activeBottomTabBar,
      inactiveTintColor: AppColorPallete.light.inactiveBottomTabBar,
      showLabel: true,
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: AppColorPallete.light.bottomTabBar,
      },
    },
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        switch (routeName) {
          case BOTTOM_TAB_ROUTE_NAME.HomeTab:
            return <Icon color={tintColor} size={20} name="star" />;
          case BOTTOM_TAB_ROUTE_NAME.FavoritesTab:
            return <Icon color={tintColor} size={20} name="heart" />;
          default:
            return <Icon color={tintColor} size={20} name="home" />;
        }
      },
    }),
  },
);

const RootNavigator = createStackNavigator(
  {
    BottomTabNavigator: {screen: BottomTabNavigator},
  },
  {
    headerMode: 'none',
    mode: 'modal',
  },
);

const Navigation = createAppContainer(RootNavigator);

export default Navigation;
