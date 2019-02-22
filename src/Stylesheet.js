import {
    Dimensions,
    StyleSheet,
} from 'react-native';

export default StyleSheet.create({
    castCard: {
        width: Dimensions.get('window').width * 0.4
    },
    castCardImg: {
        width: Dimensions.get('window').width * 0.33,
        height: 200,
        flex: 1
    },
    headerBodyFlex: {
        flex: 3
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    bigTitleFont: {
        fontSize: 32
    },
    mediumTitleFont: {
        fontSize: 24
    },
    movieDetailImg: {
        width: Dimensions.get('window').width - 50,
        height: 350
    },
    movieSummaryImage: {
        width: Dimensions.get('window').width - 50, 
        height: 200, 
        flex: 1
    },
    movieSummaryCardNarrow: {
        width: Dimensions.get('window').width * 0.85
    },
    movieSummaryImageNarrow: {
        width: Dimensions.get('window').width * 0.85 - 50,
        height: 200,
        flex: 1
    },
    readMoreText: {
        textAlign: 'auto', 
        textDecorationLine: 'underline'
    },
    personDetailImage: {
        width: Dimensions.get('window').width - 50,
        height: 350
    },
    rightAlignText: {
        textAlign: 'right'
    }
});
