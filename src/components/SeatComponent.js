import { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { width } from '../utils/constants';
import { parseSeatNo, getSeatNo } from '../utils/utilities';

export const SeatComponent = ({ bookingData, unavailableSeats, bookedSeats, onSelect }) => {

    const booked = bookedSeats.map(seat => {
        return parseSeatNo(seat);
    })

    const blocked = unavailableSeats.map(seat => {
        return parseSeatNo(seat);
    })

    const ROW = 7;
    const COL = 7;

    const seatArray = Array.from({ length: ROW }, () => new Array(COL).fill(""));
    
    const [selected, setSelected] = useState('');

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

    getColors = (row, col) => {
        const seat = `${row}-${col}`;
        if (selected === (seat)) return colorSelected;
        if (blocked.includes(seat)) return colorBlocked;
        if (booked.includes(seat)) return colorBooked;
        return colorDefault;
    }

    const isSeatBooked = (row, col) => {
        const seat = `${row}-${col}`;
        if (blocked.includes(seat)) return true;
        if (booked.includes(seat)) return true;
        return false;
    }

    const onSelected = (row, col) => {
        setSelected(`${row}-${col}`);
    }

    useEffect(() => {
        if(selected !== '') {
            bookingData.seatNo = getSeatNo(selected, bookingData.floorNo, bookingData.zone);
            onSelect(bookingData);
        }
    }, [selected]);

    return (
        <View>
            {seatArray.map((row, rIndex) => {
                return (
                <View key={`ROW${rIndex}`} style={{ padding: 20, height: 80, paddingHorizontal: 10, width, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    {row.map((desk, cIndex) => {
                        return (
                            <TouchableOpacity key={`COL${cIndex}`} disabled={isSeatBooked(rIndex, cIndex)} onPress={() => onSelected(rIndex, cIndex)} style={{ alignItems: 'center', marginTop: 40 }}>
                                <View style={[getColors(rIndex, cIndex), { width: 40, height: 20, borderWidth: 2 }]} />
                                <View style={[getColors(rIndex, cIndex), { width: 20, height: 20, borderRadius: 15, borderWidth: 2, marginTop: 2 }]} />
                            </TouchableOpacity>
                        )
                    })}
                </View>)
            })}
        </View>
    )

}