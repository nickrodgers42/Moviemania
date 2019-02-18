/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, { Component } from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BrowsePage from './BrowsePage';
import ScreenTwo from './ScreenTwo';
import CategoryPage from './CategoryPage';

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const Root = createBottomTabNavigator(
    {
        Browse: BrowsePage,
        Search: ScreenTwo
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let IconComponent = MaterialIcons;
              let iconName;
              if (routeName === 'Browse') {
                iconName = 'theaters';
              } else if (routeName === 'Search') {
                iconName = 'search';
              } 
      
              // You can return any component that you like here!
              return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
          }),
          tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          },
        }
);

const AppContainer = createAppContainer(Root);
