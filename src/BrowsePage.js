/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Alert,
    Platform,
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
    Title
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import movieService from './services/movie.service';



export default class BrowsePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genreList: []
        }
        this.data = [{ val1: 'One', val2: 'Two' }, { val1: 'Three', val2: 'Four' }];
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
            <Card
                dataArray={this.state.genreList}
                renderRow={(genre) => {
                    return(
                        <CardItem>
                            <Text style={styles.genreText}>{genre.name}</Text>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </CardItem>
                    );
                }}
            >
                <CardItem header>
                    <Text>Select a Genre</Text>
                </CardItem>
            </Card>
        );
    }

    render() {
        return (
            <Container>
                <Header>
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
                <Content>
                    {this._renderGenres()}
                    <Card>
                        <CardItem header>
                            <Text>This is the Header</Text>
                        </CardItem>
                        <CardItem cardBody>
                            <Text>
                                This is the body of the card. It contains the main text
                                that you want to display.
                            </Text>
                        </CardItem>
                        <CardItem footer>
                            <Text>This is the footer</Text>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem 
                            button
                            onPress={()=>this.launchAlert()}
                        >
                            <Icon active name="ios-american-football" />
                            <Text>Football</Text>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
                    <Card
                        dataArray={this.data}
                        renderRow={(item) => <CardItem><Text>{item.val1} and {item.val2}</Text></CardItem>}
                    >
                    </Card>
                    <Card>
                        <CardItem>
                            <Icon active name="ios-boat" />
                            <Text>Boating</Text>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </CardItem>
                        <CardItem>
                            <Icon active name="ios-build" />
                            <Text>Two CardItems in one Card</Text>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
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
        width: '50%',
        fontSize: 20,
        paddingLeft: 15
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
