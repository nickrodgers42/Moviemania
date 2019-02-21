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


export default class MovieSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false
        }
    }

    readMore() {
        this.setState({
            readMore: !this.state.readMore
        });
    }

    render() {
        let win = Dimensions.get('window');
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail large square source={{uri: 'https://image.tmdb.org/t/p/w200' + this.props.movie.posterPath}} />
                        <Body>
                            <Text>{this.props.movie.title}</Text>
                            <Text note>Popularity: {this.props.movie.popularity}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movie.backdropPath}} style={{width: win.width-50, height: 200, flex: 1}} ImageResizeMode='cover' />
                        <Text style={{paddingTop: 20}}>{!this.state.readMore && this.props.movie.overview.length > 180 ? this.props.movie.overview.substring(0, 180) + '...'  : this.props.movie.overview}</Text>
                        <Button small primary transparent onPress={() => this.readMore()}>
                        {!this.state.readMore && this.props.movie.overview.length > 180 ?
                            <Text note style={{textAlign: 'auto', textDecorationLine: 'underline'}}>Read More</Text>
                        :
                            <Text note style={{textAlign: 'auto', textDecorationLine: 'underline'}}>Show Less</Text>
                        }
                        </Button> 
                    </Body>
                </CardItem>
                <CardItem>
                    <Left />
                    <Right>
                        <Button>
                            <Text>More Details</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}
