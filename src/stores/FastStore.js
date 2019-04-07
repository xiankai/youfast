import { AsyncStorage } from 'react-native';
import { auth, firestore, Timestamp } from './Firebase';
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

    async startFast(startTime, endTime, duration) {
        await AsyncStorage.setItem('startTime', startTime.format());
        await AsyncStorage.setItem('endTime', endTime.format());
        firestore
            .collection('fasts')
            .add({
                user: auth.currentUser.uid,
                startTime: Timestamp.fromDate(startTime.toDate()),
                endTime: Timestamp.fromDate(endTime.toDate()),
                duration,
            })
            .then(docRef => AsyncStorage.setItem('fastId', docRef.id));
    }

    async endFast(endTime, duration) {
        let startTime = await AsyncStorage.getItem('startTime');
        this.addFast(dayjs(startTime), endTime, duration);
        AsyncStorage.setItem('startTime', '');
        AsyncStorage.setItem('endTime', '');
    }

    async addFast(startTime, endTime, duration) {
        let fastId = await AsyncStorage.getItem('fastId');
        firestore
            .collection('fasts')
            .doc(fastId)
            .update({
                startTime: Timestamp.fromDate(startTime.toDate()),
                endTime: Timestamp.fromDate(endTime.toDate()),
                duration,
            });
        // let fasts = await AsyncStorage.getItem('fasts');
        // if (!fasts) {
        //     fasts = [];
        // } else {
        //     fasts = JSON.parse(fasts);
        // }
        // fasts.push({
        //     startTime: startTime.format(),
        //     endTime: endTime.format(),
        //     duration,
        // });
        // await AsyncStorage.setItem('fasts', JSON.stringify(fasts));
    }

    async getFasts() {
        let fasts = await firestore
            .collection('fasts')
            .where('user', '==', auth.currentUser.uid)
            // can't create index because the generated URL won't work
            // .orderBy('startTime', 'asc')
            .get()
            .then(querySnapshot =>
                querySnapshot.docs
                    .map(doc => doc.data())
                    .map(fast => ({
                        startTime: dayjs(fast.startTime.toDate()),
                        endTime: dayjs(fast.startTime.toDate()),
                        duration: fast.duration,
                    }))
            );
        return fasts || [];
        // let fasts = await AsyncStorage.getItem('fasts');
        // return fasts ? JSON.parse(fasts) : [];
    }
}

const singleton = new FastStore();
export default singleton;
