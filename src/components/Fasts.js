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
        FastStore.monitorFasts(fasts => {
            const consolidatedFasts = fasts
                .reduce((allFasts, fast) => {
                    let thatDay = allFasts.find(
                        f => f && f[0].startTime.isSame(fast.startTime, 'day')
                    );
                    if (thatDay) {
                        thatDay.push(fast);
                    } else {
                        allFasts.push([fast]);
                    }
                    return allFasts;
                }, [])
                .sort((a, b) => a[0].startTime.isAfter(b[0].startTime));

            this.setState({ fasts: consolidatedFasts });
        });
    }

    render() {
        return (
            <View style={{ padding: 20 }}>
                {this.state.fasts.length > 0 && (
                    <LineChart
                        data={{
                            labels: this.state.fasts.map(fasts =>
                                fasts[0].startTime.format('D MMM')
                            ),
                            datasets: [
                                {
                                    data: this.state.fasts.map(fasts =>
                                        Math.floor(
                                            fasts.reduce(
                                                (total, fast) =>
                                                    total + fast.duration,
                                                0
                                            ) / 3600
                                        )
                                    ),
                                },
                            ],
                        }}
                        height={300}
                        width={Dimensions.get('screen').width - 40}
                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: '#ffffff',
                            backgroundGradientTo: '#ffffff',
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            decimalPlaces: 0,
                        }}
                        bezier
                    />
                )}
            </View>
        );
    }
}
