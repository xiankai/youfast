import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { createStackNavigator } from "react-navigation";

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: () => <Button icon="person" />,
        title: "Profile"
    };
    render() {
        return createStackNavigator(
            {
                Profile,
                Settings
            },
            {
                initialRouteName: "Profile"
            }
        );
    }
}
