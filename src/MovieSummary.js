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

    formatDate(dateStr) {
        if (dateStr != null) {
            year = dateStr.substring(0, 4);
            month = dateStr.substring(5,7);
            day = dateStr.substring(8,10);
            return month + '/' + day + '/' + year.substring(2);
        }
        else {
            return '';
        }
    }

    render() {
        let win = Dimensions.get('window');
        let cardStyle={};
        let imgStyle={width: win.width-50, height: 200, flex: 1}; 
        if (this.props.narrow) {
            cardStyle={
                width: win.width*0.85
            }
            imgStyle={
                width: win.width*0.85 - 50,
                height: 200,
                flex: 1
            }
        }
        return (
            <Card style={cardStyle}>
                <CardItem button onPress={() => {this.props.navigation.push('MovieDetailPage', {movie: this.props.movie})}}>
                    <Left>
                        <Thumbnail large square source={{uri: 'https://image.tmdb.org/t/p/w200' + this.props.movie.posterPath}} />
                        <Body>
                            <Text>{this.props.movie.title}</Text>
                            {this.props.movie.character != null ?
                                <Text note>{this.props.movie.character}</Text>
                            :
                                null
                            }
                            <Text note>Popularity: {this.props.movie.popularity}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Image
                            source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.movie.backdropPath}}
                            style={imgStyle}
                            resizeMode='cover' 
                        />
                        <Text style={{paddingTop: 20}}>{!this.state.readMore && this.props.movie.overview.length > 120 ? this.props.movie.overview.substring(0, 120) + '...'  : this.props.movie.overview}</Text>
                        <Button small primary transparent onPress={() => this.readMore()}>
                        {!this.state.readMore && this.props.movie.overview.length > 120 ?
                            <Text note style={{textAlign: 'auto', textDecorationLine: 'underline'}}>Read More</Text>
                        :
                            null
                        }
                        {this.state.readMore && this.props.movie.overview.length > 120 ?
                            <Text note style={{textAlign: 'auto', textDecorationLine: 'underline'}}>Show Less</Text>
                        :
                            null
                        }
                        </Button> 
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text note>Released {this.formatDate(this.props.movie.releaseDate)}</Text>
                    </Left>
                    <Right>
                        <Button onPress={() => {this.props.navigation.push('MovieDetailPage', {movie: this.props.movie})}}>
                            <Text>More Details</Text>
                        </Button>
                    </Right>
                </CardItem>
            </Card>
        );
    }
}
