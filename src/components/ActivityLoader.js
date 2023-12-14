import { View, ActivityIndicator } from 'react-native';

export const ActivityLoader = ({ theme, size = 'small' }) => {
    return (
        <View style={{ padding: 5, justifyContent: 'center', alignSelf: 'center', height: 50, margin: 12 }}>
            <ActivityIndicator color={theme.primary} size={size} />
        </View>
    )
}