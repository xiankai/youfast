import React from 'react';
import { AppState, View, Text, AsyncStorage, Image } from 'react-native';
import { Card, Button, IconButton, Colors } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import dayjs from 'dayjs';
import styles from 'styles/global.style';
import Gauge from './Gauge';

export default class Fasts extends React.PureComponent {
    state = {
        fasts: [],
    };

    async componentWillMount() {
        let fasts = JSON.parse(await AsyncStorage.getItem('fasts'));

        this.setState({
            fasts,
        });
    }

    render() {
        return (
            <View>
                {this.state.fasts.length > 0 && (
                    <LineChart
                        data={{
                            labels: this.state.fasts.map(fast =>
                                dayjs(fast.startTime).format('D MMM')
                            ),
                            datasets: [
                                {
                                    data: this.state.fasts.map(
                                        fast => +fast.duration
                                    ),
                                },
                            ],
                        }}
                        height={400}
                        width={Dimensions.get('screen').width}
                        chartConfig={{
                            backgroundGradientFrom: '#1E2923',
                            backgroundGradientTo: '#08130D',
                            color: (opacity = 1) =>
                                `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                        }}
                        bezier
                    />
                )}

                {this.state.fasts.map((fast, i) => (
                    <React.Fragment key={i}>
                        <Text>{fast.startTime}</Text>
                        <Text>{fast.endTime}</Text>
                        <Text>{fast.duration}</Text>
                    </React.Fragment>
                ))}
            </View>
        );
    }
}
