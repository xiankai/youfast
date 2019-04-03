import React from 'react';
import { View, Text } from 'react-native';
import { Card, IconButton, Colors } from 'react-native-paper';
import styles from 'styles/global.style';
import Gauge from './Gauge';

const formatDuration = duration => {
    let seconds = duration % 60;
    let minutes = Math.floor((duration % 3600) / 60);
    let hours = Math.floor(duration / 3600);

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default class Fasting extends React.PureComponent {
    constructor() {
        super();

        this.state = {
            progress: 0,
            goal: 3600,
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.progress < this.state.goal) {
                this.setState({ progress: this.state.progress + 1 });
            } else {
                this.setState({ progress: 0 });
            }
        }, 1000);
    }

    render() {
        return (
            <Card>
                <View
                    style={{
                        height: '95%',
                        alignSelf: 'center',
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            alignSelf: 'center',
                        }}
                    >
                        <Gauge
                            progress={
                                (this.state.progress / this.state.goal) * 100
                            }
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <IconButton
                            icon="remove"
                            size={30}
                            style={{
                                borderRadius: 10,
                                backgroundColor: Colors.red500,
                            }}
                            onPress={() =>
                                this.setState({ goal: this.state.goal - 3600 })
                            }
                        />
                        <Text style={{ textAlignVertical: 'center' }}>
                            Time Remaining:{' '}
                            {formatDuration(
                                this.state.goal - this.state.progress
                            )}
                        </Text>
                        <IconButton
                            icon="add"
                            size={30}
                            style={{
                                borderRadius: 10,
                                backgroundColor: Colors.red500,
                            }}
                            onPress={() =>
                                this.setState({ goal: this.state.goal + 3600 })
                            }
                        />
                    </View>
                </View>
            </Card>
        );
    }
}
