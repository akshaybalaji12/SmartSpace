import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { width } from '../utils/constants';

export const BookingItem = ({ theme, index, booking, onEdit, onDelete }) => {

    const { date, floorNo, seatNo, zone, status } = booking;
    
    const statusColor = status === 'active' ? theme.active : theme.upcoming;
    const dateText = status === 'active' ? 'Today' : date;
    
    return (
        <View style={styles(theme).container}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 15, paddingTop: 10, width: width - 50 }}>
                <Text style={styles(theme).title}>{`${seatNo}`}</Text>
                <Text style={[ styles(theme).title, { fontSize: 18, marginTop: 5, color: theme.white } ]}>{dateText}</Text>
                <View style={[styles(theme).status, { backgroundColor: statusColor }]}>
                    <Text style={styles(theme).statusText}>{status.toUpperCase()}</Text>
                </View>
                <View style={styles(theme).statusContainer}>
                    <Text style={[ styles(theme).title, { fontSize: 18, color: theme.white } ]}>Cambridge Tower</Text>
                    <Text style={[ styles(theme).title, { fontSize: 18, marginTop: 2, color: theme.white } ]}>{floorNo}</Text>
                    <Text style={[ styles(theme).title, { fontSize: 18, marginTop: 2, color: theme.white } ]}>{zone}</Text>
                </View>
                <View style={{ flexDirection: 'row', width: 120, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => onEdit(index)}>
                        <Text style={[styles(theme).subtitle, { fontSize: 16, marginStart: 5 }]}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onDelete(index)}>
                        <Text style={[styles(theme).subtitle, { fontSize: 16, marginStart: 10 }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: theme.surface,
        width: width - 40,
        height: 160,
        alignItems: 'flex-start',
        marginTop: 18,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 20,
        paddingStart: 5
    },
    subtitle: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 16
    },
    statusContainer: {
        position: 'absolute',
        top: 10,
        end: 10,
        height: 75,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    status: {
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 15
    },
    statusText: {
        color: theme.white,
        fontFamily: 'ProductSansBold',
        fontSize: 16
    }
})