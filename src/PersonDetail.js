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
import personService from './services/person.service';
import CastCard from './CastCard';

export default class PersonDetailPage extends Component {
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
                                {navigation.getParam('actor', 'Actor Details').title}
                            </Title>
                        </Body>
                        <Right />
                    </Header>
        }
    };
    
    constructor(props) {
        super(props);
        this.state = {
            person: {},
            fetchedPerson: false,
        }
    }

    componentWillMount() {
        this._getPerson();
    }

    _getPerson() {
        personService.getPersonDetail(this.props.navigation.getParam('actorId', ''))
            .then(results => {
                this.setState({
                    fetchedPerson: true,
                    person: results
                })
            })
            .catch( (error) => {
                console.error(error);
            });
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
                    {this.state.fetchedPerson ? 
                        <Card transparent>
                            <CardItem header>
                                <Body>
                                    <Text style={{fontSize: 32}}>
                                        {this.state.person.name}
                                    </Text>
                                    <Text note>
                                        Popularity: {this.state.person.popularity}
                                    </Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Image
                                        source={{uri: 'https://image.tmdb.org/t/p/w500' + this.state.person.profilePath}}
                                        style={{width: win.width-50, height: 350}}
                                        resizeMode='contain'
                                    />
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>{this.state.person.biography}</Text>
                                    <Text>Born: {this.formatDate(this.state.person.birthDate)}</Text>
                                    <Text>Birthplace: {this.state.person.placeOfBirth}</Text>
                                    {this.state.deathdate != null ? 
                                        <Text>Died: {this.state.person.deathDate}</Text>
                                    :
                                        null
                                    }
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
