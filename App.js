import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Loading from './src/screens/LoadingScreen';
import StepOne from './src/screens/onboarding/StepOne';
import StepTwo from './src/screens/onboarding/StepTwo';
import Login from './src/screens/auth/LoginScreen';
import Signin from './src/screens/auth/SigninScreen';
import Profile from './src/screens/ProfileScreen';
import Home from './src/screens/HomeScreen';
import Progress from './src/screens/ProgressScreen';
import Creature from './src/screens/CreatureScreen';
import colors from './src/styles/colors.json';

const AppNavigator = createSwitchNavigator(
    {
        Onboarding: createStackNavigator(
            {
                StepOne,
                StepTwo,
            },
            {
                initialRouteName: 'StepOne',
            }
        ),
        Auth: createStackNavigator(
            {
                Login,
                Signin,
            },
            {
                initialRouteName: 'Login',
            }
        ),
        User: createMaterialBottomTabNavigator(
            {
                Home: { screen: Home },
                Progress: { screen: Progress },
                Creature: { screen: Creature },
                Profile: {
                    screen: Profile,
                },
            },
            {
                initialRouteName: 'Home',
                barStyle: { backgroundColor: colors.background },
            }
        ),
        Loading,
    },
    {
        initialRouteName: 'Loading',
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.PureComponent {
    render() {
        return <AppContainer />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
