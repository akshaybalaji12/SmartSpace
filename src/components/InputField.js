import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLOR_MODES } from '../utils/constants';
import { connect } from 'react-redux';

const InputField = ({ 
    value, placeholder, onInputChange, secureTextEntry, 
    keyboardType = 'default', onFocus = () => {}, onBlur = () => {}, inputHeight = 50,
    isError = false, maxLength = undefined, ...props }) => {

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    return (
        <View style={[ styles.inputContainer, { height: inputHeight, borderColor: isError ? theme.error : theme.primary }]}>
            <TextInput 
                value={value}
                onChangeText={(value) => onInputChange(value)}
                style={{ flex: 1, color: theme.white }}
                placeholder={placeholder}
                placeholderTextColor= {props.isDarkMode ? COLOR_MODES.dark.whiteRGB : COLOR_MODES.light.whiteRGB}
                fontFamily='ProductSansBold'
                allowFontScaling={false}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={onFocus}
                onBlur={onBlur}
                maxLength={maxLength}
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
        borderWidth: 1,
        borderColor: COLOR_MODES.dark.primary,
        borderRadius: 10,
        marginVertical: 12,
        paddingHorizontal: 10
    }
})