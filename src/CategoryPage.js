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



export default class CategoryPage extends Component {
    static navigationOptions = ({navigation}) => { 
        return {
            header: <Header>
                        <Left>
                            <TouchableOpacity>
                                <Icon size={25} name='arrow-back' onPress={ () => { navigation.goBack() }} />
                            </TouchableOpacity>
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
            <Card>
                <CardItem>
                    <Text>{item.title}</Text>
                </CardItem>
            </Card>
        );
    }

    _keyExtractor = (item, index) => { 
        let key = this.key;
        this.key += 1;
        return key;
     }
    
    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>New Page</Text>
                        </CardItem>
                    </Card>
                    <FlatList
                        data={this.state.movies}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                        contentContainerStyle={{ flexGrow: 1 }}
                        onEndReachedThreshold={50}
                        onEndReached={this._getMovies.bind(this)}
                    >
                    </FlatList>
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
    genreText: {
        fontSize: 20,
        width: "85%"
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
