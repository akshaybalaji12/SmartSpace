import React, { useState, useEffect, useId } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width, height } from '../utils/constants';
import InputField from '../components/InputField';
import { Button } from '../components/Button';
import Animated from 'react-native-reanimated';

const SignUpScreen = (props) => {

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isPasswordValid, setPasswordValidity] = useState(true);
    const [isVisible, setVisible] = useState(true);

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    const onFocus = () => {
        setVisible(false);
    }

    const onBlur = () => {
        setVisible(true);
    }

    const onUserNameChange = (value) => {
        setUserID(value);
    }

    const onPasswordChange = (value) => {
        setPassword(value);
    }

    const onConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setPasswordValidity(value === password);
    }

    const onFirstNameChange = (value) => {
        setFirstName(value);
    }

    const onLastNameChange = (value) => {
        setLastName(value);
    }

    const onSignUp = () => {
        Keyboard.dismiss();
        const userParams = {
            userID: userID,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        props.requestSignUp(userParams);
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles(theme).container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles(theme).view}>
                    {isVisible && <Animated.Text style={styles(theme).title} sharedTransitionTag='title'>Workplace {'\n'}Assistant</Animated.Text>}
                    <View style={styles(theme).inputContainer}>
                        <InputField placeholder="Employee ID" onBlur={onBlur} onFocus={onFocus} onInputChange={onUserNameChange} />
                        <InputField placeholder="Password" isError={!isPasswordValid} onBlur={onBlur} onFocus={onFocus} onInputChange={onPasswordChange} secureTextEntry={true} />
                        <InputField placeholder="Confirm Password" isError={!isPasswordValid} onBlur={onBlur} onFocus={onFocus} onInputChange={onConfirmPasswordChange} secureTextEntry={true} />
                        <View style={styles(theme).row}>
                            <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                <InputField placeholder="First Name" onBlur={onBlur} onFocus={onFocus} onInputChange={onFirstNameChange}/>
                            </View>
                            <View style={{ flex: 1, paddingHorizontal: 5 }}>
                                <InputField placeholder="Last Name" onBlur={onBlur} onFocus={onFocus} onInputChange={onLastNameChange} />                      
                            </View> 
                        </View>         
                    </View>
                        <Button buttonText={'Register'} isOpacity={false} underlayColor={theme.accentRGB} activeOpacity={0.6} 
                        onButtonClick={onSignUp} buttonStyle={styles(theme).signupButton} isDisabled={!userID || !password || !confirmPassword || !firstName || !lastName || !isPasswordValid} />    
                    {
                    props.loginError &&
                    <Text style={styles(theme).error}>{props.loginError}</Text>
                    }
                </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        signUpError: state.auth.loginError
    };
}

export default connect(
    mapStateToProps,
    actions
)(SignUpScreen);

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    view: {
        flex: 1,
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
        height: height/2,
        width: width,
        padding: 20,
        justifyContent: 'center',
        marginTop: 30
    },
    row: {
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        alignSelf: 'center'
    },
    signupButton: {
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
        marginHorizontal: 12
    },
    error: {
        fontSize: 18,
        fontFamily: 'ProductSansBold',
        color: theme.white
    },
    selectContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.primary,
        height: 50,
        borderRadius: 25,
        marginTop: 12,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    dropDownContainer: {
        borderWidth: 1,
        borderColor: theme.primary
    },
    selectInput: {
        fontFamily: 'ProductSans',
        color: theme.white
    }
})