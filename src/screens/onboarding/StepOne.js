import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import styles from "../../styles/global.style";

export default (StepOne = ({ user, navigation }) => (
    <View style={styles.background}>
        <View style={styles.container}>
            <Text style={{ flex: 1, alignSelf: "center" }}>Onboarding</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Button
                    title="Skip"
                    onPress={() => navigation.navigate(user ? "Home" : "Login")}
                />
                <Button
                    title="Next"
                    onPress={() => navigation.navigate(user ? "Home" : "Login")}
                />
            </View>
        </View>
    </View>
));
