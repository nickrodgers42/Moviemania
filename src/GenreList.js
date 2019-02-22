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
    Icon,
    Left,
    Right,
    Text,
    List,
    ListItem
} from 'native-base';

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
