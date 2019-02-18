/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    Platform,
    ScrollView, 
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



export default class BrowsePage extends Component {
    static navigationOptions = {
        header: <Header>
                    <Left>
                        <MaterialIcons size={25} name='theaters' />
                    </Left>
                    <Body>
                        <Title>
                            Browse Movies
                        </Title>
                    </Body>
                    <Right />
                </Header>
    }

    constructor(props) {
        super(props);
        this.state = {
            genreList: []
        }
    }

    componentDidMount() {
        this._getGenres();
    }

    _getGenres() {
         movieService.getGenres()
             .then(results => {
                 this.setState({
                     genreList: results
                 });
             })
             .catch((error) => {
                 console.error(error);
             });
    }

    _renderGenres() {
        return(
            <List
                dataArray={this.state.genreList}
                renderRow={(genre) => {
                    return (
                        <ListItem
                            onPress = {() => {this.props.navigation.navigate('CategoryPage', {genre: genre.name, genreId: genre.id}); }}
                        >
                            <Text style={styles.genreText}>{genre.name}</Text>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    );
                }}
            ></List>
        );
    }

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem header>
                            <Text>Select a Genre</Text>
                        </CardItem>
                        <CardItem>
                            {this._renderGenres()}
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

    launchAlert() {
        Alert.alert(
          'This is an Alert',
          'This is the Alert message',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
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
