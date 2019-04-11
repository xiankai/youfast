import React from 'react';
import {
    AppState,
    View,
    Text,
    AsyncStorage,
    Image,
    ToastAndroid,
} from 'react-native';
import { Notifications } from 'expo';
import { Card, Button, IconButton, Colors } from 'react-native-paper';
import dayjs from 'dayjs';
import styles from 'styles/global.style';
import Gauge from './Gauge';
import FastStore from '../stores/FastStore';

const formatDuration = duration => {
    let seconds = duration % 60;
    let minutes = Math.floor((duration % 3600) / 60);
    let hours = Math.floor(duration / 3600);

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const humanizeDuration = duration => {
    let minutes = Math.floor((duration % 3600) / 60);
    let hours = Math.floor((duration % 86400) / 3600);
    let days = Math.floor(duration / 86400);

    let output = [
        days ? `${days} days` : '',
        hours ? `${hours} hours` : '',
        minutes ? `${minutes} minutes` : '',
    ];

    return output.filter(Boolean).join(', ');
};

const durationInHours = duration => {
    return `${Math.floor((duration / 3600) * 10) / 10} hours`;
};

export default class Fasting extends React.PureComponent {
    state = {
        progress: 0,
        goal: 3600,
        isFasting: false,
        display: 'negative',
    };

    async componentWillMount() {
        let display = FastStore.getDisplay();
        let startTime = await FastStore.getStartTime();
        let endTime = await FastStore.getEndTime();
        if (!startTime || !endTime) {
            return;
        }
        let now = dayjs();
        let remaining = endTime.diff(now, 'seconds');
        if (remaining < 0) {
            // remove this later, as we should be saving fasts even without opening the app
            this.saveFast(endTime);
            this.finishFasting();
            return;
        }
        let goal = endTime.diff(startTime, 'seconds');

        this.setState({
            progress: goal - remaining,
            goal,
            isFasting: true,
            display,
        });
        this.resumeFasting();
    }

    componentDidMount() {
        AppState.addEventListener('change', () => this.updateFastingStatus());
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    updateFastingStatus() {
        if (this.interval) {
            let finish = dayjs(this.state.endTime);
            let now = dayjs();
            let remaining = finish.diff(now, 'seconds');
            if (remaining < 0) {
                return;
            }

            this.setState({ progress: this.state.goal - remaining });
        }
    }

    startFasting = async () => {
        let startTime = dayjs();
        let endTime = dayjs().add(this.state.goal, 'seconds');
        await FastStore.startFast(startTime, endTime, this.state.goal);
        // endTime is for quickly resuming when the app returns from background
        this.setState({ isFasting: true, endTime: endTime.format() });
        this.resumeFasting();
        Notifications.scheduleLocalNotificationAsync(
            {
                title: 'You have reached your fasting goal!',
                body: `You have fasted a total of ${humanizeDuration(
                    this.state.goal
                )}!`,
            },
            {
                time: endTime.toDate(),
            }
        );
    };

    resumeFasting = () => {
        this.interval = setInterval(() => {
            if (this.state.progress < this.state.goal) {
                this.setState({ progress: this.state.progress + 1 });
            } else {
                this.stopFasting();
                this.finishFasting();
            }
        }, 1000);
    };

    stopFasting = async () => {
        await this.saveFast(dayjs());
        this.setState({ progress: 0, goal: 3600, isFasting: false });
        clearInterval(this.interval);
    };

    saveFast = async endTime => {
        await FastStore.endFast(endTime, this.state.progress);
    };

    finishFasting = () => {
        fetch('https://www.reddit.com/r/aww/hot/.json?limit=2')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    image: json.data.children[2].data.thumbnail,
                });
            });
    };

    setDisplay = () => {
        let display =
            this.state.display === 'positive' ? 'negative' : 'positive';
        this.setState({ display });
        FastStore.setDisplay(display);
    };

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
                            height: '60%',
                        }}
                    >
                        {this.state.progress >= this.state.goal &&
                            this.state.image ? (
                                <Image
                                    style={{ width: 200 }}
                                    source={{ uri: this.state.image }}
                                />
                            ) : (
                                <Gauge
                                    progress={
                                        (this.state.progress / this.state.goal) *
                                        100
                                    }
                                />
                            )}
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
                                backgroundColor:
                                    this.state.goal <= 3600
                                        ? Colors.grey500
                                        : Colors.red500,
                            }}
                            disabled={this.state.goal <= 3600}
                            onPress={() =>
                                this.setState({ goal: this.state.goal - 3600 })
                            }
                        />
                        <Text style={{ textAlignVertical: 'center' }}>
                            {durationInHours(this.state.goal)}
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
                    <View>
                        <Text
                            style={{ textAlignVertical: 'center' }}
                            onPress={this.setDisplay}
                        >
                            {this.state.display === 'positive'
                                ? `Time fasted: ${formatDuration(this.state.progress)}`
                                : `Time remaining: ${formatDuration(this.state.goal - this.state.progress)}`}
                        </Text>
                    </View>
                    <View>
                        {this.state.isFasting ? (
                            <Button
                                mode="contained"
                                style={{ backgroundColor: Colors.red500 }}
                                onPress={this.stopFasting}
                            >
                                Stop Fasting
                            </Button>
                        ) : (
                            <Button
                                mode="contained"
                                style={{ backgroundColor: Colors.green500 }}
                                onPress={this.startFasting}
                            >
                                Start Fasting
                            </Button>
                        )}
                    </View>
                </View>
            </Card>
        );
    }
}
