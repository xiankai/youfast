import React from 'react';
import {
    Text,
    View,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableOpacity,
} from 'react-native';
import { Button, Colors } from 'react-native-paper';
import dayjs from 'dayjs';
import FastStore from '../stores/FastStore';

export default class EditFastScreen extends React.PureComponent {
    state = {
        startTime: null,
        endTime: null,
    };

    async componentDidMount() {
        let startTime = await FastStore.getStartTime();
        let endTime = await FastStore.getEndTime();
        this.setState({
            startTime,
            endTime,
        });
    }

    openDatePicker = property => async () => {
        const { action, year, month, day } = await DatePickerAndroid.open({
            date: this.state[property].toDate(),
        });

        if (action === DatePickerAndroid.dismissedAction) {
            return;
        }

        const {
            action: secondAction,
            hour,
            minute,
        } = await TimePickerAndroid.open({
            date: this.state[property].toDate(),
        });

        if (secondAction === DatePickerAndroid.dismissedAction) {
            return;
        }

        this.setState({
            [property]: dayjs(new Date(year, month, day, hour, minute)),
        });
    };

    save = async () => {
        // const duration = this.start.endTime.diff(
        //     this.state.startTime,
        //     'seconds'
        // );
        await FastStore.updateFast(
            this.state.startTime,
            this.state.endTime,
            3600
        );
        this.props.navigation.goBack();
    };

    cancel = () => {
        this.props.navigation.goBack();
    };

    render() {
        return (
            <View
                style={{
                    padding: 20,
                }}
            >
                <TouchableOpacity onPress={this.openDatePicker('startTime')}>
                    <Text>Start</Text>
                    <Text>
                        {this.state.startTime
                            ? this.state.startTime.format('ddd D MMM HH:mm')
                            : ''}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.openDatePicker('endTime')}>
                    <Text>End</Text>
                    <Text>
                        {this.state.endTime
                            ? this.state.endTime.format('ddd D MMM HH:mm')
                            : ''}
                    </Text>
                </TouchableOpacity>
                <Button
                    mode="contained"
                    style={{ backgroundColor: Colors.green500 }}
                    onPress={this.save}
                >
                    Save
                </Button>
                <Button
                    mode="contained"
                    style={{ backgroundColor: Colors.red500 }}
                    onPress={this.cancel}
                >
                    Cancel
                </Button>
            </View>
        );
    }
}
