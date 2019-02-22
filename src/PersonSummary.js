/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    Dimensions,
} from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Left,
    Text,
    Thumbnail,
} from 'native-base';

export default class PersonSummary extends Component {
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
