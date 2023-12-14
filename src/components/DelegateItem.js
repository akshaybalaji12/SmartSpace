import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Text, Image, StyleSheet, LayoutAnimation } from 'react-native';
import { width, MONTHS } from '../utils/constants';
import { CalendarUtils } from 'react-native-calendars';

export const DelegateItem = ({ theme, delegatesDetails }) => {

    const personImage = delegatesDetails?.gender === 'F' ? require('../../assets/images/woman.png') : require('../../assets/images/man.png');
    const arrowImage = require('../../assets/images/down.png')
    const { firstName, lastName, designation, bookingHistory } = delegatesDetails;

    const [fadeValue] = useState(new Animated.Value(1));
    const [rotateValue] = useState(new Animated.Value(0));
    const [isExpanded, setExpanded] = useState(false);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if(bookingHistory.length > 0) {
            bookingHistory.reverse();
            const bookings = bookingHistory.map(history => {
                const date = new Date(history.date);
                const today = new Date();
                return {
                    id: history._id,
                    month: MONTHS[date.getMonth() + 1],
                    day: date.getDate(),
                    isToday: CalendarUtils.getCalendarDateString(date) === CalendarUtils.getCalendarDateString(today)
                }
            });
            setHistory([...bookings]);
        }
    }, []);

    const arrowRotateValue = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const onRevealClick = () => {
        Animated.parallel([
            Animated.spring(rotateValue, {
                toValue: isExpanded ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(fadeValue, {
                toValue: isExpanded ? 1 : 0,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
        LayoutAnimation.configureNext({
            duration: 500,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'linear', property: 'opacity' },
            delete: { type: 'linear', property: 'opacity' }
        });
        setExpanded(prev => !prev);
    }
    
    return (
        <View style={[styles(theme).container, { height: isExpanded ? 160 : 100 }]}>  
            <Image style={styles(theme).personImage}source={personImage} />
            <View style={{ flex: 1, width: width - 80, justifyContent: 'flex-start', alignItems: 'flex-end', paddingHorizontal: 15, paddingTop: 10 }}>
                <Text style={styles(theme).title}>{`${firstName} ${lastName}`}</Text>
                <Text style={[ styles(theme).title, { color: theme.white, fontSize: 16 } ]}>{designation}</Text>
                {bookingHistory.length > 0 ?
                <TouchableOpacity onPress={onRevealClick} style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginVertical: 10 }}>
                    <Animated.Text onPress={onRevealClick}  style={[styles(theme).subtitle, { opacity: fadeValue }]}>Recent Bookings</Animated.Text>
                    <Animated.Image style={{
                        width: 15, height: 15, marginStart: 10, tintColor: theme.white, transform: [ { rotate: arrowRotateValue } ]
                    }} source={arrowImage} />
                </TouchableOpacity> :
                <Text style={[styles(theme).subtitle, { marginVertical: 10 }]}>No Recent Booking(s)</Text>}
                {isExpanded &&
                <View style={{ flexDirection: 'row', width: width - 80, height: 50, justifyContent: 'flex-end',  }}>
                    {history.map((history, index) => {
                        return (
                            <TouchableOpacity key={history.id} onPress={() => onDetailPress(index)} style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', height: 50, marginHorizontal: 10 }}>
                                <Text style={{ color: theme.primary, fontSize: 16, fontFamily: 'ProductSansBold'}}>{history.month}</Text>
                                <Text style={{ color: theme.white, fontSize: 14, fontFamily: 'ProductSans'}}>{history.day}</Text>
                                {history.isToday && <View style={{ backgroundColor: theme.primary, marginBottom: 5, marginTop: 2, height: 5, width: 5, borderRadius: 5 }} />}
                            </TouchableOpacity>
                        )
                    })}
                </View>}
            </View>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: theme.surface,
        height: 100,
        width: width - 20,
        alignItems: 'flex-end',
        marginTop: 18,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    personImage: {
        position: 'absolute',
        start: 15,
        top: 15,
        width: 70,
        height: 70,
    },
    title: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 18
    },
    subtitle: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 16
    }
})