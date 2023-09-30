import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { ColorModes } from '../utils/constants';
import { connect } from 'react-redux';

export const InputField = (props) => {

    const { value, placeholder, onInputChange, secureTextEntry } = props;

    return (
        <View style={styles.inputContainer}>
            <TextInput 
                value={value}
                onChangeText={(value) => onInputChange(value)}
                style={{ flex: 1, color: props.isDarkMode ? ColorModes.dark.white : ColorModes.light.white }}
                placeholder={placeholder}
                placeholderTextColor= {props.isDarkMode ? ColorModes.dark.whiteRGB : ColorModes.light.whiteRGB}
                fontFamily='ProductSansBold'
                allowFontScaling={false}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode
    };
}

export default connect(
    mapStateToProps
)(InputField);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: ColorModes.dark.primary,
        height: 50,
        borderRadius: 25,
        margin: 15,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
})