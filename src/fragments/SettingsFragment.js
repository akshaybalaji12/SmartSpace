import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width } from '../utils/constants';
import { Button } from '../components/Button';

const SettingsFragment = ({ onLogout, ...props }) => {

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).header}>Settings</Text>
            <View style={styles(theme).row}>
                <Text style={styles(theme).title}>Notifications</Text>
                <Switch 
                    thumbColor={theme.primary}
                    trackColor={theme.accent}
                    value={false}
                />
            </View>
            <View style={styles(theme).row}>
                <Text style={styles(theme).title}>Dark Mode</Text>
                <Switch 
                    thumbColor={theme.primary}
                    trackColor={theme.accent}
                    value={props.isDarkMode}
                    onValueChange={() => { props.setDarkMode(!props.isDarkMode) }}
                />
            </View>
            {props.isLoggedIn && <Button buttonText={'Logout'} onButtonClick={onLogout} buttonStyle={styles(theme).logoutButton} isOpacity={false} underlayColor={theme.accent} activeOpacity={0.7}/>}
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        isLoggedIn: state.settings.isLoggedIn,
    };
}

export default connect(
    mapStateToProps,
    actions
)(SettingsFragment);

const styles = (theme) => StyleSheet.create({
    
    container: {
        backgroundColor: theme.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'ProductSans',
        fontSize: 32,
        color: theme.primary,
        margin: 15,
        paddingHorizontal: 5,
        alignSelf: 'flex-start'
    },
    row: {
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10
    },
    title: {
        fontFamily: 'ProductSans',
        fontSize: 16,
        color: theme.white
    },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        alignSelf: 'center',
        borderColor: theme.primary,
        borderWidth: 1,
        borderRadius: 10,
        textColor: theme.primary,
        margin: 12
    },

})