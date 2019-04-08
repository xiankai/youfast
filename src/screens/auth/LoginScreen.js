import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Button } from 'react-native-paper';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import { auth } from '../../stores/Firebase';

export default class LoginScreen extends React.PureComponent {
    state = {
        signingIn: false,
    };

    componentDidMount() {
        // Listen for authentication state to change.
        auth.onAuthStateChanged(user => {
            if (user != null) {
                this.props.navigation.navigate('User');
            }

            // Do other things
        });
    }

    signingIn = () => this.setState({ signingIn: true });
    render() {
        return (
            <View>
                <GoogleLogin signingIn={this.signingIn} />
                <FacebookLogin signingIn={this.signingIn} />
                {this.state.signingIn && (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <ActivityIndicator size="large" />
                        <Text>Logging you in</Text>
                    </View>
                )}
            </View>
        );
    }
}
