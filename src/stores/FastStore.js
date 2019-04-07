import { AsyncStorage } from 'react-native';
import dayjs from 'dayjs';

class FastStore {
    async getDisplay() {
        return await AsyncStorage.getItem('display');
    }

    async setDisplay(display) {
        await AsyncStorage.setItem('display', display);
    }

    async getStartTime() {
        let startTime = await AsyncStorage.getItem('startTime');
        return startTime ? dayjs(startTime) : null;
    }

    async getEndTime() {
        let endTime = await AsyncStorage.getItem('endTime');
        return endTime ? dayjs(endTime) : null;
    }

    async setStartTime(startTime) {
        await AsyncStorage.setItem(
            'startTime',
            startTime ? startTime.format() : ''
        );
    }

    async setEndTime(endTime) {
        await AsyncStorage.setItem('endTime', endTime ? endTime.format() : '');
    }

    async addFast(startTime, endTime, duration) {
        let fasts = await AsyncStorage.getItem('fasts');
        if (!fasts) {
            fasts = [];
        } else {
            fasts = JSON.parse(fasts);
        }
        fasts.push({
            startTime: startTime.format(),
            endTime: endTime.format(),
            duration,
        });
        await AsyncStorage.setItem('fasts', JSON.stringify(fasts));
    }

    async getFasts() {
        let fasts = await AsyncStorage.getItem('fasts');
        return fasts ? JSON.parse(fasts) : [];
    }
}

const singleton = new FastStore();
export default singleton;
