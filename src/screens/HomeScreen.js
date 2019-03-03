import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

// export default function HomeScreen() {
//     this.navigationOptions = {
//         tabBarIcon: "queue-music"
//     };

//     return (
//         <View>
//             <Text>Home</Text>
//         </View>
//     );
// }

export default class HomeScreen extends React.PureComponent {
    static navigationOptions = {
        tabBarIcon: () => <Button icon="home" />,
        title: "Home"
    };

    render() {
        return (
            <View>
                <Text>Home</Text>
            </View>
        );
    }
}
