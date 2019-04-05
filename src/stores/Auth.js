import { AsyncStorage } from 'react-native';
import { AppAuth } from 'expo';
import { FIREBASE_CLIENT_ID, APP_NAME } from 'react-native-dotenv';

const config = {
    issuer: 'https://accounts.google.com',
    scopes: ['openid', 'profile'],
    /* This is the CLIENT_ID generated from a Firebase project */
    clientId: FIREBASE_CLIENT_ID,
};

/*
 * StorageKey is used for caching the OAuth Key in your app so you can use it later.
 * This can be any string value, but usually it follows this format: @AppName:NameOfValue
 */
const StorageKey = `@${APP_NAME}:auth`;

class Auth {
    /*
     * Notice that Sign-In / Sign-Out aren't operations provided by this module.
     * We emulate them by using authAsync / revokeAsync.
     * For instance if you wanted an "isAuthenticated" flag, you would observe your local tokens.
     * If the tokens exist then you are "Signed-In".
     * Likewise if you cannot refresh the tokens, or they don't exist, then you are "Signed-Out"
     */
    signInAsync = async () => {
        const authState = await AppAuth.authAsync(config);
        await this.cacheAuthAsync(authState);
        console.log('signInAsync', authState);
        return authState;
    };

    /* Let's save our user tokens so when the app resets we can try and get them later */
    cacheAuthAsync = authState => {
        return AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
    };

    /* Before we start our app, we should check to see if a user is signed-in or not */
    getCachedAuthAsync = async () => {
        /* First we will try and get the cached auth */
        const value = await AsyncStorage.getItem(StorageKey);
        /* Async Storage stores data as strings, we should parse our data back into a JSON */
        const authState = JSON.parse(value);
        console.log('getCachedAuthAsync', authState);
        if (authState) {
            /* If our data exists, than we should see if it's expired */
            if (this.checkIfTokenExpired(authState)) {
                /*
                 * The session has expired.
                 * Let's try and refresh it using the refresh token that some
                 * OAuth providers will return when we sign-in initially.
                 */
                return this.refreshAuthAsync(authState);
            } else {
                return authState;
            }
        }
        return null;
    };

    /*
     * You might be familiar with the term "Session Expired", this method will check if our session has expired.
     * An expired session means that we should reauthenticate our user.
     * You can learn more about why on the internet: https://www.quora.com/Why-do-web-sessions-expire
     * > Fun Fact: Charlie Cheever the creator of Expo also made Quora :D
     */
    checkIfTokenExpired = ({ accessTokenExpirationDate }) => {
        return new Date(accessTokenExpirationDate) < new Date();
    };

    /*
     * Some OAuth providers will return a "Refresh Token" when you sign-in initially.
     * When our session expires, we can exchange the refresh token to get new auth tokens.
     * > Auth tokens are not the same as a Refresh token
     *
     * Not every provider (very few actually) will return a new "Refresh Token".
     * This just means the user will have to Sign-In more often.
     */
    refreshAuthAsync = async ({ refreshToken }) => {
        const authState = await AppAuth.refreshAsync(config, refreshToken);
        console.log('refreshAuthAsync', authState);
        await this.cacheAuthAsync(authState);
        return authState;
    };

    /*
     * To sign-out we want to revoke our tokens.
     * This is what high-level auth solutions like FBSDK are doing behind the scenes.
     */
    signOutAsync = async ({ accessToken }) => {
        try {
            await AppAuth.revokeAsync(config, {
                token: accessToken,
                isClientIdProvided: true,
            });
            /*
             * We are removing the cached tokens so we can check on our auth state later.
             * No tokens = Not Signed-In :)
             */
            await AsyncStorage.removeItem(StorageKey);
            return null;
        } catch ({ message }) {
            alert(`Failed to revoke token: ${message}`);
        }
    };
}

const Singleton = new Auth();
export default Singleton;
