import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import Auth from '../../stores/Auth';

export default class ProfileScreen extends React.PureComponent {
    signOut = async () => {
        const cache = await Auth.getCachedAuthAsync();
        if (cache && cache.accessToken) {
            await Auth.signOutAsync({ accessToken: cache.accessToken });
        }
        this.props.navigation.navigate('Login');
    };

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
