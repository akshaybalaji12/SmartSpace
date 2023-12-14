import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { width } from '../utils/constants';
import { Button } from '../components/Button';

export const EditBookingFragment = ({ theme, onCancel, onEdit, booking }) => {

    const closeIcon = require('../../assets/images/close_white.png');

    return (
        <View style={styles(theme).container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width, height: 80 }}>
                <Text style={styles(theme).header}>Modify Booking</Text>
                <TouchableOpacity onPress={onCancel}><Image source={closeIcon} style={styles(theme).close} /></TouchableOpacity>
            </View>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width/2,
                paddingVertical: 15,
                marginVertical: 5
            }}>
                <Text style={styles(theme).title}>Building</Text>
                <Text style={styles(theme).value}>Cambridge</Text>
            </View>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width/2,
                paddingVertical: 15,
                marginVertical: 5
            }}>
                <Text style={styles(theme).title}>Floor & Zone</Text>
                <Text style={styles(theme).value}>{booking.floorNo}, {booking.zone}</Text>
            </View>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width,
                paddingVertical: 15,
                marginVertical: 5
            }}>
                <Text style={styles(theme).title}>Date</Text>
                <Text style={styles(theme).value}>{booking.date}</Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
                paddingVertical: 15,
                marginVertical: 10
            }}>
                <Text style={[ styles(theme).title, { color: theme.white } ]}>Edit Seat</Text>
                <TouchableOpacity style={{ paddingHorizontal: 10}}>
                    <Text style={{ fontFamily: 'ProductSansBold', fontSize: 18, color: theme.primary, textDecorationLine: 'underline' }}>{booking.seatNo}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const styles = (theme) => StyleSheet.create({
    
    container: {
        backgroundColor: theme.background,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        flexWrap: 'wrap'
    },
    header: {
        fontFamily: 'ProductSans',
        fontSize: 22,
        color: theme.primary,
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 5,
    },
    close: {
        height: 25, 
        width: 25,
        resizeMode: 'cover',
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 5,
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
        color: theme.primary
    },
    value: {
        fontSize: 18,
        fontFamily: 'ProductSansBold',
        color: theme.white,
    },
    logoutButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexShrink: 1,
        textColor: theme.primary
    },

})