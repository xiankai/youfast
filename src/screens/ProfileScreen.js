import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { createStackNavigator } from 'react-navigation';
import Profile from './profile/ProfileScreen';
import Settings from './profile/SettingsScreen';
import styles from '../styles/global.style';

export default createStackNavigator(
    {
        Profile,
        Settings,
    },
    {
        initialRouteName: 'Profile',
        navigationOptions: {
            tabBarIcon: () => (
                <Button className={styles.nav_icon} icon="person" />
            ),
            title: 'Profile',
        },
    }
);
