import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default class ProgressScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: () => <Button icon="directions-run" />,
        title: "Progress"
    };
    render() {
        return (
            <View>
                <Text>Progress</Text>
            </View>
        );
    }
}
