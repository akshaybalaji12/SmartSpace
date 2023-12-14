import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width, height } from '../utils/constants';
import InputField from '../components/InputField';
import { Button } from '../components/Button';
import { ActivityLoader } from '../components/ActivityLoader';
import Animated, { getUseOfValueInStyleWarning } from 'react-native-reanimated'

const LoginScreen = (props) => {

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    
    const [isVisible, setVisible] = useState(true);

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    const onFocus = () => {
        setVisible(false);
    }

    const onBlur = () => {
        setVisible(true);
    }

    const onUserNameChange = (value) => {
        props.clearError();
        setUserID(value);
    }

    const onPasswordChange = (value) => {
        props.clearError();
        setPassword(value);
    }

    const onLogin = () => {
        Keyboard.dismiss();
        const userParams = {
            userID: userID,
            password: password
        }
        props.requestLogin(userParams);
    }

    const onSignUp = () => {
        props.navigation.navigate('SignUp');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
            <View style={styles(theme).container}>
                {isVisible && <Animated.Text style={styles(theme).title} sharedTransitionTag='title'>Workplace {'\n'}Assistant</Animated.Text>}
                <View style={styles(theme).inputContainer}>
                    <InputField placeholder="Employee ID" onBlur={onBlur} onFocus={onFocus} onInputChange={onUserNameChange} />
                    <InputField placeholder="Password" onBlur={onBlur} onFocus={onFocus} onInputChange={onPasswordChange} secureTextEntry={true} />              
                </View>
                <View style={styles(theme).buttonContainer}>
                    {props.isLoading ? 
                    <ActivityLoader theme={theme} /> :
                    <Button 
                        buttonText={'Login'} isOpacity={false} underlayColor={theme.accent} 
                        activeOpacity={0.6} onButtonClick={onLogin} 
                        buttonStyle={styles(theme).loginButton} isDisabled={!userID || !password}/>}
                    <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'ProductSans', fontSize: 16, color: theme.white }}>Not a member yet?</Text>
                        <TouchableOpacity style={{ paddingHorizontal: 10}} onPress={onSignUp}>
                            <Text style={{ fontFamily: 'ProductSansBold', fontSize: 16, color: theme.primary, textDecorationLine: 'underline' }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                props.loginError &&
                <Text style={styles(theme).error}>{props.loginError}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        isLoggedIn: state.settings.isLoggedIn,
        loginError: state.auth.loginError,
        isLoading: state.auth.isLoading
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
        fontSize: 32,
        fontFamily: 'ProductSansBold',
        color: theme.primary,
        textAlign: 'center',
        position: 'absolute',
        top: 20
    },
    inputContainer: {
        height: height/3,
        width,
        padding: 20,
        justifyContent: 'center',
        marginTop: 30
    },
    buttonContainer: {
        height: 250,
        width,
        padding: 50,
        justifyContent: 'center'
    },
    loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        alignSelf: 'center',
        borderColor: theme.primary,
        backgroundColor: theme.primary,
        borderWidth: 1,
        borderRadius: 10,
        textColor: theme.white,
        margin: 12
    },
    error: {
        fontSize: 18,
        fontFamily: 'ProductSansBold',
        color: theme.white
    }
})