/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    Platform,
    TouchableOpacity,
    ScrollView,
    FlatList,
    RefreshControl,
    StyleSheet,
    View
} from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Button,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import movieService from './services/movie.service';
import MovieSummary from './MovieSummary';


export default class CategoryPage extends Component {
    static navigationOptions = ({navigation}) => { 
        return {
            header: <Header>
                        <Left>
                            <Button iconLeft transparent onPress={ () => { navigation.goBack() }}>
                                <Icon name='arrow-back'></Icon>
                            </Button>
                        </Left>
                        <Body style={{flex: 3}}>
                            <Title>
                                Browse {navigation.getParam('genre', '') } Movies
                            </Title>
                        </Body>
                        <Right />
                    </Header>
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            page: 1
        }
        this.key = 0;
    }

    componentWillMount() {
        this._getMovies();
    }

    _getMovies() {
         movieService.getMoviesByGenreId(this.state.page, this.props.navigation.getParam('genreId'))
             .then(results => {
                 this.setState({
                     movies: this.state.movies.concat(results),
                     page: this.state.page + 1
                 });
             })
             .catch((error) => {
                 console.error(error);
             });
    }

    _renderItem = ({ item }) => {
        return (
            <MovieSummary
                navigation={this.props.navigation}
                movie={item}
            />
        );
    }

    _keyExtractor = (item, index) => item.id.toString();
    
    render() {
        return (
            <Container>
                <FlatList
                    data={this.state.movies}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={{ flexGrow: 1 }}
                    onEndReached={() => this._getMovies()}
                    onEndReachedThreshold={0.5}
                >
                </FlatList>
            </Container>
        );
    }
}

