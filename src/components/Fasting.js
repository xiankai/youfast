import React from 'react';
import { View } from 'react-native';
import { Card } from 'react-native-paper';
import styles from 'styles/global.style';
import Gauge from './Gauge';

export default class Fasting extends React.PureComponent {
    render() {
        return (
            <Card>
                <View
                    style={{
                        alignSelf: 'center',
                        padding: 20,
                    }}
                >
                    <Gauge />
                </View>
            </Card>
        );
    }
}
