/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    Alert,
    Platform,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    FlatList,
    RefreshControl,
    StyleSheet,
    View
} from 'react-native';
import {
    Body,
    Button,
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
    Thumbnail,
    List,
    ListItem
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import movieService from './services/movie.service';


export default class CastCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let win = Dimensions.get('window');        
        return (
           <List
                dataArray={this.props.genres}
                renderRow={(genre) => {
                    return (
                        <ListItem
                            onPress = {() => {this.props.navigation.push('CategoryPage', {genre: genre.name, genreId: genre.id}); }}
                        >   
                            <Left>
                                <Text>{genre.name}</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    );
                }}
            ></List>
        );
    }
}
