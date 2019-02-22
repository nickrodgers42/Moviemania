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
import CastCard from './CastCard';
import GenreList from './GenreList';
import Styles from './Stylesheet';

export default class MovieDetailPage extends Component {
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
            fetchedCast: false,
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
                    fetchedCast: true,
                    cast: results
                });
            })
    }

    _castKeyExtractor = (item, index) => item.id.toString();

    _renderCastMember = ({ item }) => {
        return(
            <CastCard 
                castMember={item}
                navigation={this.props.navigation}
            />
        );
    }

    formatDate(dateStr) {
        year = dateStr.substring(0, 4);
        month = dateStr.substring(5,7);
        day = dateStr.substring(8,10);
        return month + '/' + day + '/' + year.substring(2);
    }

    
    _renderGenres() {
        return(
            <GenreList
                navigation={this.props.navigation}
                genres={this.state.movie.genres}
            />
        );
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
                                <Text style={Styles.bigTitleFont}>
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
                                    style={Styles.movieDetailImg} 
                                    resizeMode='contain'
                                />
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={Styles.mediumTitleFont}>Overview</Text>
                                <Text>{this.state.movie.overview}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Text>Release Date:</Text>
                            </Left>
                            <Right>
                                <Text style={Styles.rightAlignText}>{this.formatDate(this.state.movie.releaseDate)}</Text>
                            </Right>
                        </CardItem>                                
                        <CardItem>
                            <Left>
                                <Text>Budget:</Text>
                            </Left>
                            <Right>
                                <Text style={Styles.rightAlignText}>${this.state.movie.budget}</Text>
                            </Right>
                        </CardItem>                        
                        <CardItem>
                            <Left>
                                <Text>Revenue:</Text>
                            </Left>
                            <Right>
                                <Text style={Styles.rightAlignText}>${this.state.movie.revenue}</Text>
                            </Right>
                        </CardItem>                        
                        <CardItem>
                            <Left>
                                <Text>Status:</Text>
                            </Left>
                            <Right>
                                <Text style={Styles.rightAlignText}>{this.state.movie.status}</Text>
                            </Right>
                        </CardItem>                        
                        <CardItem header>
                            <Text>Cast</Text>
                        </CardItem>
                        {this.state.fetchedCast ? 
                            <CardItem>
                                <Body>
                                    <FlatList
                                        data={this.state.cast}
                                        renderItem={this._renderCastMember}
                                        keyExtractor={this._castKeyExtractor}
                                        contentContainerStyle={Styles.flatListContentContainer}
                                        horizontal={true}
                                    >
                                    </FlatList>
                                </Body>
                            </CardItem>
                        : null
                        }
                        <CardItem header>
                            <Text>Genres</Text>
                        </CardItem>
                        {this._renderGenres()}
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
