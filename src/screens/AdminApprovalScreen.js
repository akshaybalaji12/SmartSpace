import { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native'
import { width, height, COLOR_MODES } from '../utils/constants';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ActivityLoader } from '../components/ActivityLoader';
import { ApprovalItem } from '../components/ApprovalItem';

const AdminApprovalScreen = (props) => {
    
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    const ITEM_HEIGHT = 170;

    useEffect(() => {
        props.requestAdminApprovals();
    }, []);

    useEffect(() => {
        if(props.actionMessage === 'Approved' || props.actionMessage === 'Rejected') {
            props.requestAdminApprovals();
        }
    }, [props.actionMessage]);

    const onActionClick = (id, action) => {
        const reqBody = {
            id,
            action
        }
        props.adminAction(reqBody);
    }

    const onRefresh = useCallback(() => {
        props.requestAdminApprovals();
    }, []);

    return(
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <View style={styles(theme).titleContainer}>                        
                <Text style={styles(theme).title}>Visitor {'\n'}Approval</Text>
            </View>
            <View style={styles(theme).inputContainer}>
                {props.isLoading ? 
                <ActivityLoader theme={theme} size='large' /> :
                <FlatList 
                    refreshControl={
                        <RefreshControl refreshing={props.isLoading} onRefresh={onRefresh} />
                    }
                    data={props.visitorRequests}
                    renderItem={( {item} ) => <ApprovalItem theme={theme} onActionClick={onActionClick} visitorDetails={item} />}
                    keyExtractor={item => item._id}
                    getItemLayout={(data, index) => ({
                        length: ITEM_HEIGHT,
                        offset: ITEM_HEIGHT * index,
                        index
                    })}
                    ListEmptyComponent={ <Text style={styles(theme).message}>{props.requestMessage}</Text> }
                />}
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        userData: state.auth.userData,
        visitorRequests: state.visitor.visitorRequests,
        isLoading: state.visitor.isLoading,
        newVisitorMessage: state.visitor.newVisitorMessage,
        actionMessage: state.visitor.actionMessage,
        requestMessage: state.visitor.requestMessage
    };
}

export default connect(
    mapStateToProps,
    actions
) (AdminApprovalScreen);

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
        color: theme.white,
        fontFamily: 'ProductSansBold',
        fontSize: 16,
        margin: 25,
        alignSelf: 'center'
    },
    inputContainer: {
        flex: 3,
        width,
    }
})