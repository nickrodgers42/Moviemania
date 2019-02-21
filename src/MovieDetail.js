/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    View,
    FlatList
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
import movieService from './services/movie.service';

export default class MovieDetailPage extends Component {
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
                                {navigation.getParam('movie', 'Movie Details').title}
                            </Title>
                        </Body>
                        <Right />
                    </Header>
        }
    };
    
    constructor(props) {
        super(props);
        this.state = {
            fetchedMovie: false,
            movie: {},
            cast: []
        }
    }

    componentWillMount() {
        this._getMovie()
    }

    _getMovie() {
        movieService.getMovieDetail(this.props.navigation.getParam('movie', '').id)
            .then( (results) => {
                this.setState({
                    movie: results,
                    fetchedMovie: true
                })
            })
            .catch( (error) => {
                console.error(error);
            });
        movieService.getMovieCast(this.props.navigation.getParam('movie', '').id)
            .then( (results) => {
                this.setState({
                    cast: results
                });
            })
    }

    formatDate(dateStr) {
        year = dateStr.substring(0, 4);
        month = dateStr.substring(5,7);
        day = dateStr.substring(8,10);
        return month + '/' + day + '/' + year.substring(2);
    }

    render() {
        let win = Dimensions.get('window');
        return (
            <Container>
                <Content>
                {this.state.fetchedMovie ?
                    <Card transparent>
                        <CardItem header>
                            <Body>
                                <Text style={{fontSize: 32}}>
                                    {this.state.movie.title}
                                </Text>
                                <Text note>
                                    Popularity: {this.state.movie.popularity}
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image 
                                    source={{uri: 'https://image.tmdb.org/t/p/w500/' + this.state.movie.posterPath}} 
                                    style={{width: win.width-50, height: 350}} 
                                    resizeMode='contain'
                                />
                                <Text style={{paddingTop: 20}}>{this.state.movie.overview}</Text>
                                <Text>Release Date: {this.formatDate(this.state.movie.releaseDate)}</Text>
                                <Text>Budget: ${this.state.movie.budget}</Text>
                                <Text>Revenue: ${this.state.movie.revenue}</Text>
                                <Text>Status: {this.state.movie.status}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                :
                null
                }
                </Content>
            </Container>
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
