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


export default class PersonCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let win = Dimensions.get('window');        
        return (
            <Card>
                <CardItem button
                    onPress={() => (this.props.navigation.push('PersonDetailPage', {actorId: this.props.person.id, actor: this.props.person.name}))}   
                >
                    <Left>
                        <Thumbnail square large source={{uri: 'https://image.tmdb.org/t/p/w300' + this.props.person.profilePath}} />
                        <Body>
                            <Text>{this.props.person.name}</Text>
                            <Text note>Popularity: {this.props.person.popularity}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}
