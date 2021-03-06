/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    FlatList,
} from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Button,
    Container,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Title,
} from 'native-base';
import movieService from './services/movie.service';
import MovieSummary from './MovieSummary';
import Styles from './Stylesheet';

export default class CategoryPage extends Component {
    static navigationOptions = ({navigation}) => { 
        return {
            header: <Header>
                        <Left>
                            <Button iconLeft transparent onPress={ () => { navigation.goBack() }}>
                                <Icon name='arrow-back'></Icon>
                            </Button>
                        </Left>
                        <Body style={Styles.headerBodyFlex}>
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
            page: 1,
            totalPages: 0,
            totalResults: 0,
            fetchedResults: false
        }
    }

    componentWillMount() {
        this._getMovies();
    }

    _getMovies() {
        if (this.state.page <= this.state.totalPages || this.state.totalPages == 0) {
            movieService.getMoviesByGenreId(this.state.page, this.props.navigation.getParam('genreId'))
                .then(results => {
                    this.setState({
                        movies: this.state.movies.concat(results.movies),
                        page: this.state.page + 1,
                        totalPages: results.totalPages,
                        totalResults: results.totalResults,
                        fetchedResults: true
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Found {this.state.totalResults} {this.props.navigation.getParam('genre', '')} Movies</Text>
                        </Body>
                    </CardItem>
                </Card>
                <FlatList
                    data={this.state.movies}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={Styles.flatListContentContainer}
                    onEndReached={() => this._getMovies()}
                    onEndReachedThreshold={0.5}
                >
                </FlatList>
            </Container>
        );
    }
}

