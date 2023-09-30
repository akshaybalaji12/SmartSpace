import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ColorModes, width, height } from '../utils/constants';
import InputField from '../components/InputField';
import { Button } from '../components/Button';

const LoginScreen = (props) => {

    useEffect(() => {
        if(props.isLoggedIn) {
            props.navigation.replace('Home');            
        }
    }, []);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const theme = props.isDarkMode ? ColorModes.dark : ColorModes.light;
    const settingsIcon = require('../../img/settings_white.png');
    
    const onSettingsPressed = () => {
        props.navigation.navigate('Settings');
    }

    const onUserNameChange = (value) => {
        setUserName(value);
    }

    const onPasswordChange = (value) => {
        setPassword(value);
    }

    const onLogin = () => {
        if(userName === 'akshay' && password === 'akshay') {
            props.setLoggedIn(true);
            props.navigation.replace('Home');
        }
    }

    return (
        <View style={styles(theme).container}>
            <TouchableOpacity onPress={onSettingsPressed} style={styles(theme).imgContainer}>
                <Image source={settingsIcon} style={styles(theme).image}/>
            </TouchableOpacity>
            <Text style={styles(theme).title}>SmartSpace</Text>
            <View style={styles(theme).inputContainer}>
                <InputField placeholder="Enter Mobile No." onInputChange={onUserNameChange} />
                <InputField placeholder="Password" onInputChange={onPasswordChange} secureTextEntry={true} />
                <Button buttonText={'Login'} isOpacity={false} underlayColor={theme.accentRGB} activeOpacity={0.6} onButtonClick={onLogin} buttonStyle={styles(theme).loginButton} />
                <Button buttonText={'Sign Up'} isOpacity={false} underlayColor={theme.accentRGB} activeOpacity={0.6} onButtonClick={onLogin} buttonStyle={styles(theme).signupButton} />
            </View>
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
)(LoginScreen);

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
        color: theme.white,
        fontSize: 12
    },
    image: {
        height: 30,
        width: 30,
        padding: 5,
        resizeMode: 'contain',
        tintColor: theme.white
    },
    imgContainer: {
        height: 30,
        width: 30,
        position: 'absolute',
        top: 25,
        right: 10
    },
    title: {
        fontSize: 24,
        fontFamily: 'ProductSansBold',
        color: theme.white
    },
    inputContainer: {
        height: height/2.5,
        width: width,
        padding: 20,
        justifyContent: 'space-between',
        marginTop: 30
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40,
        alignSelf: 'center',
        borderColor: theme.primary,
        backgroundColor: theme.primary,
        borderWidth: 2,
        borderRadius: 25,
        textColor: theme.white
    },
    signupButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40,
        alignSelf: 'center',
        borderColor: theme.primary,
        borderWidth: 2,
        borderRadius: 25,
        textColor: theme.white
    }
})