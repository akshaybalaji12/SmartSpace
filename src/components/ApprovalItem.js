import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Text, Image, StyleSheet, LayoutAnimation } from 'react-native';
import { width } from '../utils/constants';

export const ApprovalItem = ({ theme, visitorDetails, onActionClick }) => {

    const { _id, userID, visitorFirstName, visitorLastName, visitingDate, visitPurpose, status, createdOn } = visitorDetails;

    const onClick = (action) => {
        onActionClick(_id, action);
    }
    
    const approveImage = require('../../assets/images/approve.png');
    const rejectImage = require('../../assets/images/reject.png');
    
    return (
        <View style={styles(theme).container}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 15, paddingTop: 10, width: width - 30 }}>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 5 }}> 
                    <Text style={styles(theme).title}>{`${visitorFirstName} ${visitorLastName}`}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 5 }}>
                        <Text style={[ styles(theme).title, { color: theme.white, fontSize: 14 } ]}>Visit Date : </Text>
                        <Text style={[ styles(theme).title, { fontSize: 16 } ]}>{visitingDate}</Text>
                    </View> 
                    <Text numberOfLines={2} style={[ styles(theme).title, { color: theme.white, fontSize: 18, marginTop: 5 } ]}>{visitPurpose}</Text>
                </View>
                <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', marginVertical: 5 }}>
                    <Text style={{ color: theme.white, fontSize: 14, fontFamily: 'ProductSansBold', marginVertical: 5 }}>{`Raised by :  ${userID.toUpperCase()}`}</Text>
                    <Text style={{ color: theme.white, fontSize: 14, fontFamily: 'ProductSansBold', marginVertical: 5 }}>{`Raised On :  ${createdOn}`}</Text>
                </View>
            </View>
            <View style={styles(theme).actionContainer}>
                <TouchableOpacity onPress={() => onClick('reject')} style={{ flex: 1, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>    
                    <Text style={[styles(theme).actionText, { color: theme.error } ]}>Reject</Text>
                    <Image style={[styles(theme).actionImage, { tintColor: theme.error, marginStart: 10 }]}source={rejectImage} />
                </TouchableOpacity> 
                <View style={{ width: 0.5, height: 20, backgroundColor: theme.primary }} />   
                <TouchableOpacity onPress={() => onClick('approve')} style={{ flex: 1, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>    
                    <Text style={[styles(theme).actionText, { color: theme.active } ]}>Approve</Text>
                    <Image style={[styles(theme).actionImage, { tintColor: theme.active, marginStart: 10 }]}source={approveImage} />
                </TouchableOpacity>               
            </View>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: theme.surface,
        height: 170,
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
        fontSize: 20,
    },
    subtitle: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 16
    },
    actionContainer: {
        position: 'absolute',
        width: width - 20,
        bottom: 0,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    actionImage: {
        width: 15,
        height: 15,
    },
    actionText: {
        fontFamily: 'ProductSansBold',
        fontSize: 16
    }
})