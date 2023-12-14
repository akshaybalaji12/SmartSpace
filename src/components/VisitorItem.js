import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Text, Image, StyleSheet, LayoutAnimation } from 'react-native';
import { width } from '../utils/constants';

export const VisitorItem = ({ theme, visitorDetails }) => {

    const { visitorFirstName, visitorLastName, visitingDate, visitPurpose, status, lastUpdated, securityCode } = visitorDetails;
    
    var statusImage;
    var statusColor;
    switch (status.toLowerCase()) {
        case 'requested':
            statusImage = require('../../assets/images/requested.png');
            statusColor = theme.upcoming;
            break;
        case 'approved':
            statusImage = require('../../assets/images/approved.png');
            statusColor = theme.active;
            break;
        case 'rejected':
            statusImage = require('../../assets/images/rejected.png');
            statusColor = theme.error;
            break;
        default:
            statusImage = require('../../assets/images/requested.png');
            statusColor = theme.active;
            break;
    }
    
    const arrowImage = require('../../assets/images/down.png');

    const [fadeValue] = useState(new Animated.Value(1));
    const [rotateValue] = useState(new Animated.Value(0));
    const [isExpanded, setExpanded] = useState(false);


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
        <View style={[styles(theme).container, { height: isExpanded ? 200 : 120 }]}>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 15, paddingTop: 10, width: width - 30 }}>
                <Text style={styles(theme).title}>{`${visitorFirstName} ${visitorLastName}`}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={[ styles(theme).title, { color: theme.white, fontSize: 14 } ]}>Visit Date: </Text>
                    <Text style={[ styles(theme).title, { fontSize: 16, marginTop: 2 } ]}>{visitingDate}</Text>
                </View>
                <View style={styles(theme).statusContainer}>
                    <Image style={styles(theme).statusImage}source={statusImage} />
                    <View style={[styles(theme).status, { backgroundColor: statusColor }]}>
                        <Text style={styles(theme).statusText}>{status}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={onRevealClick} style={{ flexDirection: 'row', width: 120, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'flex-start', marginVertical: 15 }}>
                    <Animated.Image style={{
                        width: 15, height: 15, tintColor: theme.white, transform: [ { rotate: arrowRotateValue }]
                    }} source={arrowImage} />
                    <Animated.Text onPress={onRevealClick}  style={[styles(theme).subtitle, { opacity: fadeValue, fontSize: 14, marginStart: 5 }]}>View Details</Animated.Text>
                </TouchableOpacity>
                {isExpanded &&
                <View style={{ flexDirection: 'column', width: width - 60, height: 30, justifyContent: 'flex-start', alignSelf: 'center' }}>
                    <Text numberOfLines={1} style={{ color: theme.white, fontSize: 16, fontFamily: 'ProductSansBold'}}>{visitPurpose}</Text>
                    <Text style={{ color: theme.white, fontSize: 14, fontFamily: 'ProductSansBold', marginTop: 5 }}>{`Last Updated On :  ${lastUpdated}`}</Text>
                    <Text style={{ color: theme.white, fontSize: 14, fontFamily: 'ProductSansBold', marginTop: 5 }}>Security Code :
                    <Text style={{ color: theme.primary, fontSize: 14, fontFamily: 'ProductSansBold', marginTop: 5 }}>  {securityCode}</Text></Text>
                </View>}
            </View>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: theme.surface,
        width: width - 20,
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
        fontSize: 20
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
        width: 80,
        height: 80,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    statusImage: {
        width: 40,
        height: 40,
    },
    status: {
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'center'
    },
    statusText: {
        color: theme.white,
        fontFamily: 'ProductSansBold',
        fontSize: 12
    }
})