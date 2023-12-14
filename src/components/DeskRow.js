import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { width } from '../utils/constants';

export const DeskRow = () => {

    const deskImage = require('../../assets/images/system.png');
    const seatImage = require('../../assets/images/seat_blocked.png');
    const columns = Array(8).fill("");
    const [selected, setSelected] = useState(-1);
    const blocked = [0];
    const booked = [1];

    const colorDefault = {
        borderColor: 'rgba(250, 250, 250, 0.5)'
    }

    const colorSelected = {
        borderColor: '#9d4dff',
        backgroundColor: '#9d4dff' 
    }
    const colorBooked = {
        borderColor: '#ffb347',
        backgroundColor: '#ffb347'
    }
    const colorBlocked = {
        borderColor: '#2e2e2e',
        backgroundColor: '#2e2e2e'
    }

    getColors = (index) => {
        if (selected === (index)) return colorSelected;
        if (blocked.includes(index)) return colorBlocked;
        if (booked.includes(index)) return colorBooked;
        return colorDefault;
    }

    const onSelected = (index) => {
        setSelected(index);
    }

    return (
        <View style={{ padding: 20, height: 100, paddingHorizontal: 10, width, flexDirection: 'row', justifyContent: 'space-evenly' }}>
            {columns.map((desk, index) => {
                return (
                    <TouchableOpacity onPress={() => onSelected(index)} style={{ alignItems: 'center', marginTop: 40 }}>
                        <View style={[getColors(index), { width: 40, height: 20, borderWidth: 2 }]} />
                        <View style={[getColors(index), { width: 20, height: 20, borderRadius: 15, borderWidth: 2 }]} />
                    </TouchableOpacity>
                )
            })}
        </View>
    )

}