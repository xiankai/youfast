import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { auth } from '../stores/Firebase';

export default class LoadingScreen extends React.PureComponent {
    constructor() {
        super();

        this.checkAuth();
    }

    checkAuth = async function() {
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
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}
