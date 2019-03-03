import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default class Creature extends React.PureComponent {
    render() {
        return (
            <Card style={{ padding: 20 }}>
                <Image
                    style={{
                        alignSelf: 'center',
                        resizeMode: 'center',
                    }}
                    source={require('../../assets/Assets/Cans.png')}
                />
            </Card>
        );
    }
}
