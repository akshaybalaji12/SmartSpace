import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width } from '../utils/constants';
import Modal from 'react-native-modal';

const ProfileFragment = (props) => {

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;
    const { firstName, lastName, designation, gender, email, location } = props.userData;
    const personImage = gender === 'F' ? require('../../assets/images/woman.png') : require('../../assets/images/man.png');

    const onSubmitPress = () => {
    }

    return (
        <View style={styles(theme).container}>  
            <Image style={styles(theme).personImage}source={personImage} />
            <View style={{ flex: 3, width: width - 80, justifyContent: 'flex-start', alignItems: 'flex-end', paddingHorizontal: 15, paddingTop: 10 }}>
                <Text style={styles(theme).title}>{`${firstName} ${lastName}`}</Text>
                <Text style={styles(theme).subtitle}>{designation}</Text>
                <Text style={styles(theme).subtitle}>{email}</Text>
                <Text style={styles(theme).subtitle}>{location}</Text>
            </View>
            <TouchableOpacity style={{ flex: 1, width, justifyContent: 'space-around', alignItems: 'center' }}>
                <View style={{ height: 0.38, width: width - 80, backgroundColor: theme.primary }} />
                <Text style={styles(theme).reset}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        userData: state.auth.userData
    };
}

export default connect(
    mapStateToProps,
    actions
)(ProfileFragment);

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: theme.surface,
        height: 220,
        width,
        alignItems: 'flex-end',
        marginTop: 18,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    personImage: {
        position: 'absolute',
        start: 15,
        top: 15,
        width: 60,
        height: 60,
    },
    title: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 18
    },
    subtitle: {
        color: theme.white,
        fontFamily: 'ProductSansBold',
        fontSize: 16,
        marginTop: 10
    },
    reset: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 18,
        alignSelf: 'center'
    },
})