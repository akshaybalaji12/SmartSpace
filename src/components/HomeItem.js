import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import { width, height } from '../utils/constants';

export const HomeItem = ({ theme, index, title, icon, navigationScreen, navigation }) => {

    const navigateScreen = () => {
        navigation.navigate(navigationScreen);
    }

    return (
        <TouchableOpacity style={styles(theme, index).itemContainer} onPress={navigateScreen} underlayColor={theme.surface} activeOpacity={0.5}>     
            <View>
                <Image source={icon} style={{ width: 50, height: 50, margin: 20, alignSelf: 'center' }} />
                <Text style={styles(theme).title}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = (theme, index = 0) => StyleSheet.create({
    itemContainer: {
        height: 150,
        width: (width/2) - 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        backgroundColor: theme.surface,
        borderRadius: 10
    },
    title: {
        fontFamily: 'ProductSans',
        fontSize: 18,
        color: theme.primary,
        padding: 5
    }
})