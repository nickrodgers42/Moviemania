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
import CategoryPage from './CategoryPage';
import MovieSearchResults from './MovieSearchResults';
import MovieDetailPage from './MovieDetail';
import SearchPage from './SearchPage';
import PersonDetailPage from './PersonDetail';
import PersonSearchResults from './PersonSearchResults';

import {
    Body,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
    List,
    ListItem
} from 'native-base';

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

const BrowseTab = createStackNavigator({
    BrowsePage: BrowsePage,
    CategoryPage: CategoryPage,
    MovieDetailPage: MovieDetailPage,
    PersonDetailPage: PersonDetailPage
})

const SearchTab = createStackNavigator({
    SearchPage: SearchPage,
    MovieSearchResults: MovieSearchResults,
    PersonSearchResults: PersonSearchResults,
    MovieDetailPage: MovieDetailPage,
    PersonDetailPage: PersonDetailPage
})

const Root = createBottomTabNavigator(
    {
        Browse: BrowseTab,
        Search: SearchTab,
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
