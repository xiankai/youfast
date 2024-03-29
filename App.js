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
import EditFast from './src/screens/EditFastScreen';
import colors from './src/styles/colors.json';
import Sentry from 'sentry-expo';
import { SENTRY_DSN } from 'react-native-dotenv';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './src/reducers/Root';

const store = createStore(RootReducer);

Sentry.config(SENTRY_DSN).install();

// https://github.com/facebook/react-native/issues/12981 🙄
console.disableYellowBox = true;

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
        User: createStackNavigator(
            {
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
                EditFast: { screen: EditFast },
            },
            {
                mode: 'modal',
                headerMode: 'none',
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
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
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
