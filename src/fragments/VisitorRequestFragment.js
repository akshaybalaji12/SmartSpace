import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width } from '../utils/constants';
import { Button } from '../components/Button';
import InputField from '../components/InputField';
import { DatePicker } from '../components/DatePicker';
import { generateRandomAlphaNumeric } from '../utils/utilities';
import { CalendarUtils } from 'react-native-calendars';
import Modal from 'react-native-modal';

const VisitorRequestFragment = ({ onSubmit, userID, ...props }) => {

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [purpose, setPurpose] = useState('')
    const [date, setDate] = useState('')
    const [isDatePicker, setDatePicker] = useState(false);

    const onFirstNameChange = (value) => {
        setFirstName(value);
    }

    const onLastNameChange = (value) => {
        setLastName(value);
    }

    const onPurposeChange = (value) => {
        setPurpose(value);
    }

    const onDatePress = () => {
        setDatePicker(true);
    }
    
    const onDateSelected = (selectedDate) => {
        setDate(selectedDate);
        setDatePicker(false);
    }

    const onSubmitPress = () => {
        const today = CalendarUtils.getCalendarDateString(new Date());
        const reqBody = {
            "userID": userID,
            "visitorFirstName": firstName,
            "visitorLastName": lastName,
            "visitingDate": date[0],
            "visitPurpose": purpose,
            "status": "Requested",
            "createdOn": today,
            "lastUpdated": today,
            "securityCode": generateRandomAlphaNumeric()
          }
          onSubmit(reqBody);
    }

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).header}>New Request</Text>
            <View style={styles(theme).row}>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <InputField placeholder="First Name" onInputChange={onFirstNameChange}/>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                    <InputField placeholder="Last Name" onInputChange={onLastNameChange} />                      
                </View> 
            </View>
            <View style={{ width, paddingHorizontal: 20 }}>
                <InputField placeholder="Visit Purpose" onInputChange={onPurposeChange} inputHeight={80}/>
            </View>
            <Pressable onPress={onDatePress}>                            
                <View style={[ styles(theme).dateContainer, { flexDirection: 'row', height: 50 }]}>
                    {date ?
                    <Text style={{ fontFamily: 'ProductSansBold', color: theme.white }}>{date}</Text> :
                    <Text style={{ fontFamily: 'ProductSansBold', color: theme.whiteRGB }}>Select Date</Text>}
                </View>
            </Pressable>
            <Modal
            isVisible={isDatePicker}
            onBackdropPress={() => setDatePicker(false)}
            style={{ justifyContent: 'flex-end', margin: 0 }}>
                <DatePicker theme={theme} isRange={false} onSelected={onDateSelected} />
            </Modal>     
            <Button buttonText={'Submit'} onButtonClick={onSubmitPress} buttonStyle={styles(theme).logoutButton} isOpacity={true} underlayColor={theme.accent} activeOpacity={0.7}/>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        isLoggedIn: state.settings.isLoggedIn,
        userData: state.auth.userData
    };
}

export default connect(
    mapStateToProps,
    actions
)(VisitorRequestFragment);

const styles = (theme) => StyleSheet.create({
    
    container: {
        backgroundColor: theme.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        fontFamily: 'ProductSansBold',
        fontSize: 32,
        color: theme.primary,
        marginTop: 15,
        marginHorizontal: 15,
        paddingHorizontal: 5,
        alignSelf: 'flex-start'
    },
    row: {
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10
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
        backgroundColor: theme.primary,
        borderRadius: 10,
        textColor: theme.white,
        margin: 12
    },
    dateContainer: {
        justifyContent: 'flex-start',
        width: width - 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.primary,
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 5
    },

})