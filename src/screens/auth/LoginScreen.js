import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import Auth from '../../stores/Auth';

export default class LoginScreen extends React.PureComponent {
    signIn = async () => {
        const token = await Auth.signInAsync();
        if (token) {
            this.props.navigation.navigate('User');
        }
    };

    render() {
        return (
            <View>
                <Button mod="contained" onPress={this.signIn}>
                    Sign in With Google
                </Button>
            </View>
        );
    }
}
