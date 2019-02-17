/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList
} from 'react-native';

import movieService from './services/movie.service';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this._getMovies();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    The Incredible Movie List
                </Text>
                {this._renderMovies()}
            </View>
        );
    }

    _getMovies() {
        movieService.getMovies()
        .then(results => {
            this.setState({ data: results });
        })
        .catch(error => {
            console.log('Something went wrong!');
        })
    }

    _renderMovies() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={(item, index) => item.title}
                renderItem={this._renderItem}
                ListEmptyComponent={this._renderEmptyList}
            />
        );
    }

    _renderItem = ({ item }) => {
        return (
            <Text style={styles.item}>
                {item.getTitle()} {item.getYearReleased()}
            </Text>
        );
    }

    _renderEmptyList = () => {
        return (
            <Text>...Just a few more seconds</Text>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 40
    },
    item: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
