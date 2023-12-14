import { StackActions, createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
    if(navigationRef.isReady()) {
        //navigationRef.navigate(name, params);
        navigationRef.dispatch(StackActions.replace(name, params));
    }
}