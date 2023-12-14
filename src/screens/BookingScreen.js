import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Animated, TouchableOpacity } from 'react-native'
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width, height } from '../utils/constants';
import { Button } from '../components/Button';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import SeatFragment from '../fragments/SeatFragment';
import ReviewFragment from '../fragments/ReviewFragment';
import LocationFragment from '../fragments/LocationFragment';
import { ActivityLoader } from '../components/ActivityLoader';

const BookingScreen = (props) => {

    const settingsIcon = require('../../assets/images/back.png');
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light; 
    
    const [activeStep, setActiveStep] = useState(0);
    const [btnEnabled, setBtnEnabled] = useState(false);
    const [scaleValue] = useState(new Animated.Value(0));

    let nextBtnInterpolation = scaleValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['100%', '80%']
    });

    const onComplete = (bookingData = {}) => {
        props.setBookingData(bookingData);
        setBtnEnabled(true);
    }

    const onBookingPressed = () => {
        props.bookSeat(props.bookingData);
    }

    useEffect(() => {
        setBtnEnabled(false);
    }, [activeStep]);

    useEffect(() => {
        if(props.bookingMessage !== '' && 
            (props.bookingMessage.indexOf('success') > -1) ||
            (props.bookingMessage.indexOf('fail') > -1)) {
                props.navigation.replace('Home');
            }
    }, [props.bookingMessage]);
    
    const onNext = () => {
        if(activeStep === 2) {
            onBookingPressed();
            return;
        }
        if(activeStep === 0) {    
            Animated.spring(scaleValue, {
                toValue: 1,
                useNativeDriver: false
            }).start();
        }
        setActiveStep(prevStep => prevStep + 1)
    }
    
    const onPrev = () => {
        if(activeStep === 1) {    
            Animated.spring(scaleValue, {
                toValue: 0,
                useNativeDriver: false
            }).start();
        }
        setActiveStep(prevStep => prevStep - 1)
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles(theme).container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles(theme).view}>
                    <View style={styles(theme).titleContainer}>                        
                        <Text style={styles(theme).title}>Book {'\n'}Your Seats</Text>
                    </View>
                    <View style={styles(theme).inputContainer}>
                        <ProgressSteps borderWidth={4} topOffset={0} marginBottom={20}
                         labelFontFamily='ProductSansBold' activeStep={activeStep} progressBarColor={theme.accentRGB}
                         activeStepIconBorderColor={theme.primary} completedProgressBarColor={theme.primary} activeStepIconColor={theme.primary}
                         completedStepIconColor={theme.primary} disabledStepIconColor={theme.accent} activeLabelColor={theme.accent} 
                         activeLabelFontSize={20} completedLabelColor={theme.primary} 
                         activeStepNumColor={theme.white} completedStepNumColor={theme.primary} disabledStepNumColor={theme.white}>
                            <ProgressStep label={'Location & Date'} removeBtnRow={true}>
                                <LocationFragment onComplete={onComplete} />
                            </ProgressStep>
                            <ProgressStep label={'Select Seat'} removeBtnRow={true}>
                                <SeatFragment theme={theme} onComplete={onComplete} />
                            </ProgressStep>
                            <ProgressStep label={'Review'} removeBtnRow={true}>
                                <ReviewFragment theme={theme} />
                            </ProgressStep>
                        </ProgressSteps>
                        <View style={styles(theme).buttonContainer}>
                            {(activeStep > 0) && 
                            <Animated.View style={{ height: 50, width: '15%', flexDirection: 'row', justifyContent: 'center', position: 'absolute', start: 20 }}>
                                <Button iconImage={settingsIcon} isIcon={true} iconStyle={styles(theme).iconStyle} underlayColor={theme.accentRGB} activeOpacity={0.6} onButtonClick={onPrev}
                                buttonStyle={styles(theme).prevButton} />
                            </Animated.View>}
                            <Animated.View style={{ width: nextBtnInterpolation, height: 50, flexDirection: 'row', justifyContent: 'center', position: 'absolute', end: 0 }}>
                                <Button buttonText={activeStep === 2 ? 'Book Seat' : 'Next'} underlayColor={theme.accentRGB} activeOpacity={0.6} onButtonClick={onNext}
                                buttonStyle={styles(theme).nextButton} isDisabled={!btnEnabled && (activeStep !== 2)} />
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        floorPlan: state.metadata.floorPlan,
        bookingData: state.bookings.seatBookingData,
        bookingMessage: state.bookings.bookingMessage
    };
}

export default connect(
    mapStateToProps,
    actions
)(BookingScreen);

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    view: {
        flex: 1,
    },
    titleContainer: {
        flex: 1,
        width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingStart: 20
    },
    title: {
        fontSize: 60,
        fontFamily: 'ProductSansBold',
        color: theme.primary,
    },
    inputContainer: {
        flex: 3,
        width
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width,
        alignSelf: 'center',
        marginBottom: 30,
    },
    nextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        backgroundColor: theme.primary,
        borderRadius: 10,
        textColor: theme.white
    },
    prevButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        height: 50,
        alignSelf: 'center',
        backgroundColor: theme.primary,
        borderRadius: 10,
        textColor: theme.white
    },
    selectContainer: {
        justifyContent: 'flex-start',
        width: width - 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.primary,
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    dropDownContainer: {
        width: width - 40,
        borderWidth: 1,
        borderColor: theme.primary,
        alignSelf: 'center',
        paddingVertical: 5,
        backgroundColor: theme.surface
    },
    selectInput: {
        fontFamily: 'ProductSans',
        color: theme.white
    },
    iconStyle: { 
        width: 25, 
        height: 25, 
        tintColor: 'white' 
    }
})