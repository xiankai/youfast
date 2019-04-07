import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import { auth } from '../../stores/Firebase';

export default class LoginScreen extends React.PureComponent {
    componentDidMount() {
        // Listen for authentication state to change.
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.navigation.navigate('User');
            }

            // Do other things
        });
    }

    render() {
        return (
            <View>
                <GoogleLogin />
                <FacebookLogin />
            </View>
        );
    }
}
