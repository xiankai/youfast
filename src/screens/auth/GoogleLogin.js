import React from 'react';
import { Button } from 'react-native-paper';
import { auth } from '../../stores/Firebase';
import { Google } from 'expo';
import { GOOGLE_EXP_CLIENT_ID } from 'react-native-dotenv';

export default class GoogleLogin extends React.PureComponent {
    login = async function() {
        const { type, idToken, accessToken } = await Google.logInAsync({
            clientId: GOOGLE_EXP_CLIENT_ID,
        });

        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken
            );

            // Sign in with credential from the Facebook user.
            auth.signInAndRetrieveDataWithCredential(credential);
        }
    };

    render() {
        return (
            <Button mod="contained" onPress={this.login}>
                Sign in With Google
            </Button>
        );
    }
}
