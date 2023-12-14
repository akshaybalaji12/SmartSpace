import { useState} from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { width } from '../utils/constants';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { useEffect } from 'react';
import Modal from 'react-native-modal';
import SettingsFragment from '../fragments/SettingsFragment';
import ProfileFragment from '../fragments/ProfileFragment';

const Header = (props) => {

    const { theme } = props;
    const settingsIcon = require('../../assets/images/settings_white.png');
    const profileIcon = require('../../assets/images/profile.png');

    const [isSettings, setSettings] = useState(false)
    const [isProfile, setProfile] = useState(false)

    useEffect(() => {
        if(props.userData) {
        }
    }, [props.userData]);

    const onLogout = () => {
        props.logoutUser();
        setSettings(false);
    }

    return (
        <View style={styles(theme).container}>
            {props.userData.firstName &&
            <TouchableOpacity style={styles(theme).profileContainer} onPress={() => setProfile(true)}>
                <Image source={profileIcon} style={styles(theme).profileImage}/>
            </TouchableOpacity>}
            {props.userData.firstName && <Text style={styles(theme).title}>Workplace Assistant</Text>}
            <TouchableOpacity style={styles(theme).settingsContainer} onPress={() => setSettings(true)}>
                <Image source={settingsIcon} style={styles(theme).settingsImage}/>
            </TouchableOpacity>
            <Modal
            isVisible={isSettings}
            onBackdropPress={() => { setSettings(false) }}
            style={{ justifyContent: 'flex-end', margin: 0 }}>
                <SettingsFragment onLogout={onLogout}/>
            </Modal>
            <Modal
            isVisible={isProfile}
            onBackdropPress={() => { setProfile(false); }}
            style={{ justifyContent: 'flex-end', margin: 0 }}>
                <ProfileFragment />
            </Modal>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        userData: state.auth.userData,
        isLoggedIn: state.settings.isLoggedIn
    };
  }
  
  export default connect(
    mapStateToProps,
    actions
  )(Header);

const styles = (theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
        height: 60,
        width,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    settingsContainer: {
        height: 25,
        width: 25,
        position: 'absolute',
        end: 10
    },
    settingsImage: {
        height: 25,
        width: 25,
        padding: 5,
        resizeMode: 'contain',
        tintColor: theme.white
    },
    profileImage: {
        height: 40,
        width: 40,
        padding: 5,
        resizeMode: 'contain',
        tintColor: theme.primary
    },
    profileContainer: {
        position: 'absolute',
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        start: 10
    },
    title: {
        fontFamily: 'ProductSansBold',
        color: 'white',
        fontSize: 20,
        alignSelf: 'center'
    }
})