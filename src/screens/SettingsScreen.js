import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ColorModes } from '../utils/constants';

const SettingsScreen = (props) => {

    const theme = props.isDarkMode ? ColorModes.dark : ColorModes.light;

    return (
        <View style={styles(theme).container}>
            <Switch 
                value={props.isDarkMode}
                onValueChange={() => { props.setDarkMode(!props.isDarkMode) }}
            />
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode
    };
}

export default connect(
    mapStateToProps,
    actions
)(SettingsScreen);

const styles = (theme) => StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: theme.background,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

})