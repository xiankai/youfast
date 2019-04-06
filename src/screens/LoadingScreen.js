import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Firebase from '../stores/Firebase';

export default class LoadingScreen extends React.PureComponent {
    constructor() {
        super();

        this.checkAuth();
    }

    checkAuth = async function() {
        Firebase.auth().onAuthStateChanged(user => {
            console.log(user);
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
