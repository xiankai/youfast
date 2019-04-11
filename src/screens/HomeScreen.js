import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import styles from 'styles/global.style';
import Fasting from '../components/Fasting';
import Creature from '../components/Creature';

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
        tabBarIcon: () => <Button className={styles.nav_icon} icon="home" />,
        title: 'Home',
    };

    render() {
        return (
            <View
                style={{
                    justifyContent: 'space-between',
                    flex: 1,
                    padding: 20,
                }}
            >
                <View style={{ height: '5%' }}>
                    <Text style={{ fontSize: 20 }}>YouFast</Text>
                </View>
                <View style={{ height: '50%' }}>
                    <Fasting />
                </View>
                <View style={{ height: '35%' }}>
                    <Creature />
                </View>
            </View>
        );
    }
}
