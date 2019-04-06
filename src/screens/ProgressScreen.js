import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import Fasts from '../components/Fasts';

export default class ProgressScreen extends React.PureComponent {
    static navigationOptions = {
        tabBarIcon: () => <Button icon="directions-run" />,
        title: 'Progress',
    };
    render() {
        return (
            <View>
                <Fasts />
            </View>
        );
    }
}
