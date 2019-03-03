import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { compose } from "recompose";
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from "react-navigation";
import StepOne from "./src/screens/onboarding/StepOne";
import StepTwo from "./src/screens/onboarding/StepTwo";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SigninScreen from "./src/screens/auth/SigninScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import CreatureScreen from "./src/screens/CreatureScreen";

const AppNavigator = createSwitchNavigator(
    {
        Onboarding: createStackNavigator({
            StepOne: OnboardingStepOneScreen,
            StepTwo: OnboardingStepTwoScreen
        }),
        Auth: createStackNavigator({
            Login: LoginScreen,
            Signin: SigninScreen
        }),
        Profile: ProfileScreen,
        Settings: SettingsScreen,
        Home: HomeScreen,
        Progress: ProgressScreen,
        Creature: CreatureScreen
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
