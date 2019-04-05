import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Auth from '../stores/Auth';

export default class LoadingScreen extends React.PureComponent {
    constructor() {
        super();

        this.checkAuth();
    }

    checkAuth = async function() {
        const token = await Auth.getCachedAuthAsync();
        this.props.navigation.navigate('User');
        this.props.navigation.navigate(token ? 'User' : 'Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }
}
