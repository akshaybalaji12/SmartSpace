import React, { useEffect } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ColorModes } from '../utils/constants';

const HomeScreen = (props) => {

    const theme = props.isDarkMode ? ColorModes.dark : ColorModes.light;

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).text}>Welcome!</Text>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        isLoggedIn: state.settings.isLoggedIn
    };
}

export default connect(
    mapStateToProps,
    actions
)(HomeScreen);

const styles = (theme) => StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: theme.background,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {        
        fontFamily: 'ProductSans',
        color: theme.white
    }

})