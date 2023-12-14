import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { width, height, COLOR_MODES } from '../utils/constants';
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { ActivityLoader } from '../components/ActivityLoader';
import { DelegateItem } from '../components/DelegateItem';

const DelegatesScreen = (props) => {
    
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light; 
    const isManager = props.userData?.isManager;

    useEffect(() => {
        if(isManager) props.requestDelegates(props.userData?.userID);
    }, []);

    useEffect(() => {
    }, [props.delegatesDetails]);

    const onStats = () => {
        props.navigation.navigate('Statistics');
    }

    return(
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <View style={styles(theme).titleContainer}>                        
                <Text style={styles(theme).title}>View {'\n'}Delegates</Text>
                {!isManager && <Text style={[ styles(theme).message, { marginTop: 25 } ]}>No Delegates found</Text>}
            </View>
            {isManager &&
            <View style={styles(theme).inputContainer}>  
                <TouchableOpacity onPress={onStats}><Text style={[ styles(theme).message, { color: theme.primary, alignSelf: 'flex-end', marginEnd: 10 }]}>View Statistics</Text></TouchableOpacity>
                {props.isLoading ? 
                <ActivityLoader theme={theme} size='large' /> :
                <FlatList 
                data={props.delegatesDetails}
                renderItem={({item}) => <DelegateItem theme={theme} delegatesDetails={item} />}
                keyExtractor={item => item._id}
                />}
            </View>}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        userData: state.auth.userData,
        delegatesDetails: state.auth.delegatesDetails,
        isLoading: state.auth.isLoading
    };
}

export default connect(
    mapStateToProps,
    actions
) (DelegatesScreen);

const styles = (theme) => StyleSheet.create({
    titleContainer: {
        flex: 1,
        width,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingStart: 20
    },
    title: {
        fontSize: 60,
        fontFamily: 'ProductSansBold',
        color: theme.primary,
    },
    message: {
        fontSize: 18,
        fontFamily: 'ProductSansBold',
        color: theme.white,
        alignSelf: 'center'
    },
    inputContainer: {
        flex: 3,
        width
    },
})