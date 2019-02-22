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
import personService from './services/person.service';
import PersonCard from './PersonCard';
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
                                 Search Results for '{navigation.getParam('query', '')}'
                            </Title>
                        </Body>
                        <Right />
                    </Header>
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            people: [],
            totalResults: 0,
            totalPages: 0,
            page: 1,
            fetchedSearchResults: false
        }
        this.key = 0;
    }

    componentWillMount() {
        this._getPeople();
    }

    _getPeople() {
        if (this.state.page <= this.state.totalPages || this.state.totalPages == 0) {
            personService.getPersonSearchResults(this.props.navigation.getParam('query', ''))
                .then( (results) =>{
                    this.setState({
                        people: results.people,
                        totalResults: results.totalResults,
                        totalPages: results.totalPages,
                        fetchedSearchResults: true,
                        page: this.state.page + 1
                    })
                })
                .catch( (error) => {
                    console.error(error);
                })
        }
    }

    _renderItem = ({ item }) => {
        return (
            <PersonCard
                navigation={this.props.navigation}
                person={item}
            />
        );
    }

    _keyExtractor = (item, index) => item.id.toString();
    
    render() {
        return (
            <Container>
                <Card>
                    <CardItem header>
                        <Body>
                            <Text>Search results for '{this.props.navigation.getParam('query', '')}'</Text>
                            {this.state.fetchedSearchResults ? 
                                <Text note>Search returned {this.state.totalResults} results</Text>
                            :
                                null
                            }
                        </Body>
                    </CardItem>
                </Card>
                <FlatList
                    data={this.state.people}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={Styles.flatListContentContainer}
                    onEndReached={() => this._getPeople()}
                    onEndReachedThreshold={0.5}
                >
                </FlatList>
            </Container>
        );
    }
}

