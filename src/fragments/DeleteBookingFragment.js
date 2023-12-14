import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native'
import { width } from '../utils/constants';
import { Button } from '../components/Button';

export const DeleteBookingFragment = ({ theme, onCancel, onDelete }) => {

    return (
        <View style={styles(theme).container}>
            <Text style={styles(theme).header}>Cancel Booking</Text>
            <Text style={styles(theme).title}>Are you sure?</Text>
            <View style={styles(theme).row}>
                <Button buttonText={'No'} onButtonClick={onCancel} buttonStyle={styles(theme).logoutButton} isOpacity={false} underlayColor={theme.accent} activeOpacity={0.7}/>
                <Button buttonText={'Yes'} onButtonClick={onDelete} buttonStyle={styles(theme).logoutButton} isOpacity={false} underlayColor={theme.accent} activeOpacity={0.7}/>
            </View>
        </View>
    )

}

const styles = (theme) => StyleSheet.create({
    
    container: {
        backgroundColor: theme.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        paddingTop: 10
    },
    header: {
        fontFamily: 'ProductSansBold',
        fontSize: 22,
        color: theme.primary,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 5,
        alignSelf: 'flex-start'
    },
    row: {
        width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10
    },
    title: {
        fontFamily: 'ProductSans',
        fontSize: 20,
        color: theme.white,
        alignSelf: 'flex-start',
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 5
    },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexGrow: 1,
        textColor: theme.primary,
        borderWidth: 1,
        borderColor: theme.primary,
        borderRadius: 10,
        marginHorizontal: 5
    },

})