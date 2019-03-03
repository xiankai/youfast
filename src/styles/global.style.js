import { StyleSheet } from "react-native";
import colors from "./colors.json";

export default StyleSheet.create({
    text: {
        color: colors.text
    },
    background: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    },
    container: {
        width: 200,
        height: 200,
        justifyContent: "space-between"
    }
});
