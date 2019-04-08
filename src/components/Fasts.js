import React from 'react';
import { AppState, View, Text, Image } from 'react-native';
import { Card, Button, IconButton, Colors } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import dayjs from 'dayjs';
import styles from 'styles/global.style';
import Gauge from './Gauge';
import FastStore from '../stores/FastStore';

export default class Fasts extends React.PureComponent {
    state = {
        fasts: [],
    };

    async componentWillMount() {
        FastStore.monitorFasts(fasts => this.setState({ fasts }));
    }

    render() {
        return (
            <View style={{ padding: 20 }}>
                {this.state.fasts.length > 0 && (
                    <LineChart
                        data={{
                            labels: this.state.fasts.map(fast =>
                                fast.startTime.format('D MMM')
                            ),
                            datasets: [
                                {
                                    data: this.state.fasts.map(
                                        fast => fast.duration
                                    ),
                                },
                            ],
                        }}
                        height={300}
                        width={Dimensions.get('screen').width - 40}
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
                        <Text>{fast.startTime.format()}</Text>
                        <Text>{fast.endTime.format()}</Text>
                        <Text>{fast.duration}</Text>
                    </React.Fragment>
                ))}
            </View>
        );
    }
}
