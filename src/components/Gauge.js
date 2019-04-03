import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import colors from 'styles/colors.json';

// https://stackoverflow.com/a/18473154/1097483
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y,
    ].join(' ');

    return d;
}

export default class Gauge extends Component {
    render() {
        const { progress } = this.props;

        return (
            <View>
                <Svg height="100%" width="200">
                    <Path
                        d={describeArc(100, 100, 80, -135, 135)}
                        fill="none"
                        stroke={colors.grey}
                        strokeWidth="20"
                    />
                    <Path
                        d={describeArc(
                            100,
                            100,
                            80,
                            -135,
                            -135 + ((progress || 0) / 100) * 270
                        )}
                        fill="none"
                        stroke={colors.neon_green}
                        strokeWidth="20"
                    />
                </Svg>
            </View>
        );
    }
}
