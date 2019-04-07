import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { auth } from '../../stores/Firebase';

export default class ProfileScreen extends React.PureComponent {
    signOut = () => auth.signOut();

    render() {
        return (
            <View>
                <Text>Profile</Text>
                <Button mod="contained" onPress={this.signOut}>
                    Sign out
                </Button>
            </View>
        );
    }
}
