import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default class CreatureScreen extends React.Component {
    static navigationOptions = {
        tabBarIcon: () => <Button icon="mood" />,
        title: "Creature"
    };
    render() {
        return (
            <View>
                <Text>Creature</Text>
            </View>
        );
    }
}
