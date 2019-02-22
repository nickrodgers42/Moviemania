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
    Button,
    Content,
    Form,
    Item,
    Input,
    Header,
    Picker,
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
import GenreList from './GenreList'



export default class SearchPage extends Component {
    static navigationOptions = {
        header: <Header>
                    <Left>
                        <MaterialIcons size={25} name='search' />
                    </Left>
                    <Body>
                        <Title>
                            Search
                        </Title>
                    </Body>
                    <Right />
                </Header>
    }

    constructor(props) {
        super(props);
        this.state = {
            searchBy: 'Movies'
        }
    }

    onValueChange() {
        if (this.state.searchBy === 'Movies') {
            this.setState({
                searchBy: 'People'
            })
        }
        else {
            this.setState({
                searchBy: 'Movies',
                searchVal: ''
            });
        }
    }


    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <Form>
                            <Item picker>
                                <Picker
                                    mode='dropdown'
                                    iosHeader='Search By'
                                    selectedValue={this.state.searchBy}
                                    onValueChange={() => this.onValueChange()}
                                >
                                    <Picker.Item label='Movies' value='Movies' />
                                    <Picker.Item label='People' value='People' />
                                </Picker>
                            </Item>
                            <Item rounded>
                                <MaterialIcons size={25} name='search' />
                                <Input placeholder={'Search ' + this.state.searchBy} 
                                    onChangeText={(value) => {
                                        this.setState({
                                            searchVal: value
                                        })
                                    }}
                                />
                            </Item>
                            <Button full>
                                <Text>Search</Text>
                            </Button>
                        </Form>
                    </Card>
                </Content>
            </Container>
        );
    }
}
