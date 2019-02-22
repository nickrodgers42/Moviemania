/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    Image,
    Dimensions,
} from 'react-native';
import {
    Body,
    Card,
    CardItem,
    Text,
} from 'native-base';
import Styles from './Stylesheet';


export default class CastCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let win = Dimensions.get('window');        
        return (
            <Card style={Styles.castCard}>
                <CardItem 
                    button 
                    onPress={() => (this.props.navigation.push('PersonDetailPage', {actorId: this.props.castMember.id, actor: this.props.castMember.name}))}   
                >
                    <Body>
                        <Image
                            source={{uri: 'https://image.tmdb.org/t/p/w300' + this.props.castMember.profilePath}} 
                            style={Styles.castCardImg}
                            resizeMode='contain'
                        />
                        <Text>{this.props.castMember.name}</Text>
                        <Text note>{this.props.castMember.character ? this.props.castMember.character.substring(0, 120) : null}</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
