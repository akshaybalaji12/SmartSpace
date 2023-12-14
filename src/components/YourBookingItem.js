import { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { width, height } from "../utils/constants";

export const YourBookingItem = ({ theme, booking, onClick, index }) => {

    const { date, floorNo, seatNo, zone, status } = booking;
    const statusColor = status === 'active' ? theme.active : theme.upcoming;
    const dateText = status === 'active' ? 'Today' : date;

    return (
        <TouchableOpacity onPress={() => onClick(index)}>    
            <View style={styles(theme).container}>
                <View style={[ styles(theme).status, { backgroundColor: statusColor } ]} />
                <View style={{ flex: 1, height: 60, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 15 }}>
                    <Text style={styles(theme).title}>{seatNo}</Text>
                    <Text style={[ styles(theme).title, { color: theme.white, fontSize: 16 } ]}>{dateText}</Text>
                </View>
                <View style={{ flex: 2, height: 60, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 15 }}>
                    <Text style={styles(theme).subtitle}>Cambridge Tower</Text>
                    <Text style={styles(theme).subtitle}>{floorNo}</Text>
                    <Text style={styles(theme).subtitle}>{zone}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.surface,
        height: 70,
        width: width - 60,
        alignItems: 'flex-start',
        marginTop: 12,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center'
    },
    status: {
        position: 'absolute',
        start: 0,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        width: 5,
        height: 70
    },
    title: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 18
    },
    subtitle: {
        color: theme.white,
        fontFamily: 'ProductSans',
        fontSize: 14
    }
})