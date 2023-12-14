import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, height, width } from '../utils/constants';
import YourBooking from '../components/YourBooking';
import { HomeItem } from '../components/HomeItem';

const HomeScreen = (props) => {

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    const approval = require('../../assets/images/visitor_approval.png');
    const stats = require('../../assets/images/stats.png');

    const title = [
        {
            id: 0,
            value: 'Visitor Approval',
            screenName: 'AdminApproval',
            icon: approval
        },
        {
            id: 1,
            value: 'Booking Statistics',
            screenName: 'AdminStats',
            icon: stats
        }
    ]

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).header}>
                <Text style={styles(theme).welcome}>Welcome, <Text style={styles(theme).name}>Admin</Text></Text>
            </View>
            <View style={styles(theme).body}>
                <View style={styles(theme).homeItemBody}>                        
                    <FlatList 
                    numColumns={2}
                    data={title}
                    renderItem={({item}) => <HomeItem index={item.id} isSingle={item.isSingle} title={item.value} icon={item.icon} theme={theme} navigationScreen={item.screenName} navigation={props.navigation} />}
                    keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        isLoggedIn: state.settings.isLoggedIn,
    };
}

export default connect(
    mapStateToProps,
    actions
)(HomeScreen);

const styles = (theme) => StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: theme.background,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    body: {
        flex: 11,
        width: width,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    homeItemBody: {
        flexWrap: 'wrap',
        padding: 10
    },
    welcome: {        
        fontFamily: 'ProductSans',
        color: theme.white,
        fontSize: 16
    },
    name: {        
        fontFamily: 'ProductSansBold',
        color: theme.primary,
        fontSize: 18
    },
    scheduleBody: {
        position: 'absolute',
        bottom: 0
    }

})