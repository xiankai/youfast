import React from 'react';
import { Button } from 'react-native-paper';
import firebase, { auth } from '../../stores/Firebase';
import { Facebook } from 'expo';
import { FACEBOOK_APP_ID } from 'react-native-dotenv';

export default class FacebookLogin extends React.PureComponent {
    login = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            FACEBOOK_APP_ID,
            {
                permissions: ['public_profile'],
            }
        );

        if (type === 'success') {
            this.props.signingIn();
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
                token
            );

            // Sign in with credential from the Facebook user.
            auth.signInAndRetrieveDataWithCredential(credential);
        }
    };

    render() {
        return (
            <Button mod="contained" onPress={this.login}>
                Sign in With Facebook
            </Button>
        );
    }
}
