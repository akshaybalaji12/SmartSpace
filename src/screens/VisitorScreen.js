import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { width, height, COLOR_MODES } from '../utils/constants';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ActivityLoader } from '../components/ActivityLoader';
import { Button } from '../components/Button';
import { VisitorItem } from '../components/VisitorItem';
import VisitorRequestFragment from '../fragments/VisitorRequestFragment';
import Modal from 'react-native-modal';

const VisitorScreen = (props) => {
    
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;
    const { userID } = props.userData;

    const [isNewRequest, setNewRequest] = useState(false);

    useEffect(() => {
        props.requestVisitorRequests(userID);
    }, []);

    useEffect(() => {
        if(props.newVisitorMessage.indexOf("raised") > -1) {
            props.requestVisitorRequests(userID);
        }
    }, [props.newVisitorMessage]);

    const onNewRequest = (newVisitorRequest) => {
        props.raiseVisitorAccess(newVisitorRequest);
        onRaiseRequest();
    }
    
    const onRaiseRequest = () => {
        setNewRequest(curr => !curr);
    }

    return(
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <View style={styles(theme).titleContainer}>                        
                <Text style={styles(theme).title}>Visitor {'\n'}Management</Text>
            </View>
            <View style={styles(theme).inputContainer}>
                {props.isLoading ? 
                <ActivityLoader theme={theme} size='large' /> :
                <FlatList 
                    style={{ marginBottom: 70, paddingBottom: 10 }}
                    data={props.visitorRequests}
                    renderItem={( {item} ) => <VisitorItem theme={theme} visitorDetails={item} />}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={ <Text style={styles(theme).message}>No Visitor Requests.</Text> }
                />}  
                <Button onButtonClick={onRaiseRequest} buttonText={'Raise New Access'} underlayColor={theme.accentRGB} activeOpacity={0.6} buttonStyle={styles(theme).raiseAccessButton} />
            </View>
            <Modal
            isVisible={isNewRequest}
            onBackdropPress={() => setNewRequest(false)}
            style={{ justifyContent: 'flex-end', margin: 0 }}>
                <VisitorRequestFragment userID={userID} onSubmit={onNewRequest}/>
            </Modal>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        userData: state.auth.userData,
        visitorRequests: state.visitor.visitorRequests,
        isLoading: state.visitor.isLoading,
        newVisitorMessage: state.visitor.newVisitorMessage
    };
}

export default connect(
    mapStateToProps,
    actions
) (VisitorScreen);

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
    },
    raiseAccessButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 15,
        backgroundColor: theme.primary,
        borderRadius: 10,
        textColor: theme.white
    }
})