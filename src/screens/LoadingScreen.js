import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { auth } from '../stores/Firebase';

export default class LoadingScreen extends React.PureComponent {
    constructor() {
        super();

        this.checkAuth();
    }

    checkAuth = async () => {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate('User');
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" />
                <Text>Booting up the app</Text>
            </View>
        );
    }
}
