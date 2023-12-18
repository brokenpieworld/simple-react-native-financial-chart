import React, { useState } from 'react';
import { View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Svg, Rect, Line } from 'react-native-svg';

const SimpleCandlestickChart = ({ data, style, backgroundColor = 'white', candleColor = { up: 'green', down: 'red' } }) => {
    const [selectedCandle, setSelectedCandle] = useState(null);
    const { width, height } = Dimensions.get('window');

    // Calculate the minimum and maximum values of high and low in the data
    let minValue = Number.POSITIVE_INFINITY;
    let maxValue = Number.NEGATIVE_INFINITY;

    for (const candle of data) {
        minValue = Math.min(minValue, candle.low);
        maxValue = Math.max(maxValue, candle.high);
    }

    // Scales
    const xScale = (index) => (width / data.length) * index;
    const yScale = (value) => ((value - minValue) / (maxValue - minValue)) * height;

    const handleCandleSelect = (candle, index) => {
        setSelectedCandle({ candle, x: xScale(index), y: yScale(candle.high) });
    };

    return (
        <View style={style}>
            <Svg height={height} width={width} style={{ backgroundColor }}>
                {data.map((candle, index) => {
                    const candleX = xScale(index);
                    const openY = yScale(candle.open);
                    const closeY = yScale(candle.close);
                    const highY = yScale(candle.high);
                    const lowY = yScale(candle.low);
                    const candleWidth = width / data.length - 2;
                    const fill = candle.open > candle.close ? candleColor.down : candleColor.up;

                    return (
                        <TouchableOpacity key={index} onPress={() => handleCandleSelect(candle, index)}>
                            <Line
                                x1={candleX + candleWidth / 2}
                                y1={highY}
                                x2={candleX + candleWidth / 2}
                                y2={lowY}
                                stroke={fill}
                            />
                            <Rect
                                x={candleX}
                                y={Math.min(openY, closeY)}
                                width={candleWidth}
                                height={Math.abs(closeY - openY)}
                                fill={fill}
                            />
                        </TouchableOpacity>
                    );
                })}
            </Svg>
            {selectedCandle && (
                <View style={{ position: 'absolute', left: selectedCandle.x, top: selectedCandle.y, backgroundColor: selectedCandle.candle.tooltip?.backgroundColor || 'transparent' }}>
                    <Text>{selectedCandle.candle.tooltip?.text || ''}</Text>
                </View>
            )}
        </View>
    );
};

export default SimpleCandlestickChart;
